import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addTrailer } from "../utils/movieSlice";
import { useSelector } from "react-redux";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const nowPlayingMovie = useSelector(store => store.movies.trailer);
    const getMovieData = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const json = await data.json();
      if (json.results && json.results.length > 0) {
        const filterData = json.results.filter((video) => video.type === "Trailer")[0];
        const trailer = filterData ? filterData : json.results[0];
        dispatch(addTrailer(trailer));
      } else {
        console.error('No results found for movie trailer');
      }
    }

    useEffect(() => {
      if (!nowPlayingMovie) {
        getMovieData();
      }
    }, [movieId])
}

export default useMovieTrailer;
