import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import language from '../utils/languageConstants';
import {openAi} from '../utils/openAi';

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
    // Make api calls to GPT API and get movie results

    const gptSearchQuery = "Act as a movie recommendation system and suggest some movies for the query:"
      + searchText.current.value +
      " only give me the names of 5 movies, comma separated. Like the example ahead Example Result : Gadar, Sholay, Golmal, Partner, Hera Pheri";

    const chatCompletion = await openAi.chat.completions.create({
      messages: [{ role: 'user', content: gptSearchQuery }],
      model: 'gpt-3.5-turbo',
    });
    // Plan further steps to display the results
    console.log(chatCompletion.data);
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
