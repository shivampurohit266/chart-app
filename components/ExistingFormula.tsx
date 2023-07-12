import React from "react";

const ExistingFormula = (props: any) => {
  return (
    <div className="flex flex-col h-2/5">
      <p className="mb-2 font-medium">Existing formula</p>
      <div className="p-4 bg-blackOpacity grow">
        {props?.selectedKIMData && (
          <>
            <span className="text-xs text-whiteOpacity">
              {props?.selectedKIMData?.metric} ={" "}
            </span>
            <span className="text-xs text-whiteOpacity">
              {props?.selectedKIMData?.formula
                ? props?.selectedKIMData?.formula
                : "No formula defined for this key impact metric"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ExistingFormula;
