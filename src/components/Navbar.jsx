import NavbarDropdownLink from "./NavbarDropdownLink";
import AppContext from "../context/AppProvider";
import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleLogOut = () => {
    toast.success("¡Successfully logged out!");
    localStorage.removeItem("userInfo");
    setUserInfo({});
  };

  return (
    <>
      <nav className="bg-black/80 text-white py-2">
        <div className="container-page px-2">
          <div className="flex justify-between items-center">
            <div>
              <Link to={"/"}>
                <h1 className="italic tracking-widest text-xl">Logo</h1>
              </Link>
            </div>

            <div className="relative">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="animation-fade text-xl hover:rounded-full hover:opacity-45 hover:bg-black/20 p-2"
                onClick={() => setOpenDropDown(!openDropDown)}
                type="button"
              >
                <FaHeart size={24} className="text-red-500" />
              </button>

              {openDropDown && (
                <>
                  {createPortal(
                    <div
                      onClick={() => setOpenDropDown(!openDropDown)}
                      className="h-[100vh] fixed top-0 w-full"
                    ></div>,
                    document.body
                  )}

                  {userInfo?.access_token && (
                    <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-primary-color"}
                        linkText={"My Profiles"}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"/my-profiles/"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-primary-color"}
                        linkText={"Settings"}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"#"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-red-500"}
                        linkText={"Log Out"}
                        onClick={handleLogOut}
                      />
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
