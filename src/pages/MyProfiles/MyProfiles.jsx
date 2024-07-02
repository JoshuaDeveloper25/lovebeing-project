import IndividualUserProfileCard from "./components/IndividualUserProfileCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IndividualUserProfileTab from "./components/IndividualUserProfileTab";
import FormCreateProfile from "./components/FormCreateProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import cloudsVideo from "../../assets/clouds.mp4";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const MyProfiles = () => {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
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
      setOpenModal(false);
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
      {/* Sky Video */}
      <video className="w-full h-60 object-cover" loop autoPlay muted>
        <source src={cloudsVideo} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {/* Profiles */}
      <section className="container-page my-3">
        {/* Create Profile Button */}
        <article className="mb-8 md:text-end text-start">
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

        <div className="grid md:grid-cols-4 grid-cols-1 items-start md:gap-8">
          {/* User Profile */}
          <IndividualUserProfileCard />

          {/* Profiles from user and Tab */}
          <div className="col-span-3">
            <IndividualUserProfileTab
              profiles={data?.data}
              isPending={isPending}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfiles;
