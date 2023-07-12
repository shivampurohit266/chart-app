import React from "react";
import DownloadFile from "./DownloadFile";
import Button from "./Button";

const DataTemplate = (props: any) => {
  const handlePrevStep = () => {
    props.setStep(6);
  };
  const handleNextStep = () => {
    if(props?.stepDefault<8){
      props?.setStepDefault(8)
    }
    props.setStep(8);
  };
  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 text-xl font-medium">Data template</p>
      <DownloadFile />

      <div className="flex justify-end gap-4 form-group">
        <Button
          type={"reset"}
          classProperty={"bg-charcoal"}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={"Previous"}
          value={"previous"}
          changeStep={handlePrevStep}
        />

        <Button
          type={"submit"}
          classProperty={"bg-purple"}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={"Next"}
          changeStep={handleNextStep}
        />
      </div>
    </div>
  );
};

export default DataTemplate;
