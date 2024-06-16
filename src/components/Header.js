import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
      <div className="absolute w-screen px-8 py-2 b-gradient-to-bottom from-black z-10 flex justify-between">
        <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      {(user !== null) && <div className="flex">
        <img className="w-10 h-10 m-2 rounded-lg" alt="user icon" src={user.photoURL}/>
        <button className="font-bold bg-red-500 m-2 w-20 h-10 rounded-lg" onClick={handleSignOut}>Sign Out</button>
      </div>}
      </div>
  )
}

export default Header
