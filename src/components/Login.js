import Header from "./Header"
import { useState } from "react"

const Login = () => {
  const [signIn, setSignIn] = useState("Sign In");
  const toggleSignIn = (e) => {
    e.preventDefault();
    signIn === "Sign In" ? setSignIn("Sign Up") : setSignIn("Sign In");
    document.getElementById("name").classList.toggle("hidden");
    
  }
  return (
    <div>
        <Header />
        <div className="absolute">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="logo" />
        </div>
        <form className="w-3/12 absolute bg-black my-52 mx-auto p-14 left-0 right-0 bg-opacity-80">
          <h1 className="text-2xl font-bold text-white mb-4">{signIn}</h1>
          <input
              type="Text"
              id="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
          />
          <input
              type="email"
              id="email"
              placeholder="Email or Phone number"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-red-500 w-full hover:bg-red-700 text-white font-bold p-4 my-6 rounded focus:outline-none focus-shadow-outline"
          >
            {signIn}
          </button>
          <div className="text-gray-400 flex flex-wrap cursor-pointer">
            {signIn === "Sign In" ? "New to Netflix?" : "Already a member? "}
            <p
              className="text-blue-500 hover:text-blue-700"
              onClick={(e) => toggleSignIn(e)}
            >
              {signIn === "Sign In" ? "Sign up Now " : "Sign In"}
            </p>
          </div>
        </form>
    </div>
  )
}

export default Login
