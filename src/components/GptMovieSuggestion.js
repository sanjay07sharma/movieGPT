import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {
  const { movieResults, movieName } = useSelector(store => store.gpt);

  if (!movieName) return null;
  return (
    <div className="p-4 m-4 bg-black text-white">
      <div>
        {
          movieName.map((name, index) => {
            <MovieList key={name} title={name} movies={movieResults[index]}/>
          })
        }
      </div>
    </div>
  )
}

export default GptMovieSuggestion
