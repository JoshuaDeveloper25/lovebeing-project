import FormGalleryImages from "../pages/Settings/components/FormGalleryImages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const UploadGalleryImage = () => {
  const [openModalGallery, setOpenModalGallery] = useState(false);
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();
  const params = useParams();

  const addGalleryImageMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/upload-gallery-image/${
          params?.id
        }`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("Upload successfull!");
      queryClient.invalidateQueries(["ownProfiles"]);
      setOpenModalGallery(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitGalleryImage = (e) => {
    e.preventDefault();

    const user_request = confirm(`Are you sure you want to change the image?`);

    if (!user_request) {
      return;
    } else if (images?.length === 0) {
      return toast.error(`Upload 1 image at least!`);
    }

    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append("files", image.file);
    });

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
        titleModal={"Add Gallery Images"}
        handleSubmit={handleSubmitGalleryImage}
        setOpenModal={setOpenModalGallery}
        openModal={openModalGallery}
      >
        <FormGalleryImages
          isPending={addGalleryImageMutation?.isPending}
          setImages={setImages}
          images={images}
        />
      </Modal>
    </>
  );
};

export default UploadGalleryImage;
