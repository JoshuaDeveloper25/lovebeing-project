import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [profilePosition, setProfilePosition] = useState("left");
  const [profileShapeImage, setProfileShapeImage] = useState("circle");
  console.log(profilePosition);

  const [userInfo, setUserInfo] = useState(
    JSON?.parse(localStorage?.getItem("userInfo")) || {}
  );

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    userInfo?.access_token || null
  }`;

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        triggerEffect,
        setTriggerEffect,
        profilePosition,
        setProfilePosition,
        profileShapeImage,
        setProfileShapeImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
