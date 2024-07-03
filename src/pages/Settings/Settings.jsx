import RememberProfile from "../../components/RememberProfile";
import SidebarProfile from "./components/SidebarProfile";
import { FiMenu } from "react-icons/fi";
import { useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import FormCover from "./components/FormCover";
import setCanvasPreview from "../../utils/setCanvasPreview";
import { convertToPixelCrop } from "react-image-crop";
import { useParams } from "react-router-dom";
import FormProfile from "./components/FormProfile";

const Settings = () => {
  // const [triggerEffect, setTriggerEffect] = useState(false);
  // const [profilePosition, setProfilePosition] = useState("left");
  // const [profileShapeImage, setProfileShapeImage] = useState("circle");
  const params = useParams();
  const [openModalProfile, setOpenModalProfile] = useState(false);

  const [crop, setCrop] = useState();
  const previewCanvasRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const imgRef = useRef(null);
  const [toggled, setToggled] = useState(false);
  const queryClient = useQueryClient();
  const avatarUrl = useRef(
    "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
  );

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
    <div className="flex h-full min-h-[100vh]">
      {/* <SidebarProfile
        setTriggerEffect={setTriggerEffect}
        setProfilePosition={setProfilePosition}
        setProfileShapeImage={setProfileShapeImage}
        setToggled={setToggled}
        toggled={toggled}
      /> */}

      <main className="flex-[75%] min-[1200px]:pt-5 pt-0 ">
        <div className="md:block flex flex-col md:flex-row">
          {/* General Information */}
          <RememberProfile
            setOpenModalProfile={setOpenModalProfile}
            setOpenModal={setOpenModal}
            apiUrl={"get-profile"}
            queryKey={"profile"}
            // triggerEffect={triggerEffect}
            // profilePosition={profilePosition}
            // profileShapeImage={profileShapeImage}
          />

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
        </div>
      </main>
    </div>
  );
};

export default Settings;
