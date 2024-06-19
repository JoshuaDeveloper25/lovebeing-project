import AppContext from "../../../../context/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

const Home = () => {
  const { triggerEffect, profilePosition, profileShapeImage } =
    useContext(AppContext);
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

  console.log(data?.data?.profile_images);

  return (
    <section className="container-page">
      <div className="">
        {/* Cover */}
        <img
          src={`${data?.data?.cover_images?.cloud_front_domain}/${data?.data?.cover_images?.aws_file_name}`}
          className="w-full h-96"
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
                  src={`${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`}
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
                  src={`${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`}
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
                src={`${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`}
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
                src={`${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`}
              />
            )}
          </div>
        )}
      </div>

      <div className="mt-3 ms-5">
        <h2>{data?.data?.epitaph || "In loving memory of"}</h2>
        <h3 className="font-bold mb-1">{data?.data?.name}</h3>
        <h3>
          <span className="font-bold">Lifetime</span>: {data?.data?.birth_date}{" "}X
          - {data?.data?.death_date}
        </h3>
      </div>
    </section>
  );
};

export default Home;
