import { getData } from "@/utils/Api";
import { SubThemeArr, ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { dashboardIcon } from "@/utils/UtilsSvg";
import { subThemeArr, themeArr } from "@/utils/utilsArray";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ThemeSubThemeMenuOption = () => {
  const token = localStorage.getItem("authToken");
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [subThemeArray, setSubThemeArray] = useState<SubThemeArr[]>([]);
  const [environmentOption, setEnvironmentOption] = useState(true);
  const [clickedParentItemId, setClickedParentItemId] = useState("");

  const handleEnvironmentOption = (e: any) => {
    // setEnvironmentOption(!environmentOption);
    setClickedParentItemId(e);
  };

  useEffect(() => {
    getCompanyThemesSubthemes();
  }, []);

  const getCompanyThemesSubthemes = async () => {
    // console.log("???????>>>>?????>>>");

    await getData("/company/theme/subtheme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData?.companyTheme?.themes?.length) {
          setThemeArray(themeSubthemeData?.companyTheme?.themes);
          setSubThemeArray(themeSubthemeData?.companySubtheme?.subthemes);
          // setShowLoader(false);
        } else {
          // getCompanyThemes();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <>
      {themeArray &&
        themeArray?.length > 0 &&
        themeArray?.map((data: any, index) => {
          const subThemeData = subThemeArray?.filter(
            (filterSubThemeData) => filterSubThemeData.themeId === data.themeId
          );
          return (
            <li key={data.themeId} className="py-5">
              <div
                className="flex items-center cursor-pointer"
                onClick={(e) => handleEnvironmentOption(data.themeId)}
              >
                {dashboardIcon}
                <span className="ml-4 text-sm">{data.themeName}</span>
              </div>

              <ul className="pl-7">
                {subThemeData?.map((value: any) => {
                  return (
                    environmentOption &&
                    clickedParentItemId === value.themeId && (
                      <li key={value.subthemeId} className="mt-4">
                        <Link
                          className="flex items-center"
                          href={{
                            pathname: "/data-collection",
                            query: { sth: value.subthemeId, th: data.themeId },
                          }}
                        >
                          {dashboardIcon}
                          <span className="ml-6 text-sm">
                            {value.subthemeName}
                          </span>
                        </Link>
                      </li>
                    )
                  );
                })}
              </ul>
            </li>
          );
        })}
    </>
  );
};

export default ThemeSubThemeMenuOption;
