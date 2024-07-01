import React from 'react'

const GptSearchBar = () => {
  return (
    <div>
        <form className="p-6 m-4 bg-black">
            <input type="text" className="p-4 m-4" placeholder="Hmmm whats in your mind today ?" />
            <button className="py-2 px-2 bg-red-500 text-white" type="submit">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar
