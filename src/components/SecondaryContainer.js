import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  return (
    <div>
      {/*
      - MovieList - Popular Movies, trending,  comedy, horror, documentary, action, etc.
      - Each will have multiple movie cards
      - Need two components
        -MovieList
        -MovieCard
      - Paas data to MovieList
      - Fetch data from API
      - Use Redux to store the data
      - Use Redux to fetch the data
      - Show the data in SecondaryContainer
      */}
      <MovieList title={"Now Playing"} movies={movies.addNowPlayingMovie}/>
    </div>
  )
}

export default SecondaryContainer
