import React from 'react'

const GptSearchBar = () => {
  return (
    <div className="pt-[20%] flex justify-center -z-10">
        <form className="p-6 m-4 bg-black grid grid-cols-12">
            <input type="text" className="p-4 m-4 col-span-9" placeholder="Hmmm whats in your mind today ?" />
            <button className="py-2 px-2 bg-red-500 text-white col-span-3" type="submit">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar
