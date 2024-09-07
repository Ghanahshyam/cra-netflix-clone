import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../../../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { LOGO } from "../../../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
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

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="netflix logo img"
      />
      {user && <div className="flex p-2">
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