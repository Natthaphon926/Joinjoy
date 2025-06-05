import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Home from "../pages/user/Home";
import Registration from "../pages/user/Registration";
import Detail from "../pages/user/Detail";
import Status from "../pages/user/Status";
import ReceipPage from "../pages/user/ReceipPage";
import AllActivity from "../pages/admin/AllActivity";
import Applicant from "../pages/admin/Applicant";
import CreateActivity from "../pages/admin/CreateActivity";
import ManageActivity from "../pages/admin/ManageActivity";
import EditActivity from "../pages/admin/EditActivity";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import Profile from "../pages/user/Profile";
import ListAllUsers from "../pages/admin/ListAllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "registration/:id", element: <Registration /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "status", element: <Status /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <AllActivity /> },
      { path: "allActivity", element: <AllActivity /> },
      { path: "applicant", element: <Applicant /> },
      { path: "createActivity", element: <CreateActivity /> },
      { path: "manageActivity", element: <ManageActivity /> },
      { path: "listallusers", element: <ListAllUsers /> },
      { path: "editActivity/:id", element: <EditActivity /> },
    ],
  },
  {
    path: "/receip",
    element: <ReceipPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
