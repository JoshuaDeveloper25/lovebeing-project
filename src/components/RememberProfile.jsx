import { FaCameraRetro } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RememberProfile = ({
  // triggerEffect,
  // profilePosition,
  // profileShapeImage,
  // enableEffects,
  setOpenModalProfile,
  setOpenModal,
  queryKey,
  apiUrl,
}) => {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [profilePosition, setProfilePosition] = useState("left");
  const [profileShapeImage, setProfileShapeImage] = useState("circle");
  const params = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: [`${queryKey}`, params?.id],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/${apiUrl}/${params?.id}`
      ),
  });

  if (isPending) {
    return (
      <div className="container-page">
        <div role="status" className="max-w-full animate-pulse">
          <div className="h-[24rem] bg-primary-color/50"></div>
          <div className="bg-primary-color/50 -mt-16 ms-5 sm:h-32 h-24 sm:w-32 w-24 rounded-full mb-2.5"></div>
          <div className="mt-3 ms-5">
            <div className="h-2 w-56 bg-primary-color/50 mb-2.5"></div>
            <div className="h-2 w-32 bg-primary-color/50 mb-2.5"></div>
            <div className="h-2 w-24 bg-primary-color/50 mb-2.5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return console.log(error);
  }

  return (
    <section className="container-page">
      <article className="bg-white rounded-lg">
        {/* Cover */}
        <div className="relative">
          <img
            loading="lazy"
            decoding="async"
            src={
              data?.data?.cover_images
                ? `${data?.data?.cover_images?.cloud_front_domain}/${data?.data?.cover_images?.aws_file_name}`
                : `https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }
            className="max-h-[36rem] w-full shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none object-cover z-10"
          />
          <div className="absolute bottom-3 right-3 z-[100]">
            <button
              onClick={() => setOpenModal(true)}
              className="btn text-white bg-black/50"
              type="button"
            >
              <FaCameraRetro className="inline-block lg:me-2 size-5" />
              <span className="lg:inline-block hidden">Edit Cover Photo</span>
            </button>
          </div>
        </div>

        {/* User Image */}
        <div className="flex sm:flex-col lg:flex-row items-start lg:items-start sm:items-center text-start lg:text-start sm:text-center gap-5 lg:px-10 px-5">
          {/* {triggerEffect === 1 ? (
                <div
                  className={`${
                    profileShapeImage === "circle" ? "box" : null
                  } ${
                    profilePosition === "center"
                      ? "max-w-lg mx-auto"
                      : profilePosition === "right"
                      ? "left-[80%]"
                      : ""
                  }`}
                >
                  {profileShapeImage === "circle" ? (
                    <div className={`content`}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={
                          data?.data?.profile_images
                            ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className={`img-hanger ${
                        profilePosition === "center"
                          ? "mx-auto my-0"
                          : profilePosition === "right"
                          ? "min-[1130px]:ms-[55rem] me-0"
                          : ""
                      }}`}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={
                          data?.data?.profile_images
                            ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="-mt-20 ms-5">
                  {profileShapeImage === "circle" ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      className={`w-36 h-36 object-cover rounded-full
                    
                     ${
                       profilePosition === "center"
                         ? "mx-auto"
                         : profilePosition === "right"
                         ? "ms-auto"
                         : ""
                     }`}
                      src={
                        data?.data?.profile_images
                          ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                          : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                      }
                    />
                  ) : (
                    <img
                      loading="lazy"
                      decoding="async"
                      className={`rounded-none h-36 w-36 object-cover
                   ${
                     profilePosition === "center"
                       ? "mx-auto"
                       : profilePosition === "right"
                       ? "ms-auto"
                       : ""
                   }`}
                      src={
                        data?.data?.profile_images
                          ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                          : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                      }
                    />
                  )}
                </div>
              )} */}
          <div className="sm:max-w-none max-w-[5rem] sm:-mt-20 -mt-10 relative z-20">
            <img
              className="sm:h-[168px] w-full sm:w-[168px] h-full rounded-full"
              loading="lazy"
              decoding="async"
              src={
                data?.data?.profile_images
                  ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
            />
            <div className="absolute bottom-3 right-3 z-[100]">
              <button
                onClick={() => setOpenModalProfile(true)}
                className="p-1.5 rounded text-white bg-black/50"
                type="button"
              >
                <FaCameraRetro className="inline-block size-5" />
              </button>
            </div>
          </div>

          <div className="lg:self-end">
            <h2 className="font-semibold text-gray-500">
              {data?.data?.epitaph || "In loving memory of"}
            </h2>
            <h3 className="text-2xl font-bold mb-1">{data?.data?.name}</h3>
            <h3 className="text-gray-500">
              <span className="font-bold">Lifetime</span>:{" "}
              {data?.data?.birth_date} X - {data?.data?.death_date}
            </h3>
          </div>
        </div>
      </article>
    </section>
  );
};

export default RememberProfile;
