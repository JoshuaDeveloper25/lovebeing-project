import ImagesHandle from "../../../components/ImagesHandle";
import ButtonForm from "../../../components/ButtonForm";

const FormGalleryImages = ({ isPending, setImages, images }) => {
  return (
    <>
      <ImagesHandle setImages={setImages} images={images} />

      <ButtonForm
        isPending={isPending}
        statusOn={"Uploading..."}
        statusOff={"Upload"}
      />
    </>
  );
};

export default FormGalleryImages;
