import GptMovieSuggestion from "./GptMovieSuggestion"
import GptSearchBar from "./GptSearchBar"
import {BG_URL} from "../utils/constants"

const GptSearch = () => {
    return (
        <div className="w-svw">
            <div className="fixed -z-10">
              <img className="h-fit w-fit" src={BG_URL} alt="logo" />
            </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
    )
}
export default GptSearch
