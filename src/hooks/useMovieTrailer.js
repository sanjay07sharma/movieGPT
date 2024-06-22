import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addTrailer } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieData = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer")[0];
      const trailer = filterData.length ? filterData : json.results[0];
      dispatch(addTrailer(trailer));
    }

    useEffect(() => {
      getMovieData();
    },[])
}

export default useMovieTrailer;
