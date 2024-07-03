// --> 🌐 External/Global Imports
import { Suspense, lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

// --> 🔗	Styles
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";

// --> 📄 Pages
const Root = lazy(() => import("./pages/Root"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Verified = lazy(() => import("./pages/Verified/Verified"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const MyProfiles = lazy(() => import("./pages/MyProfiles/MyProfiles"));
const Remembered = lazy(() => import("./pages/Remembered/Remembered"));

const PublicRoutes = lazy(() => import("./auth/PublicRoutes"));
const PrivateRoutes = lazy(() => import("./auth/PrivateRoutes"));

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

          {
            element: <Settings />,
            path: "/settings/:id",
          },
        ],
      },
    ],
  },

  {
    element: <Root />,
    children: [
      {
        element: <Remembered />,
        path: "/remembered/:id",
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Spinner />}>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            pauseOnFocusLoss={false}
            hideProgressBar={true}
            position="top-center"
            autoClose={1000}
            theme="colored"
            draggable
            stacked
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppProvider>
    </Suspense>
  );
};

export default App;
