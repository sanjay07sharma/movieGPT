
import {API_OPTIONS} from "../utils/constants"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovie, addTopRatedMovies, addPopularMovies, addUpcomingMovies } from "../utils/movieSlice";

const useMovies = () => {
const dispatch = useDispatch();
const movieGenres = ["now_playing", "popular", "top_rated", "upcoming"];

const getMovieGenres = async (genres) => {
  const url = 'https://api.themoviedb.org/3/movie/'+{genres}+'?page=1';
  const data = await fetch(url, API_OPTIONS);
  const json = await data.json();
  switch (genres) {
    case "now_playing":
      dispatch(addNowPlayingMovie(json.results));
      break;
    case "popular":
      dispatch(addPopularMovies(json.results));
      break;
    case "top_rated":
      dispatch(addTopRatedMovies(json.results));
      break;
    case "upcoming":
      dispatch(addUpcomingMovies(json.results));
      break;
    default:
  }
}

useEffect(() => {
    movieGenres.forEach((genre) => {
        getMovieGenres(genre);
    });
}, [movieGenres]);
}

export default useMovies;
