import logo from "../../../assets/funeral-logo.png";

const FastInformation = () => {
  return (
    <div className="relative -z-[100] flex-1 p-6 text-center rounded-s-2xl bg-gradient-to-b from-secondary-color to-secondary-color/85 text-white">
      <h2 className="text-lg font-semibold">Welcome to</h2>
      <img
        loading="lazy"
        decoding="async"
        className="w-20 mx-auto my-10"
        src={logo}
      />
      <p className="text-xs text-slate-200 leading-[1.4]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam, eum
        nobis iure officiis doloremque dignissimos inventore officia maiores
        pariatur iusto.
      </p>

      <div className="flex justify-center mt-24 gap-4">
        <div>
          <h3 className="font-[100]">
            Creator <span className="font-bold">Here</span>
          </h3>
        </div>

        <div className="h-6 w-[.1rem] bg-slate-200"></div>

        <div>
          <h3 className="font-[100]">
            Designer <span className="font-bold">Here</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FastInformation;
