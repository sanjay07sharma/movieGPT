import Header from "./Header"
import {API_OPTIONS} from "../utils/constants"
import { useEffect } from "react";
const Browse = () => {

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    console.log(json);
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
