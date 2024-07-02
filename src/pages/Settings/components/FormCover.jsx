import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormCover = ({ previewCanvasRef, setCrop, crop, imgRef, isPending }) => {
  return (
    <ImagesHandleCrop
      imgRef={imgRef}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
      circle={false}
    />
  );
};

export default FormCover;
