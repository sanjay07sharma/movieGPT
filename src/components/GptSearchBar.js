import React from 'react'

const GptSearchBar = () => {
  return (
    <div className="pt-[20%] flex justify-center bg-black bg-opacity-20">
        <form className="p-6 m-4 w-1/2">
            <input type="text" className="p-4 m-4 w-3/4 rounded-md" placeholder="Hmmm whats in your mind today? " />
            <button className="p-4 bg-red-500 text-white w-1/5 rounded-md" type="submit">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar
