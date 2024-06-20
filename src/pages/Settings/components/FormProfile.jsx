import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormProfile = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop
}) => {
  return (
    <ImagesHandleCrop
      imgRef={imgRef}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
    />
  );
};

export default FormProfile;
