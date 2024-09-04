import React, { useEffect } from "react";
import Login from "../../Login/view/Login";
import Browse from "../../Browse/view/Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { addUser, removeUser } from "../../../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({
          uid, email, displayName, photoURL
        }))
      } else {
        // sign out
        dispatch(removeUser());
      }
    })
  },[dispatch]);

  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
