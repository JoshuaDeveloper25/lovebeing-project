import {
  FaPencilAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="reveal shadow-2xl">
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
                : "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="h-24 w-24 -mt-20 object-cover rounded-full border-4 border-black/60"
            decoding="async"
            loading="lazy"
          />
          <h2 className="capitalize self-end font-bold text-xl leading-6">
            {item?.name}
          </h2>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-700 text-sm text-center">
            {item?.birth_date} - {item?.death_date}
          </h4>
          <p className="text-sm mt-3">{item?.epitaph}</p>
        </div>

        <div className="my-4">
          {/* Buttons */}
          <div className="flex gap-3">
            <Link className="flex-1" to={`/remembered/${item?.id}`}>
              <button className="btn bg-[#00A2B3] text-white hover:bg-[#00A2B3]/80 animation-fade rounded-sm text-sm">
                <FaEye className="inline-block me-1" />
                View
              </button>
            </Link>

            <Link className="flex-1" to={`/settings/${item?.id}`}>
              <button className="btn text-[#00A2B3] animation-fade hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm text-sm">
                <FaPencilAlt className="inline-block me-1" /> Edit
              </button>
            </Link>
          </div>

          <div className="mt-2">
            <button className="btn bg-red-500 text-white hover:bg-red-500/80 animation-fade rounded-sm text-sm">
              <FaTrash className="inline-block me-1" />
              Delete
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
