import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLivedDays } from "../../../utils/getLivedDays";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaPencilAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Profile = ({ item, isPending }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteProfileMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/delete-remembered-profile/${item?.id}`
      ),
    onSuccess: (res) => {
      toast.success("¡Successfully profile deleted!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProfileMutation.mutate(null, {
          onSuccess: () => {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your profile has been deleted.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your profile.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return isPending ? (
    <div className="reveal shadow-2xl rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse">
        <div className="bg-primary-color/45 h-32 rounded-t-lg w-full"></div>

        <div className="flex gap-3">
          <div className="h-20 w-20 -mt-14 object-cover rounded-full ms-3 bg-white border-4 border-black/35"></div>
          <div className="self-end h-2 w-14 bg-primary-color/45 rounded"></div>
        </div>

        <div className="flex justify-center mt-4 gap-3">
          <div className="h-2 w-14 bg-primary-color/45 rounded"></div>
          <div className="h-2 w-14 bg-primary-color/45 rounded"></div>
        </div>

        <div className="mt-3 h-8 w-full bg-primary-color/45 rounded"></div>

        <div className="flex justify-center mt-2 gap-3">
          <div className="h-8 w-full bg-primary-color/45 rounded"></div>
          <div className="h-8 w-full bg-primary-color/45 rounded"></div>
        </div>

        <div className="mt-2 h-8 w-full bg-primary-color/45 rounded"></div>

        <div className="flex justify-center mt-4 gap-3">
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative reveal shadow-2xl">
      <img
        src={
          item?.cover_images?.cloud_front_domain
            ? `${item?.cover_images?.cloud_front_domain}/${item?.cover_images?.aws_file_name}`
            : "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className="w-full h-32 object-cover rounded-t-lg"
        decoding="async"
        loading="lazy"
      />
      <div className="p-6 rounded-b-lg">
        <div className="flex gap-3">
          <img
            src={
              item?.profile_images?.cloud_front_domain
                ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
                : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            }
            className="h-24 w-24 -mt-20 object-cover rounded-full border-4 border-black/60"
            decoding="async"
            loading="lazy"
          />
          <h2 className="capitalize self-end font-bold text-xl leading-6">
            {item?.name}
          </h2>
        </div>

        <div className="mt-4 text-center">
          <h4 className="text-gray-700 font-medium text-xs">
            {item?.birth_date} - {item?.death_date}
            <span className="block text-[.7rem] font-bold">
              {getLivedDays(item?.birth_date, item?.death_date)}
            </span>
          </h4>
          <p className="text-sm mt-3">
            <span className="font-bold">Epitaph:</span>{" "}
            <span className="text-gray-900">
              {item?.epitaph || "In Loving Memory Of"}
            </span>
          </p>
        </div>

        <div className="my-4">
          {/* Buttons */}
          {deleteProfileMutation?.isPending ? null : (
            <div className="flex gap-3">
              <Link className="flex-1" to={`/remembered/${item?.id}`}>
                <button
                  disabled={deleteProfileMutation?.isPending}
                  className={`btn bg-[#00A2B3] text-white hover:bg-[#00A2B3]/80 animation-fade rounded-sm text-sm ${
                    deleteProfileMutation?.isPending &&
                    "pointer-events-none opacity-75 cursor-wait"
                  }`}
                >
                  <FaEye className="inline-block me-1" />
                  View
                </button>
              </Link>

              <Link className="flex-1" to={`/settings/${item?.id}`}>
                <button
                  disabled={deleteProfileMutation?.isPending}
                  className={`btn text-[#00A2B3] animation-fade  hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm text-sm ${
                    deleteProfileMutation?.isPending &&
                    "pointer-events-none opacity-75 cursor-wait"
                  }`}
                >
                  <FaPencilAlt className="inline-block me-1" /> Edit
                </button>
              </Link>
            </div>
          )}

          <div className="absolute top-0 right-0">
            <button
              disabled={deleteProfileMutation?.isPending}
              onClick={handleDelete}
              className="rounded-tr-lg text-red-500 hover:bg-red-500/50 animation-fade rounded-sm text-sm"
            >
              {deleteProfileMutation?.isPending ? (
                <div className="rounded-tr-lg bg-red-500/20 p-3" role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <p className="rounded-tr-lg bg-red-500/20 p-3">
                  <FaTrashCan className="size-4 inline-block " />
                </p>
              )}
            </button>
          </div>
        </div>

        {/* Social media */}
        <div className="flex justify-center gap-5">
          <FaFacebookF
            size={18}
            className="hover:text-[#00A2B3] animation-fade cursor-pointer"
          />
          <FaInstagram
            size={18}
            className="hover:text-[#00A2B3] animation-fade cursor-pointer"
          />
          <FaYoutube
            size={18}
            className="hover:text-[#00A2B3] animation-fade cursor-pointer"
          />
          <FaTwitter
            size={18}
            className="hover:text-[#00A2B3] animation-fade cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
