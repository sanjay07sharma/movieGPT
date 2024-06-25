import { POSTER_CDN_URL } from "../utils/constants"

const MovieCard = ({posterPath}) => {
  return (
    <div className="w-48">
      <img src={POSTER_CDN_URL + posterPath} alt="movie"/>
    </div>
  )
}

export default MovieCard
