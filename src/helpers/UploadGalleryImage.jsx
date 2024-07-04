import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Modal from "../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import getFastApiErrors from "../utils/getFastApiErrors";
import ImagesHandle from "../components/ImagesHandle";
import FormGalleryImages from "../pages/Settings/components/FormGalleryImages";

const UploadGalleryImage = () => {
  const [openModalGallery, setOpenModalGallery] = useState(false);
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();

  const addGalleryImageMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/upload_cover_image/${
          params?.id
        }`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["galleryImages"]);
      setOpenModalGallery(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitGalleryImage = async (e) => {
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
    addGalleryImageMutation?.mutate(formData);
  };

  return (
    <>
      <button
        onClick={() => setOpenModalGallery(true)}
        className="btn btn-blue w-auto"
        type="button"
      >
        <FaPlus className="inline-block" /> Add New Photo
      </button>

      {/* Add Gallery Image Modal */}
      <Modal
        titleModal={"Change Profile Image"}
        handleSubmit={handleSubmitGalleryImage}
        setOpenModal={setOpenModalGallery}
        openModal={openModalGallery}
      >
        <FormGalleryImages setImages={setImages} images={images} />
      </Modal>
    </>
  );
};

export default UploadGalleryImage;
