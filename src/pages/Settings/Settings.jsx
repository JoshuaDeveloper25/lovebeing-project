import SidebarProfile from "./components/SidebarProfile";
import Preview from "./components/Preview";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Settings = () => {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [profilePosition, setProfilePosition] = useState("left");
  const [profileShapeImage, setProfileShapeImage] = useState("circle");
  const [toggledMenuHam, setToggledMenuHam] = useState(false);

  return (
    <div className="flex h-full min-h-[100vh]">
      <SidebarProfile
        setTriggerEffect={setTriggerEffect}
        setProfilePosition={setProfilePosition}
        setProfileShapeImage={setProfileShapeImage}
        toggledMenuHam={toggledMenuHam}
        setToggledMenuHam={setToggledMenuHam}
      />

      <main className="flex-[75%] p-2 overflow-x-hidden">
        <div className="md:block flex flex-col md:flex-row">
          {/* Hamburguer Button */}
          <button
            className="sb-button min-[768px]:hidden"
            onClick={() => setToggledMenuHam(!toggledMenuHam)}
          >
            <FiMenu className="size-8" />
          </button>

          {/* General Information */}
          <Preview
            triggerEffect={triggerEffect}
            profilePosition={profilePosition}
            profileShapeImage={profileShapeImage}
          />
        </div>
      </main>
    </div>
  );
};

export default Settings;
