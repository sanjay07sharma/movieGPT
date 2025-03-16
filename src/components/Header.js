import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { setEntertainmentType } from "../utils/movieSlice";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const entertainementType = useSelector(store => store.movies.entertainementType);

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
        debugger
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value));
  };

  const handleMenuClick = (menu) => {
    // Perform actions based on the menu item clicked
    switch (menu) {
      case "home":
        navigate("/");
        break;
      case "tvShows":
        dispatch(setEntertainmentType("tv"));
        navigate("/tv-shows");
        break;
      case "movies":
        dispatch(setEntertainmentType("movies"));
        navigate("/browse");
        break;
      default:
        break;
    }
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col justify-between md:flex-row">
      <img className="w-44 mx-auto md:mx-0" src={LOGO_URL} alt="logo" />
      {(user !== null) && (
        <div className="flex items-center">
          <nav className="flex space-x-4">
            <button className="text-white" onClick={() => handleMenuClick("home")}>Home</button>
            <button className="text-white" onClick={() => handleMenuClick("tvShows")}>TV Shows</button>
            <button className="text-white" onClick={() => handleMenuClick("movies")}>Movies</button>
          </nav>
          {showGptSearch && (
            <select className="m-2 w-20 h-10 bg-red-500 text-white rounded-lg" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>{language.name}</option>
              ))}
            </select>
          )}
          <button className="m-2 w-20 h-10 bg-red-500 text-white rounded-lg" onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPTsearch"}
          </button>
          <img className="w-10 h-10 m-2 rounded-lg" alt="user icon" src={user.photoURL} />
          <button className="font-bold bg-red-500 m-2 w-20 h-10 rounded-lg" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default Header;
