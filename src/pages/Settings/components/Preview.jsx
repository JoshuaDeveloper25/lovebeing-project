import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Preview = ({
  triggerEffect,
  profilePosition,
  profileShapeImage,
}) => {
  const params = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-profile/${params?.id}`
      ),
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return console.log(error);
  }

  return (
    <section className="container-page">
      <div>
        {/* Cover */}
        <img
          src={
            data?.data?.cover_images
              ? `${data?.data?.cover_images?.cloud_front_domain}/${data?.data?.cover_images?.aws_file_name}`
              : `https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
          }
          className="w-full h-96 object-cover"
        />

        {/* User Image */}
        {triggerEffect === 1 ? (
          <div
            className={`${
              profileShapeImage === "circle" ? "box -mt-20" : null
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
        )}
      </div>

      <div className="mt-3 ms-5">
        <h2>{data?.data?.epitaph || "In loving memory of"}</h2>
        <h3 className="font-bold mb-1">{data?.data?.name}</h3>
        <h3>
          <span className="font-bold">Lifetime</span>: {data?.data?.birth_date}{" "}
          X - {data?.data?.death_date}
        </h3>
      </div>
    </section>
  );
};

export default Preview;
