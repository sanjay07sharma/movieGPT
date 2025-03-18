import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { BG_URL } from "../utils/constants";
import ChoosePlan from "./ChoosePlan";
import SignUp from "./SignUp";

const Login = () => {
  const [signIn, setSignIn] = useState("Sign In");
  const [choosePlan, setChoosePlan] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]); // [emailError, passwordError]
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignIn = (e) => {
    e.preventDefault();
    if (signIn === "Sign In") {
      setSignIn("Sign Up");
      setChoosePlan(true);
    } else {
      setSignIn("Sign In");
      setChoosePlan(false);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const isValidCredentials = checkValidData(email?.current?.value, password?.current?.value);
    if (isValidCredentials) {
      setErrorMessages(isValidCredentials);
      return;
    }
    if (signIn === "Sign In") {
      signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
        .then((userCredential) => {
          // Signed in
          setErrorMessages("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessages(errorCode + "-" + errorMessage);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-screen fixed h-screen object-cover md:w-screen md:h-screen" src={BG_URL} alt="background" />
      </div>
      {choosePlan && signIn === "Sign Up" ? (
        <ChoosePlan setChoosePlan={setChoosePlan} />
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 absolute bg-black my-52 mx-auto p-14 left-0 right-0 bg-opacity-80">
          <h1 className="text-2xl font-bold text-white mb-4">{signIn}</h1>
          <input
            ref={email}
            type="email"
            id="email"
            placeholder="Email or Phone number"
            className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="relative">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="absolute right-3 top-5 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {signIn === "Sign Up" && <SignUp email={email} password={password} setErrorMessages={setErrorMessages} />}
          <button
            className="bg-red-500 w-full hover:bg-red-700 text-white font-bold p-4 my-6 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => handleButtonClick(e)}
          >
            {signIn}
          </button>
          <p className="text-red-600">{errorMessages}</p>
          <div className="text-gray-400 flex flex-wrap cursor-pointer">
            {signIn === "Sign In" ? "New to Netflix?" : "Already a member? "}
            <p className="text-blue-500 hover:text-blue-700" onClick={(e) => toggleSignIn(e)}>
              {signIn === "Sign In" ? "Sign up Now " : "Sign In"}
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
