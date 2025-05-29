import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Home from "../pages/user/Home";
import Registration from "../pages/user/Registration";
import Detail from "../pages/user/Detail";
import Status from "../pages/user/Status";
import Dashboard from "../pages/admin/Dashboard";
import Applicant from "../pages/admin/Applicant";
import CreateActivity from "../pages/admin/CreateActivity";
import EditActivity from "../pages/admin/EditActivity";
import ProtectRouteAdmin from "./ProtectRouteAdmin";

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
      { index: true, element: <Dashboard /> },
      { path: "Applicant", element: <Applicant /> },
      { path: "CreateActivity", element: <CreateActivity /> },
      { path: "EditActivity/:id", element: <EditActivity /> },
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
