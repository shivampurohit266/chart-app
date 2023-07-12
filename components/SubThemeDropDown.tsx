/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrowIcon from "../images/solid-arrow.png";
import { getData } from "@/utils/Api";
import { SubThemeArr, ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { arrowDown } from "@/utils/UtilsSvg";

const SubThemeDropDown = ({
  isAsterisk,
  selectedTheme,
  selectedSubTheme,
  setSelectedSubTheme,
  selectHeight,
  showLabelText,
  dropDownStyle,
}: any) => {
  const token = localStorage.getItem("authToken");
  const [subThemeArray, setSubThemeArray] = useState<SubThemeArr[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  useEffect(() => {
    getCompanySubThemes();
  }, [selectedTheme]);

  const getCompanySubThemes = async () => {
    await getData(
      `/company/get/subtheme?themeId=${
        selectedTheme !== "All Themes" ? selectedTheme : ""
      }
    `,
      token
    )
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData?.subthemes?.length) {
          setSubThemeArray(themeSubthemeData?.subthemes);
          // setSelectedSubTheme("Select Sub Theme");
        }
        // else{
        //   setSubThemeArray([])
        // }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleSubThemeSelect = (event: any) => {
    if (event) {
      setSelectedSubTheme(event);
      setOpenDropDown(false);
    }
  };
  return (
    <div className={`relative w-full h-max ${dropDownStyle}`}>
      {showLabelText && (
        <h6 className="mb-2 text-sm text-gray">
          Subtheme{isAsterisk && <span className="text-red-500">*</span>}
        </h6>
      )}
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-none 
        focus:outline-none focus:ring-blue-300 font-medium border-b border-b-gray text-sm px-4 py-2.5 text-center inline-flex items-center 
         w-[100%] ${selectHeight}`}
        type="button"
        onClick={handleDropDown}
      >
        {selectedSubTheme !== "Select Sub Theme" ? (
          subThemeArray?.filter(function (item) {
            return selectedSubTheme === item?.subthemeId;
          })[0]?.subthemeName
        ) : (
          <>Select Sub Theme</>
        )}
        <span className="ml-auto">{arrowDown}</span>
      </button>

      {openDropDown && (
        <div
          id="dropdown"
          className="absolute z-10 w-full divide-y divide-gray-100 w-44 dark:bg-gray-700 top-full bg-darkGray2"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSubThemeSelect("Select Sub Theme")}
            >
              Select Sub Theme
            </li>
            {subThemeArray?.length > 0 &&
              subThemeArray?.map((subTheme, index) => {
                return (
                  <li
                    key={index}
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSubThemeSelect(subTheme?.subthemeId)}
                  >
                    {subTheme?.subthemeName}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubThemeDropDown;
