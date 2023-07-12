import { subThemeArr } from "@/utils/utilsArray";
import { themeArr } from "@/utils/utilsArray";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./Breadcrumbs";
import Button from "./Button";
import DataCollectionHeader from "./DataCollectionHeader";
import DataCollectionTable from "./DataCollectionTable";
import { useRouter } from "next/router";
import { getData } from "@/utils/Api";
import { SubThemeArr, ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { logOut } from "@/utils/Auth";

const DataCollectionTabs = () => {
  const router = useRouter();
  const token = localStorage.getItem("authToken");
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [subThemeArray, setSubThemeArray] = useState<SubThemeArr[]>([]);
  const [KIMSuggestion, setKIMSuggestion] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [showSelectedTabData, setshowSelectedTabData] = useState(
    router?.query?.sth
  );

  const handleTabData = (e: any) => {
    setshowSelectedTabData((prevState) => (prevState !== e ? e : prevState));
  };
  const subThemeFilterdData = subThemeArray?.filter(
    (filterSubThemeData) => filterSubThemeData.themeId === router?.query?.th
  );

  useEffect(() => {
    getCompanyThemesSubthemes();
  }, []);

  useEffect(() => {
    setshowSelectedTabData((prevState) =>
      prevState !== router.query.sth ? router.query.sth : prevState
    );
  }, [router.query.sth]);

  useEffect(() => {
    getKIMSuggestion();
  }, [showSelectedTabData]);

  const getCompanyThemesSubthemes = async () => {
    // console.log("???????>>>>?????>>>");

    await getData("/company/theme/subtheme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData?.companyTheme?.themes?.length) {
          setThemeArray(themeSubthemeData?.companyTheme?.themes);
          setSubThemeArray(themeSubthemeData?.companySubtheme?.subthemes);
          // setShowLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const getKIMSuggestion = async () => {
    if (router.query.th && showSelectedTabData) {
      setLoading(true);
      await getData(
        `/company/get/kim/variable/constant/name?themeId=${router.query.th}&subthemeId=${showSelectedTabData}`,
        token
      )
        .then(function (resp) {
          if (resp?.data?.data?.result) {
            const KIMdData = resp?.data?.data?.result;

            let newUpdates = [...KIMdData];

            // newUpdates[0].kim.data[0].isEdit= false
            for (let i = 0; i < newUpdates.length; i++) {
              for (let j = 0; j < newUpdates[i]?.kim?.data.length; j++) {
                newUpdates[i].kim.data[j].isEdited = false;
              }
            }
            for (let i = 0; i < newUpdates.length; i++) {
              for (
                let j = 0;
                j < newUpdates[i]?.matchingVariables?.length;
                j++
              ) {
                for (
                  let k = 0;
                  k < newUpdates[i]?.matchingVariables[j]?.data?.length;
                  k++
                ) {
                  newUpdates[i].matchingVariables[j].data[k].isEdited = false;
                }
              }
            }
            for (let i = 0; i < newUpdates.length; i++) {
              for (
                let j = 0;
                j < newUpdates[i]?.matchingConstants?.length;
                j++
              ) {
                for (
                  let k = 0;
                  k < newUpdates[i]?.matchingConstants[j]?.data?.length;
                  k++
                ) {
                  newUpdates[i].matchingConstants[j].data[k].isEdited = false;
                }
              }
            }

            setKIMSuggestion(newUpdates);
            setLoading(false);
          } else if (resp?.response?.data?.message === "Unauthorized") {
            logOut();
          }
        })
        .catch((err) => {
          console.log(err, "errrr");
        });
    }
  };

  // console.log(
  //   KIMSuggestion,
  //   "1st step filter data",
  //   router?.query,
  //   showSelectedTabData
  // );

  return (
    <div className="ml-[auto] w-[calc(100%-240px)] max-h-[calc(100vh-48px)] text-white bg-primaryBlack fixed right-0 overflow-y-auto h-full">
      <div className="flex bg-secondaryBlack border-b border-[#606060]">
        {subThemeFilterdData.map((data: any, index) => {
          return (
            <div
              key={index}
              className={`py-4 px-9 cursor-pointer text-sm border-b-2 border-transparent ${
                data.subthemeId === showSelectedTabData
                  ? "!bg-[#8E4DFF]/20 !border-purple"
                  : "bg-transparent border-transparent"
              }
              `}
              onClick={(e) => {
                handleTabData(data.subthemeId);
                setLoading(true);
              }}
            >
              {data.subthemeName}
            </div>
          );
        })}
      </div>
      <div className="pb-4 mt-4 px-9">
        <BreadCrumbs
          subThemeName={subThemeArray?.filter(
            (filterSubThemeData) =>
              filterSubThemeData.subthemeId === showSelectedTabData
          )}
        />

        <DataCollectionHeader />
        {/* <ul>{showSelectedTabData}</ul> */}
        {loading ? (
          <div className="flex justify-center mt-48">
            <div
              className=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className=" !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <DataCollectionTable
            getKIMSuggestion={getKIMSuggestion}
            setKIMSuggestion={setKIMSuggestion}
            KIMData={KIMSuggestion}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DataCollectionTabs;
