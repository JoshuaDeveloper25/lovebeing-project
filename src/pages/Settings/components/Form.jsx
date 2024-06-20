import ImagesHandle from "../../../components/ImagesHandle";
import ButtonForm from "../../../components/ButtonForm";

const Form = ({ isPending, setImages, images }) => {
  return (
    <div>
      <ImagesHandle images={images} setImages={setImages} />

      <ButtonForm
        isPending={isPending}
        statusOn={"Saving Changes..."}
        statusOff={"Save Changes"}
      />
    </div>
  );
};

export default Form;
