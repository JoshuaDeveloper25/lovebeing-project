import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormCreateProfile from "./components/FormCreateProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import { useEffect, useState } from "react";
import Profiles from "./components/Profiles";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";

import cloudsVideo from "../../assets/clouds.mp4";

const MyProfiles = () => {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient(); 

  const { data, isLoading, error } = useQuery({
    queryKey: ["ownProfiles"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-own-profiles`
      ),
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/remembereds/create-profile`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Perfil creado exitosamente!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
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

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <video className="w-full h-60 object-cover" loop autoPlay muted>
        <source src={cloudsVideo} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      <section className="container-page my-3">
        <article className="mb-8">
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
            <FormCreateProfile isPending={createProfileMutation?.isPending} />
          </Modal>
        </article>

        <Profiles profiles={data?.data} />
      </section>
    </>
  );
};

export default MyProfiles;
