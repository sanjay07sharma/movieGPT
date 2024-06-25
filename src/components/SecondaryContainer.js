import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const secondaryContainer = () => {
  const movies = useSelector(state => state.movies)
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
      SecondaryContainer
      <MovieList title={"Now Playing"} movie={movies.addNowPlaying}/>
    </div>
  )
}

export default secondaryContainer
