import React from 'react';
import { useParams } from 'react-router-dom';
import useMovieTrailer from '../hooks/useMovieTrailer';
import VideoBackground from './VideoBackground';

const MovieInfo = () => {
  const movieId = useParams(); // Extract movieId from the URL
  useMovieTrailer(movieId.movieName); // Fetch the movie trailer
  return (
    <div>
      <VideoBackground movieId={movieId.movieName} />
    </div>
  );
};

export default MovieInfo;
