import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-[20%] px-24 absolute text-white bg-gradient-to-r from from-black w-screen aspect-video ">
        <h1 className="text-6xl bold w-80">{title}</h1>
        <p className="py-6 text-lg w-72 overflow-ellipsis">{overview}</p>
        <div className="">
          <button className="play bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded">
            <span className="play-icon text-lg">▶</span>
            <span className="play-text text-lg">Play</span>
          </button>
          <button className="more-info bg-gray-400 hover:bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded ml-2">
            <span className="info-icon text-lg">i</span>
            <span className="more-info-text text-lg">More Info</span>
          </button>
        </div>
    </div>
  )
}

export default VideoTitle
