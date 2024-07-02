import RememberProfile from "../../components/RememberProfile";

const Remembered = () => {
  return (
    <div className="mt-10">
      <RememberProfile
        apiUrl={"get-remembered-profile"}
        queryKey={"individualProfile"}
        enableEffects={false}
      />
    </div>
  );
};

export default Remembered;
