import getFastApiErrors from "../../utils/getFastApiErrors";
import FastInformation from "./components/FastInformation";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useContext } from "react";
import axios from "axios";

const SignIn = () => {
  const { setUserInfo } = useContext(AppContext);

  const { mutate } = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      );
    },
    onSuccess: (res) => {
      toast.success("¡Successfully logged in!");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);

      // Placing globally the token
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.data?.access_token}`;
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    formData.append("username", e?.target?.email?.value.trim());
    formData.append("password", e?.target?.password?.value.trim());

    // Form validation
    if ([formData.get("username"), formData.get("password")].includes("")) {
      return toast.error("¡Fill up the blanks available!");
    }

    // Sign in user
    mutate(formData);
  };

  return (
    <section className="max-w-4xl mx-auto shadow-lg">
      <div className="flex justify-center items-center min-h-[100vh]">
        <FastInformation />

        {/* Sign Up Form */}
        <Form handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default SignIn;
