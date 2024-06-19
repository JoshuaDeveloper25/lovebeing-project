import { InputForm } from "../../../components/InputForm";
import { Link } from "react-router-dom";

import clouds from "../../../assets/clouds.png";

const Form = ({ handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-1 rounded-e-2xl px-10`}
    >
      <img src={clouds} className="absolute top-14 -z-[2] -right-8 h-[80vh]" />

      <h2 className="text-center heading-title text-[1.6rem] pb-3">
        Create your account
      </h2>

      <InputForm
        inputName={"name"}
        inputType={"text"}
        inputLabel={"Name"}
        inputPlaceholder={"Enter your name"}
        inputLabelClassName={"relative"}
      />

      <InputForm
        inputName={"email"}
        inputType={"email"}
        inputLabel={"Email Address"}
        inputPlaceholder={"Enter your email"}
        inputLabelClassName={"relative my-6 block"}
      />

      <InputForm
        inputName={"password"}
        inputType={"text"}
        inputLabel={"Password"}
        inputPlaceholder={"Enter your password"}
        inputLabelClassName={"relative mb-6 block"}
      />

      <InputForm
        inputName={"repeatPassword"}
        inputType={"text"}
        inputLabel={"Repeat Password"}
        inputPlaceholder={"Confirm your password"}
        inputLabelClassName={"relative"}
      />

      <div className="flex mt-4 gap-3">
        <div>
          <button
            type="submit"
            className="bg-secondary-color hover:bg-secondary-color/75 animation-fade text-white rounded-full px-6 py-1"
          >
            Sign Up
          </button>
        </div>

        <div>
          <Link
            to={"/sign-in"}
            className="border-[#C4C4C4] border text-[#C4C4C4] hover:bg-[#C8C8C8]/90 hover:text-[#FFFFFF] animation-fade rounded-full px-6 py-1 block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
