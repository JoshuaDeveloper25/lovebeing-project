import RememberProfile from "../../components/RememberProfile";
import Preview from "../Settings/components/Preview";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Remembered = () => {
  const params = useParams();

  //   const { data, isLoading, error } = useQuery({
  //     queryKey: ["individualProfile"],
  //     queryFn: async () =>
  //       await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembered-profile/${
  //           params?.id
  //         }`
  //       ),
  //   });

  //   console.log(data);

  return (
    <div className="mt-10">
      {/* <Preview /> */}
      <RememberProfile />
    </div>
  );
};

export default Remembered;
