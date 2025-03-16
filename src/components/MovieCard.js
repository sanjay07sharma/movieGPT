import { POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  if (!poster_path) {
    return null;
  }

  return (
    <div className="w-48 md:w-64 pr-4 transform transition-transform duration-300 hover:scale-105">
      <img
        src={POSTER_CDN_URL + poster_path}
        alt="movie"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default MovieCard;
