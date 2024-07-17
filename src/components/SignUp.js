import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import { useRef } from "react";

const SignUp = ({ email, password, setErrorMessages }) => {
  const name = useRef(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR,
        }).then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        }).catch((error) => {
          setErrorMessages(error.message);
        });
        setErrorMessages("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessages(errorCode + "-" + errorMessage);
      });
  };

  return (
    <div>
      <input
        ref={name}
        type="text"
        id="name"
        placeholder="Name"
        className="shadow appearance-none border rounded w-full p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        className="bg-red-500 w-full hover:bg-red-700 text-white font-bold p-4 my-6 rounded focus:outline-none focus-shadow-outline"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
