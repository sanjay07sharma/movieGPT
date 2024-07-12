import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
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

  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value));
  }

  return (
      <div className="absolute w-screen px-8 py-2 b-gradient-to-bottom from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO_URL} alt="logo" />
      {(user !== null) && <div className="flex">
        {showGptSearch && <select className="m-2 w-20 h-10  bg-red-500 text-white rounded-lg" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <option key={language.identifier} value={language.identifier}>{language.name}</option>
            ))}
        </select>}
        <button className="m-2 w-20 h-10  bg-red-500 text-white rounded-lg" onClick={handleGptSearchClick}>GPTsearch</button>
        <img className="w-10 h-10 m-2 rounded-lg" alt="user icon" src={user.photoURL}/>
        <button className="font-bold bg-red-500 m-2 w-20 h-10 rounded-lg" onClick={handleSignOut}>Sign Out</button>
      </div>}
      </div>
  )
}

export default Header
