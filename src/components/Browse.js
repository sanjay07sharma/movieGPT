import useMovies from "../hooks/useMovies"
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import GPTsearch from "./GPTSearch"
const Browse = () => {
  useMovies();
  return (
    <div>
      <Header/>
      <GPTsearch/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse
