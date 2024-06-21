const TabLink = ({
  setOpenTab,
  openTab,
  numberTab,
  iconTab,
  linkTab,
  textTab,
}) => {
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === numberTab
            ? "bg-primary-color/30 text-black"
            : "bg-white")
        }
        onClick={(e) => {
          e.preventDefault();
          setOpenTab(numberTab);
        }}
        data-toggle="tab"
        href={linkTab}
        role="tablist"
      >
        <span className="inline-block">{iconTab}</span> {textTab}
      </a>
    </li>
  );
};

export default TabLink;
