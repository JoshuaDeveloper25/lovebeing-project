import FormCover from "../pages/Settings/components/FormCover";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useRef, useState } from "react";

const UploadCoverImage = () => {
  const [openModal, setOpenModal] = useState(false);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
  const params = useParams();
  const imgRef = useRef(null);
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

  return (
    <>
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
    </>
  );
};

export default UploadCoverImage;
