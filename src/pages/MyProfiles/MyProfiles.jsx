import getFastApiErrors from "../../utils/getFastApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const MyProfiles = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const createProfileMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/create-profile`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Perfil creado exitosamente!");
      navigate(`/settings/${res?.data?.id}`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileInfo = {
      name: e?.target?.name?.value?.trim(),
      birth_date: e?.target?.birth_date?.value?.trim(),
      death_date: e?.target?.death_date?.value?.trim(),
      epitaph: e?.target?.epitaph?.value?.trim(),
    };

    createProfileMutation?.mutate(profileInfo);
  };

  return (
    <>
      <section className="container-page my-3">
        <div className="inline-block">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="btn btn-blue"
          >
            <GoPlus className="size-5 inline" /> Create Profile
          </button>
        </div>

        <Modal
          titleModal={"New Profile"}
          handleSubmit={handleSubmit}
          setOpenModal={setOpenModal}
          openModal={openModal}
        >
          <Form isPending={createProfileMutation?.isPending} />
        </Modal>
      </section>
    </>
  );
};

export default MyProfiles;
