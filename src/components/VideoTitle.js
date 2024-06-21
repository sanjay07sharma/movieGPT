import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-36 px-12">
        <h1 className="text-6xl bold ">{title}</h1>
        <p className="py-6 text-lg w-1/2 overflow-ellipsis">{overview}</p>
        <div className="">
          <button className="bg-gray-500 text-black px-16 w-10 text-lg bg-opacity-35 rounded-r-sm">
          ▶️  Play
          </button>
          <button className="mx-2 bg-gray-500 text-black px-16 w-10 text-lg bg-opacity-35 rounded-r-sm">
            MoreInfo
          </button>
        </div>
    </div>
  )
}

export default VideoTitle
