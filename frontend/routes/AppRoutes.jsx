import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/user/Home";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Apply from "../pages/user/Apply";
import Detail from "../pages/user/Detail";
import Status from "../pages/user/Status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "apply", element: <Apply /> },
      { path: "detail", element: <Detail /> },
      { path: "status", element: <Status /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
