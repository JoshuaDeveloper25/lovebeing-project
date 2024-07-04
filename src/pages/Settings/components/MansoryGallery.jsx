import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";

const MansoryGallery = ({ ownProfilesQuery, params }) => {
  const galleryImagesProfile = ownProfilesQuery?.data?.data
    ?.map((item) => item)
    ?.filter((item) => item?.id === +params?.id)[0]?.gallery_images;

  return (
    <>
      {galleryImagesProfile?.length !== 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          gutter="10px"
        >
          <Masonry gutter="10px">
            {/* If there's images we apply the mansory design */}
            {galleryImagesProfile?.map((item) => (
              <div key={uuidv4()}>
                <img
                  className="w-full block rounded-lg"
                  src={`${item?.cloud_front_domain}/${item?.aws_file_name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <h2 className="text-center text-xl my-8 text-primary-color font-bold">
          There's no images uploaded yet...
        </h2>
      )}
    </>
  );
};
export default MansoryGallery;
