import ButtonForm from "../../../components/ButtonForm";
import { InputForm } from "../../../components/InputForm";

const Form = ({ isPending }) => {
  return (
    <>
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <InputForm
            inputLabel="Name"
            inputClassNameAdd={"mb-1"}
            inputType="text"
            inputName="name"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2">
          <InputForm
            inputLabel={"Birth Date"}
            inputClassNameAdd={"mb-1"}
            inputType="date"
            inputName="birth_date"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2">
          <InputForm
            inputLabel={"Death Date"}
            inputClassNameAdd={"mb-1"}
            inputType="date"
            inputName="death_date"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2">
          <InputForm
            inputLabel="Epitaph (Optional)"
            inputClassNameAdd={"mb-1"}
            inputType="text"
            inputName="epitaph"
            labelClassNameAdd={"mb-0"}
          />
        </div>
      </div>

      <ButtonForm
        isPending={isPending}
        statusOff={"Add"}
        statusOn={"Adding..."}
      />
    </>
  );
};

export default Form;
