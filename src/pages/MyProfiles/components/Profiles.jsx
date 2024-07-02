import ViewAnimationScroll from "../../../components/ViewAnimationScroll";
import Profile from "./Profile";

const Profiles = ({ profiles, isLoading }) => {
  // For the scrolling cards animation
  ViewAnimationScroll();

  return (
    <article className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-7 col-span-3">
      {profiles?.map((item) => {
        return <Profile isLoading={isLoading} item={item} key={item?.id} />;
      })}
    </article>
  );
};

export default Profiles;
