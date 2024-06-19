import { InputForm } from "../../../components/InputForm";
import clouds from "../../../assets/clouds.png";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit }) => {
  return (
    <form
      className={`flex-1 p-4 rounded-e-2xl bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${clouds})` }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-center heading-title text-[1.6rem] mb-10">
        Sign in to your account
      </h2>

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

      <div className="flex mt-4 gap-3">
        <div>
          <button
            type="submit"
            className="border-[#C4C4C4] border text-[#C4C4C4] hover:bg-[#C8C8C8]/90 hover:text-[#FFFFFF] animation-fade rounded-full px-6 py-1"
          >
            Sign In
          </button>
        </div>

        <div>
          <Link
            to={"/sign-up"}
            className="bg-secondary-color hover:bg-secondary-color/75 animation-fade text-white rounded-full px-6 py-1 block"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
