import { POSTER_CDN_URL } from "../utils/constants"

const MovieCard = ({poster_path}) => {
  if (!poster_path) {
    return;
  }

  return (
    <div className="w-48 pr-4">
      <img src={POSTER_CDN_URL + poster_path} alt="movie"/>
    </div>
  )
}

export default MovieCard
