import Header from "./Header"
import { useState, useRef } from "react"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [signIn, setSignIn] = useState("Sign In");
  const [errorMessages, setErrorMessages] = useState([]); // [emailError, passwordError
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignIn = (e) => {
    e.preventDefault();
    signIn === "Sign In" ? setSignIn("Sign Up") : setSignIn("Sign In");
    document.getElementById("name").classList.toggle("hidden");
  }

  const handleButtonClick = (e) => {
    const isValidCredentials = checkValidData(email?.current?.value, password?.current?.value);
    if (isValidCredentials) {
      setErrorMessages(isValidCredentials);
    }
    if (signIn === "Sign Up" && !isValidCredentials) {
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      ).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          }).catch((error) => {
            setErrorMessages(error.message)
          });
          setErrorMessages("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessages(errorCode +"-"+ errorMessage);
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
        .then((userCredential) => {
          // Signed in
          setErrorMessages("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessages(errorCode +"-"+ errorMessage);
        });
    }
  };

  return (
    <div>
        <Header />
        <div className="absolute">
          <img className="h-fit w-fit" src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 absolute bg-black my-52 mx-auto p-14 left-0 right-0 bg-opacity-80">
          <h1 className="text-2xl font-bold text-white mb-4">{signIn}</h1>
          <input
              ref={name}
              type="Text"
              id="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
          />
          <input
              ref={email}
              type="email"
              id="email"
              placeholder="Email or Phone number"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
              ref={password}
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            className="bg-red-500 w-full hover:bg-red-700 text-white font-bold p-4 my-6 rounded focus:outline-none focus-shadow-outline"
            onClick={(e) => handleButtonClick(e)}
          >
            {signIn}
          </button>
          <p className="text-red-600">{errorMessages}</p>
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
