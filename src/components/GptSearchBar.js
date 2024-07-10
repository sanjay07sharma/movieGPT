import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import language from '../utils/languageConstants';
import {openAi} from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch()
  const searchText = useRef(null);

  const searchMovieTMDB  = async (movieName) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make api calls to GPT API and get movie results

    const gptSearchQuery = "Act as a movie recommendation system and suggest some movies for the query:"
      + searchText.current.value +
      " only give me the names of 5 movies, comma separated. Like the example ahead Example Result : Gadar, Sholay, Golmal, Partner, Hera Pheri";

    openAi.chat.completions.create({
      messages: [{ role: 'user', content: gptSearchQuery }],
      model: 'babbage-002',
    }).then((response) => {
      const movies = response.data.choices[0].message.content.split(",");
      movies.map((movie) => {
        const promiseArray = searchMovieTMDB(movie);
        const movieResult = Promise.all(promiseArray);
        dispatch(addGptMovieResult({movieName: movie, movieResult: movieResult}));
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="pt-[20%] flex justify-center bg-black bg-opacity-20">
        <form className="p-6 m-4 w-1/2" onSubmit={(ev) => {
          ev.preventDefault();
        }}>
            <input
              type="text"
              className="p-4 m-4 w-3/4 rounded-md"
              placeholder={language[languageKey].gptPlaceholder}
              ref={searchText}
            />
            <button
              className="p-4 bg-red-500 text-white w-1/5 rounded-md"
              onClick={handleGptSearchClick}>{language[languageKey].search}
              </button>
        </form>
    </div>
  )
}

export default GptSearchBar
