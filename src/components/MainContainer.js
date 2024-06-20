import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';


const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.addNowPlayingMovie);
  if (!movies) {
    return;
  }
  const {original_title, overview} = movies;

  return (
    <div>
      MainContainer
      <VideoTitle title={[original_title, overview]}/>
      <VideoBackground/>
    </div>
  )
}

export default MainContainer
