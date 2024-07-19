import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import language from '../utils/languageConstants';
import { ANTHROPIC_API_KEY, API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { debounce } from 'lodash';
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB  = async (movieName) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async (event) => {
    const gptSearchQuery = "Act as a movie recommendation system and suggest some movies for the query: "
      + searchText.current.value +
      " only give me the names of 5 movies, comma separated. Like the example ahead Example Result: Gadar, Sholay, Golmal, Partner, Hera Pheri";

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system: "Respond only with short poems.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: gptSearchQuery
              }
            ]
          }
        ]
      });

      const movies = response.data.choices[0].message.content.split(",");
      for (const movie of movies) {
        const promiseArray = searchMovieTMDB(movie.trim());
        const movieResult = await Promise.all(promiseArray);
        dispatch(addGptMovieResult({ movieName: movie.trim(), movieResult: movieResult }));
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
  );
};

export default GptSearchBar;
