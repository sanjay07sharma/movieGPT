import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {
  const { gptMovieResults, movieName } = useSelector(store => store.gpt);
  if (!gptMovieResults) return null;
  return (
    <div className="p-4 m-4 bg-black text-white">
      <div>
        {
          gptMovieResults.map((movie) => {
            <MovieList key={movie.movieName} title={movie.movieName} movies={movie.movieResult}/>
          })
        }
      </div>
    </div>
  )
}

export default GptMovieSuggestion
