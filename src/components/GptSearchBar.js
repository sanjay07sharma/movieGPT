import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import language from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult, clearGptMovieResult } from '../utils/gptSlice';
import { debounce } from 'lodash';
import MovieList from './MovieList';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB72h7vM6jBWFPhSF3iJaZx02aHoEtlnDI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [cachedResults, setCachedResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { gptMovieResults, movieName } = useSelector(store => store.gpt);

  const searchMovieTMDB = async (movieName) => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, API_OPTIONS);
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("TMDB Search Error:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    // Check cached results first
    if (cachedResults[query]) {
      dispatch(addGptMovieResult({ movieName: query, movieResult: cachedResults[query] }));
      return;
    }

    const gptSearchQuery = "Act as a movie recommendation system and suggest some movies for the query: "
      + query +
      " only give me the names of 5 movies, comma separated. Like the example ahead Example Result: Gadar, Sholay, Golmal, Partner, Hera Pheri";

    try {
      setIsLoading(true);
      setError(null);

      const result = await model.generateContent(gptSearchQuery);

      const movies = result.response.text().split(",").map(movie => movie.trim());
      const movieResults = [];

      for (const movie of movies) {
        const movieResult = await searchMovieTMDB(movie);
        movieResults.push({ movieName: movie, movieResult: movieResult });
      }

      setCachedResults(prev => ({ ...prev, [query]: movieResults }));
      dispatch(addGptMovieResult({ movieName: query, movieResult: movieResults }));
    } catch (error) {
      console.error("Search Error:", error);
      setError(error.message || "An error occurred during search");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearchClick = () => {
    dispatch(clearGptMovieResult());
    // searchText.current.value = '';
  };

  const debouncedHandleGptSearchClick = debounce(handleGptSearchClick, 1000);

  useEffect(() => {
    return () => {
      debouncedHandleGptSearchClick.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center pt-16">
      <div className="flex justify-center bg-black bg-opacity-20 w-full">
        <div className="p-6 m-4 w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            className="p-4 w-full md:p-6 md:m-4 rounded-md text-black"
            placeholder={language[languageKey].gptPlaceholder}
            ref={searchText}
          />
          <button
            onClick={debouncedHandleGptSearchClick}
            className="p-4 m-4 w-full bg-red-500 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : language[languageKey].search}
          </button>
          {error && (
            <div className="text-red-500 mt-2">
              {error}
            </div>
          )}
        </div>
      </div>
      {gptMovieResults && (
        <div className="bg-black text-white w-full">
          <h2 className="text-2xl font-bold mb-4">Movie Suggestions for "{movieName}"</h2>
          {gptMovieResults.map((movie) => (
            <MovieList key={movie.movieName} title={movie.movieName} movies={movie.movieResult} />
          ))}
          <button
            onClick={handleNewSearchClick}
            className="p-2 m-2 bg-red-500 text-white rounded-md"
          >
            Search Another Movie
          </button>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
