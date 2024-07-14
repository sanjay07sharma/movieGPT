import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import language from '../utils/languageConstants';
import {openAi} from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { debounce } from 'lodash';

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch()
  const searchText = useRef(null);

  const searchMovieTMDB  = async (movieName) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async (event) => {

    // Make api calls to GPT API and get movie results
    const gptSearchQuery = "Act as a movie recommendation system and suggest some movies for the query:"
      + searchText.current.value +
      " only give me the names of 5 movies, comma separated. Like the example ahead Example Result : Gadar, Sholay, Golmal, Partner, Hera Pheri";

    try {
      const response = await openAi.chat.completions.create({
        messages: [{ role: 'system', content: gptSearchQuery }],
        model: 'gpt-3.5-turbo',
      });
      const movies = response.data.choices[0].message.content.split(",");
      for (const movie of movies) {
        const promiseArray = searchMovieTMDB(movie);
        const movieResult = await Promise.all(promiseArray);
        dispatch(addGptMovieResult({ movieName: movie, movieResult: movieResult }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-[35%] md:pt-[20%] flex justify-center bg-black bg-opacity-20">
        <form className="p-6 m-4 w-full md:w-1/2" onSubmit={(ev) => {
          ev.preventDefault();
        }}>
            <input
              type="text"
              className="p-2 w-3/4 md:p-4 md:m-4 md:w-3/4 rounded-md"
              placeholder={language[languageKey].gptPlaceholder}
              ref={searchText}
            />
            <button
              className="p-2 m-2 md:p-4 md:m-2 bg-red-500 text-white md:w-1/5 rounded-md"
              onClick={debounce(handleGptSearchClick, 200)}>{language[languageKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar
