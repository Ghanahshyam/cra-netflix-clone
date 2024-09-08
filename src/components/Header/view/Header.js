import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../../../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { LOGO, SUPPORTED_LANGUGUES } from "../../../utils/constant";
import { toggleGptSearchView } from "../../../utils/gptSearchSlice";
import { changeLanguage } from "../../../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt?.showGptSearch);
  const handleSignout = () => {
    signOut(auth).then(() => {console.log('Signining out');})
    .catch((error) => { console.log(error.errorMessage);});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({
          uid, email, displayName, photoURL
        }))
        navigate("/browse");
      } else {
        // sign out
        dispatch(removeUser());
        navigate("/");
      }
    })

    return () => {
      unsubscribe();
    }
  },[]);

  const handleGPTSearchClick = ()=> {
    dispatch(toggleGptSearchView());
  }

  const handleLangChange = (event) => {
    dispatch(changeLanguage(event.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="netflix logo img"
      />
      {user && <div className="flex p-2">
        { showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLangChange}>
          {
            SUPPORTED_LANGUGUES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
          }
        </select>}
        <button onClick={handleGPTSearchClick} className="p-2 px-4 mx-4 mt-2 bg-purple-500 text-white rounded-lg">{showGptSearch ? 'Home Page': 'GPT Search'} </button>
        <img
        className="w-12 h-12 p-2"
          alt="usericon"
          src={user?.photoURL}
        />
        <button onClick={handleSignout} className="font-bold text-white">Sign out</button>
      </div>}
    </div>
  );
};

export default Header;

// userICON="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"