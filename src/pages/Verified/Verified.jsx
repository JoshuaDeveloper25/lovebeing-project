import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import VerifyingContent from "./components/VerifyingContent";

const Verified = () => {
  const params = useParams();

  const { isPending, error } = useQuery({
    queryKey: ["confirmToken"],
    queryFn: async () =>
      await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/confirm-account/:tokenId?tokenId=${params?.tokenId}`
      ),
  });

  return <VerifyingContent isPending={isPending} error={error} />;
};

export default Verified;
