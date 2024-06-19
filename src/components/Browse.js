import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      {/*
      Planning how to structure the Browse component:
        MainContainer
          - VideoBackground
          - Video Title
        SecondaryContainer
          - MovieList * n
          - MovieCard * n
      */}
    </div>
  )
}

export default Browse
