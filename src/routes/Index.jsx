import { useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import homeRoutes from "./Home.routes";
import authRoutes from "./Auth.routes";

const routes = [
  // Public website pages
  {
    element: <MainLayout />,
    children: [...homeRoutes],
  },

  // Authentication pages
  {
    element: <AuthLayout />,
    children: [...authRoutes],
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
