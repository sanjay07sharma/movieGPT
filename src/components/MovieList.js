import { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    { value: 'all', label: 'All' },
    { value: 'now_playing', label: 'Now Playing' },
    { value: 'popular', label: 'Popular' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  const filteredMovies = selectedGenre === 'all' ? movies : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="pt-4">
      <h1 className="text-lg md:text-3xl font-light py-4 text-white">{title}</h1>
      <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded-md"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie.id} poster_path={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
