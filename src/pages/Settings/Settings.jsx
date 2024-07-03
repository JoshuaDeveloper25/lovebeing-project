import RememberProfile from "../../components/RememberProfile";

const Settings = () => {
  return (
    <div className="flex h-full min-h-[100vh]">
      <main className="flex-[75%] min-[1200px]:pt-5 pt-0 ">
        <div className="md:block flex flex-col md:flex-row">
          {/* General Information */}
          <RememberProfile apiUrl={"get-profile"} queryKey={"profile"} />
        </div>
      </main>
    </div>
  );
};

export default Settings;
