import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  },[]);

  function handleGptSearchClick() {
    dispatch(toggleGptSearch());
  };

  return (
      <div className="absolute w-screen px-8 py-2 b-gradient-to-bottom from-black z-10 flex justify-between">
        <img className="w-44" src={LOGO_URL} alt="logo" />
      {(user !== null) && <div className="flex">
        <button className="py-2 px-4 m-2 bg-purple-400 text-white rounded-lg" onClick={handleGptSearchClick}>GPTsearch</button>
        <img className="w-10 h-10 m-2 rounded-lg" alt="user icon" src={user.photoURL}/>
        <button className="font-bold bg-red-500 m-2 w-20 h-10 rounded-lg" onClick={handleSignOut}>Sign Out</button>
      </div>}
      </div>
  )
}

export default Header
