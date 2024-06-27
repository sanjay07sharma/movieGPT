import {API_OPTIONS} from "../utils/constants"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {

const dispatch = useDispatch();

const getPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
  const data = await fetch(url, API_OPTIONS);
  const json = await data.json();
  dispatch(addPopularMovies(json.results));
}

useEffect(() => {
  getPopularMovies();
}, []);
}

export default usePopularMovies;
