import logo from "../../../assets/funeral-logo.png";
import { Link } from "react-router-dom";

const VerifyingContent = ({ isPending, error }) => {
  return (
    <section className="flex justify-center items-center min-h-[100vh]">
      <div className="max-w-2xl shadow-2xl border p-5 rounded-lg">
        <img
          loading="lazy"
          decoding="async"
          className="w-52 mx-auto"
          src={logo}
        />
        {isPending ? (
          <>
            <h2 className="text-4xl font-medium text-center text-primary-color my-4">
              Your account is being verified...
            </h2>

            <p className="text-center text-2xl text-primary-color font-bold">
              We care about your security!
            </p>
          </>
        ) : error ? (
          <>
            <h2 className="text-4xl font-medium mt-10 text-center text-primary-color">
              Invalid token
            </h2>

            <p className="text-center my-5 text-2xl text-primary-color">
              We care about your security!
            </p>

            <div className="text-center">
              <Link
                className="text-center text-primary-color underline text-lg"
                to={`/sign-up`}
              >
                Sign Up
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-medium text-center text-primary-color">
              Your account has been verified!
            </h2>

            <p className="text-center my-5 text-2xl text-primary-colour/70">
              We care about your security!
            </p>

            <div className="text-center">
              <Link
                className="text-center text-primary-colour text-lg"
                to={`/`}
              >
                Log In
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VerifyingContent;
