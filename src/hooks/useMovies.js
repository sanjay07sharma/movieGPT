import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovie, addTopRatedMovies, addPopularMovies, addUpcomingMovies } from "../utils/movieSlice";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMovies = () => {
  const dispatch = useDispatch();
  const movieGenres = ["now_playing", "popular", "top_rated", "upcoming"];
  const popularMovies = useSelector(store => store.movies.addNowPlayingMovie);
  // const entertainementType = useSelector(store => store.movies.entertainementType);

  const getMovieGenres = async (genres) => {
    const url = 'https://api.themoviedb.org/3/movie/' + genres;
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACESS_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
  });
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
    if (!popularMovies) {
      movieGenres.forEach((genre) => {
        getMovieGenres(genre);
      });
    }
  }, []);
}

export default useMovies;
