import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-10 relative z-20 pl-4 md:pl-12">
        <MovieList title={"Now Playing"} movies={movies.addNowPlayingMovie}/>
        <MovieList title={"Popular"} movies={movies.addPopularMovies}/>
        <MovieList title={"Top Rated"} movies={movies.addTopRatedMovies}/>
        <MovieList title={"Upcoming"} movies={movies.addUpcomingMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer
