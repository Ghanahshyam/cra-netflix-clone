import React from "react";
import Login from "../../Login/view/Login";
import Browse from "../../Browse/view/Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
 
  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
