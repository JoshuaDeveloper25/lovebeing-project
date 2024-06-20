// --> 🌐 External/Global Imports
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppProvider";

// --> 🔗	Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";

// --> 📄 Pages
import Root from "./pages/Root";
import SignUp from "./pages/SignUp/SignUp";
import Verified from "./pages/Verified/Verified";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import MyProfiles from "./pages/MyProfiles/MyProfiles";

import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <SignUp />,
            path: "/sign-up",
          },

          {
            element: <SignIn />,
            path: "/sign-in",
          },

          {
            element: <Verified />,
            path: "/verified/:tokenId",
          },
        ],
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <Home />,
            index: true,
          },

          {
            element: <MyProfiles />,
            path: "/my-profiles/",
          },
        ],
      },

      {
        element: <Settings />,
        path: "/settings/:id",
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" stacked />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AppProvider>
);
