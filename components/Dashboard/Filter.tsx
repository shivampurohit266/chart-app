import { crossSvg } from "@/utils/UtilsSvg";
import Image from "next/image";
import React, { useState } from "react";
import SubThemeDropDown from "../SubThemeDropDown";
import ThemeDropDown from "../ThemeDropDown";
import { useEffect } from "react";
import { getData } from "@/utils/Api";
import { downloadSvg } from "@/utils/UtilsSvg";
import reset from "../../images/resetBtn.png";

const Filter = (props: any) => {
  const [selectedTheme, setSelectedTheme] = useState<any>("All Themes");
  const [selectedSubTheme, setSelectedSubTheme] =
    useState<any>("Select Sub Theme");
  const token = localStorage.getItem("authToken");

  const [companyKIMs, setCompanyKIMs] = useState<any[]>([]);

  const [selectedKim, setSelectedKim] = useState<String>();
  const [themeArray, setThemeArray] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  useEffect(() => {
    getCompanyThemes();
  }, [selectedTheme, selectedSubTheme]);

  console.log(themeArray, "Theme Array");

  const getCompanyThemes = async () => {
    await getData("/company/get/theme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData) {
          setThemeArray(themeSubthemeData.themes);
          // setSubThemeArray(themeSubthemeData.subthemesArr);
          setShowLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <div
      data-te-modal-init
      className="modal fixed left-0 top-0 z-[100] h-full w-full outline-none text-white bg-primaryBlack/80 flex  content-center"
    >
      <div
        data-te-modal-dialog-ref
        className={` pointer-events-none relative translate-[-50px] transition-all duration-300 ease-in-out mx-auto w-full pt-10 max-w-[850px]`}
      >
        <div className="relative flex flex-col w-full pb-2 ml-32 pointer-events-auto h-max bg-darkGray">
          <div className="flex justify-between px-4 py-2 ">
            <div className="w-32">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="flex justify-between  text-purple bg-blue-700 hover:bg-blue-800 focus:ring-none 
                focus:outline-none focus:ring-blue-300 font-bold border-b border-b-gray text-sm px-4 py-2.5 text-center inline-flex items-center 
                bg-secondaryBlack w-full  "
                type="button"
                onClick={handleDropDown}
              >
                SDG {downloadSvg}
              </button>

              {openDropDown && (
                <div
                  id="dropdown"
                  className="absolute z-50 w-2/5 divide-y divide-gray-100 top-15 w-44 dark:bg-gray-700 bg-darkGray2"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                      action1
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        action2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        action3
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        action4
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="w-2/5 m-4 h-28"></div>

            <div className="flex items-center justify-between mb-2 w-80 bg-darkGray h-max">
              <ThemeDropDown
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                setSelectedSubTheme={setSelectedSubTheme}
                selectHeight={"h-10"}
              />
              <SubThemeDropDown
                selectedTheme={selectedTheme}
                selectedSubTheme={selectedSubTheme}
                setSelectedSubTheme={setSelectedSubTheme}
                selectHeight={"h-10"}
              />
            </div>
          </div>
          <div className="flex justify-between mr-4">
            <button className="flex items-center justify-between w-20 p-1.5 border-gray  ml-4 border rounded">
              Reset <Image src={reset} alt="" />{" "}
            </button>
            <div className="flex justify-between w-1/3 text-sm ">
              <button className="w-20 py-1 bg-gray">Cancel</button>
              <button className="w-20 text-purple">Save Filter</button>
              <button className="w-24 py-1 bg-purple">Apply Filter</button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="relative flex flex-col items-center justify-center mt-10 pointer-events-auto w-9 h-9 bg-gray"
        onClick={props.handleFilter}
      >
        {crossSvg}
      </button>
    </div>
  );
};

export default Filter;
