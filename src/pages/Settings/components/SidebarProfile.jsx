import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import setCanvasPreview from "../../../utils/setCanvasPreview";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import { convertToPixelCrop } from "react-image-crop";
import logo from "../../../assets/funeral-logo.png";
import Modal from "../../../components/Modal";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import FormProfile from "./FormProfile";
import { toast } from "react-toastify";
import FormCover from "./FormCover";
import axios from "axios";

const SidebarProfile = ({
  setTriggerEffect,
  setProfilePosition,
  setProfileShapeImage,
  toggled,
  setToggled,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const queryClient = useQueryClient();
  const avatarUrl = useRef(
    "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
  );
  const params = useParams();
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const changeImageCoverMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/upload_cover_image/${
          params?.id
        }`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const changeImageProfileMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/upload_profile_image/${
          params?.id
        }`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModalProfile(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitCoverImage = async (e) => {
    e.preventDefault();

    const user_request = confirm(`Are you sure you want to change the image?`);

    if (!user_request) {
      return;
    }

    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    const dataUrl = previewCanvasRef.current.toDataURL();
    updateAvatar(dataUrl);

    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "cover-image.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("file", file);
    changeImageCoverMutation?.mutate(formData);
  };

  const handleSubmitProfileImage = async (e) => {
    e.preventDefault();

    const user_request = confirm(`Are you sure you want to change the image?`);

    if (!user_request) {
      return;
    }

    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    const dataUrl = previewCanvasRef.current.toDataURL();
    updateAvatar(dataUrl);

    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "profile-image.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("file", file);
    changeImageProfileMutation?.mutate(formData);
  };

  return (
    <>
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        className="flex-1 text-white"
        toggled={toggled}
        breakPoint="md"
      >
        <Menu>
          {/* Icono Flecha */}
          <div className="flex items-center justify-between px-2 py-3">
            <NavLink className="inline-block" to={"/"}>
              <IoArrowBack className="size-6" />
            </NavLink>

            <div>
              <IoCloseSharp
                onClick={() => setToggled(false)}
                className="min-[768px]:hidden size-6 cursor-pointer"
              />
            </div>
          </div>

          {/* Logo */}
          <NavLink to={"#"}>
            <img
              loading="lazy"
              decoding="async"
              className="w-20 mx-auto mb-6"
              src={logo}
            />
          </NavLink>

          <SubMenu label="Profile Effect">
            <MenuItem onClick={() => setTriggerEffect(false)}>
              {" "}
              Default
            </MenuItem>
            <MenuItem onClick={() => setTriggerEffect(1)}> Effect 1</MenuItem>
          </SubMenu>

          <SubMenu label="Profile Position">
            <MenuItem onClick={() => setProfilePosition("left")}>
              {" "}
              Left
            </MenuItem>
            <MenuItem onClick={() => setProfilePosition("center")}>
              {" "}
              Center
            </MenuItem>
            <MenuItem onClick={() => setProfilePosition("right")}>
              {" "}
              Right
            </MenuItem>
          </SubMenu>

          <SubMenu label="Shape Profile Image">
            <MenuItem onClick={() => setProfileShapeImage("circle")}>
              {" "}
              Rounded
            </MenuItem>
            <MenuItem onClick={() => setProfileShapeImage("square")}>
              {" "}
              Square
            </MenuItem>
          </SubMenu>

          <div className="px-3 my-3">
            {/* Change Image */}
            <button onClick={() => setOpenModal(true)}>
              <FaImage className="inline me-2" /> Change Cover Image
            </button>
          </div>

          <div className="px-3 pt-3">
            {/* Change Image */}
            <button onClick={() => setOpenModalProfile(true)}>
              <FaImage className="inline me-2" /> Change Profile Image
            </button>
          </div>
        </Menu>
      </Sidebar>

      {/* Change Cover Image Modal */}
      <Modal
        titleModal={"Change Cover Image"}
        handleSubmit={handleSubmitCoverImage}
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <FormCover
          isPending={changeImageCoverMutation?.isPending}
          previewCanvasRef={previewCanvasRef}
          setCrop={setCrop}
          imgRef={imgRef}
          crop={crop}
        />
      </Modal>

      {/* Change Profile Image Modal */}
      <Modal
        titleModal={"Change Profile Image"}
        handleSubmit={handleSubmitProfileImage}
        setOpenModal={setOpenModalProfile}
        openModal={openModalProfile}
      >
        <FormProfile
          isPending={changeImageProfileMutation?.isPending}
          setOpenModalProfile={setOpenModalProfile}
          previewCanvasRef={previewCanvasRef}
          setCrop={setCrop}
          imgRef={imgRef}
          crop={crop}
        />
      </Modal>
    </>
  );
};

export default SidebarProfile;
