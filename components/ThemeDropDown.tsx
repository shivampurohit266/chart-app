import React, { useEffect, useState } from "react";
import { getData } from "@/utils/Api";
import { ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { arrowDown } from "@/utils/UtilsSvg";

const ThemeDropDown = ({
  isAsterisk,
  selectedTheme,
  setSelectedTheme,
  setSelectedSubTheme,
  selectHeight,
  showLabelText,
}: any) => {
  const token = localStorage.getItem("authToken");
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);

  const [openDropDown, setOpenDropDown] = useState(false);
  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  useEffect(() => {
    getCompanyThemes();
  }, []);

  const handleThemeSelect = (event: any) => {
    if (event) {
      setSelectedTheme(event);
      setSelectedSubTheme("Select Sub Theme");
      setOpenDropDown(false);
    }
  };
  const getCompanyThemes = async () => {
    await getData("/company/get/theme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData?.themes) {
          setThemeArray(themeSubthemeData.themes);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <div className="relative w-full h-max">
      {showLabelText && (
        <h6 className="mb-2 text-sm text-gray">
          Theme{isAsterisk && <span className="text-red-500">*</span>}
        </h6>
      )}
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-none 
        focus:outline-none focus:ring-blue-300 font-medium border-b border-b-gray text-sm px-4 py-2.5 text-center inline-flex items-center 
        bg-transparent w-[100%] ${selectHeight}`}
        type="button"
        onClick={handleDropDown}
      >
        {selectedTheme !== "All Themes" ? (
          themeArray.filter(function (item) {
            return selectedTheme === item?.themeId;
          })[0]?.themeName
        ) : (
          <>All Themes</>
        )}
        <span className="ml-auto">{arrowDown}</span>
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
            <li
              className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              // value={theme?.themeName}
              // title={theme?.themeName}
              onClick={() => handleThemeSelect("All Themes")}
            >
              All Themes
            </li>
            {themeArray.length > 0 &&
              themeArray?.map((theme, index) => {
                return (
                  <li
                    key={index}
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    // value={theme?.themeName}
                    // title={theme?.themeName}
                    onClick={() => handleThemeSelect(theme?.themeId)}
                  >
                    {theme?.themeName}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeDropDown;
