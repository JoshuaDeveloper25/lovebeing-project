import ImagesHandle from "../../../components/ImagesHandle";

const FormGalleryImages = ({ setImages, images }) => {
  return (
    <>
      <ImagesHandle setImages={setImages} images={images} />
      
      <button type="submit" className="btn btn-blue">
        Upload Images
      </button>
    </>
  );
};

export default FormGalleryImages;
