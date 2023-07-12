import { SelectDropDownInterface } from "@/utils/Interface/InterfaceKeyImpactMetrics";
import { arrowDown } from "@/utils/UtilsSvg";
import React from "react";

const SelectInput = (props: SelectDropDownInterface) => {
  return (
    <div
      className={`text-gray-800 text-[#999999] ${props.selectParentClasses}`}
    >
      <label className={props.selectLabelClasses}>{props.selectLabel}</label>
      <div className="relative w-full">
        <select
          // as={props.as}
          name={props.name}
          className={`pr-12 appearance-none cursor-pointer
          border-transparent border-t-transparent border-b-gray focus:outline-none focus:border-purple 
          ${props.selectClasses}`}
          onChange={(e) => console.log(">>>???",e.target.value)}
        >
          <option value={" "}>Select</option>
          {props.options.map((value: any, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <div className="absolute top-0 bottom-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          {arrowDown}
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
