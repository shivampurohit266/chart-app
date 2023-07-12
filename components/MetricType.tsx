import React, { useState } from "react";
import arrowIcon from "../images/solid-arrow.png";
import Image from "next/image";

const MetricType = (props: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  const handleSubThemeSelect = (e: any) => {
    props?.setTypeOfMatric(e?.target.innerText);
    setOpenDropDown(false);
  };

  return (
    <>
      <div className="relative w-full h-max">
        <h6 className="mb-2 text-sm text-gray">
          Data type of the metric<span className="text-red-500">*</span>
        </h6>

        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-none 
        focus:outline-none focus:ring-blue-300 font-medium border-b border-b-gray text-sm px-4 py-2.5 text-center inline-flex items-center 
        bg-secondaryBlack w-[100%]`}
          type="button"
          onClick={handleDropDown}
        >
          {props?.typeOfMatric === "number"
            ? "Number"
            : props?.typeOfMatric === "boolean"
            ? "Boolean"
            : props?.typeOfMatric === "list"
            ? "List"
            : "Number"}
          <Image className="ml-auto" src={arrowIcon} alt="" />
        </button>

        {openDropDown && (
          <div
            id="dropdown"
            className="absolute z-50 w-full divide-y divide-gray-100 w-44 dark:bg-gray-700 top-full bg-darkGray2"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {props.options?.length > 0 &&
                props.options.map((value: any, index: any) => {
                  return (
                    <>
                      <li
                        key={index}
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={(e) => handleSubThemeSelect(e)}
                      >
                        {value}
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MetricType;
