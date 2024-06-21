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

  return <Preview />;
};

export default Remembered;
