import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import language from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { debounce } from 'lodash';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser:true,
});

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [cachedResults, setCachedResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: gptSearchQuery
          }
        ],
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });

      const movies = response.choices[0].message.content.split(",").map(movie => movie.trim());
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

  const debouncedHandleGptSearchClick = debounce(handleGptSearchClick, 1000);

  useEffect(() => {
    return () => {
      debouncedHandleGptSearchClick.cancel();
    };
  }, []);

  return (
    <div className="pt-[35%] lg:pt-[20%] flex justify-center bg-black bg-opacity-20">
      <div className="p-6 m-4 w-full md:w-1/2">
        <input
          type="text"
          className="p-2 w-3/4 md:p-4 md:m-4 md:w-[60%] rounded-md"
          placeholder={language[languageKey].gptPlaceholder}
          ref={searchText}
        />
        <button
          onClick={debouncedHandleGptSearchClick}
          className="p-2 m-2 md:p-4 md:m-2 bg-red-500 text-white md:w-[20%] rounded-md"
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
  );
};

export default GptSearchBar;
