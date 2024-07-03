import ViewAnimationScroll from "../../../components/ViewAnimationScroll";
import Profile from "./Profile";

const Profiles = ({ profiles, isPending }) => {
  // For the scrolling cards animation
  ViewAnimationScroll();

  return profiles?.length !== 0 ? (
    <article className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-7 col-span-3">
      {profiles?.map((item) => {
        return <Profile isPending={isPending} item={item} key={item?.id} />;
      })}
    </article>
  ) : (
    <article className="text-center font-bold text-2xl py-8">
      <h2 className="text-primary-color/85">There's no profiles yet...</h2>
    </article>
  );
};

export default Profiles;
