import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MovieList = ({ title, movies }) => {
  return (
    <div className="pt-4">
      <h1 className="text-lg md:text-3xl font-light py-4 text-white">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies?.map((movie) => (
          <Link key={movie.id} to={`/${movie.id}`}>
            <MovieCard poster_path={movie.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
