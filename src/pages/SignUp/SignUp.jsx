import getFastApiErrors from "../../utils/getFastApiErrors";
import FastInformation from "./components/FastInformation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const SignUp = () => {
  const { mutate } = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userInfo
      );
    },
    onSuccess: (res) => {
      toast.success("¡Successfully registered!");
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
      password: e?.target?.password?.value.trim(),
      name: e?.target?.name?.value.trim(),
    };

    // Form validation
    if (
      [
        userInfo?.email,
        userInfo?.password,
        userInfo?.name,
        e?.target?.repeatPassword?.value,
      ].includes("")
    ) {
      return toast.error("¡Fill up the blanks available!");
    } else if (
      e?.target?.password?.value !== e?.target?.repeatPassword?.value
    ) {
      return toast.error("¡Passwords are not the same!");
    }

    // Sign up user
    mutate(userInfo);
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="relative flex justify-center items-center min-h-[100vh]">
        <FastInformation />

        {/* Sign Up Form */}
        <Form handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default SignUp;
