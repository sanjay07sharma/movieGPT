import Header from "./Header"
import {API_OPTIONS} from "../utils/constants"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovie } from "../utils/movieSlice";
const Browse = () => {

  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovie(json.results));
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse
