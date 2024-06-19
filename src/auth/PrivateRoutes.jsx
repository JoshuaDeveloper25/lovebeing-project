import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../context/AppProvider";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { userInfo } = useContext(AppContext);

  // --> If there's token, we can see the private stuff...
  return userInfo?.access_token ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
