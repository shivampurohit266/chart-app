/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { putDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import Button from "./Button";
import {
  alpha,
  dangerIcon,
  plusIconSvg,
  searchIcon,
  closeIconSvg,
} from "@/utils/UtilsSvg";

const FormulaKIM = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [matrixArr, setMatrixArr] = useState(props?.companyKIMs);
  const [sort, setSort] = useState(false);
  const [searchKIM, setSearchKIM] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  useEffect(() => {
    setMatrixArr(props.companyKIMs);
  }, [props.companyKIMs]);

  const changeKIMCheck = (e: any, kimData: any) => {
    let tampArr = [...matrixArr];
    tampArr.map((user) => {
      if (user._id === kimData?._id) {
        user.selected = e.target.checked;
        props?.setSelectedKIMData && props?.setSelectedKIMData(kimData);
      } else {
        user.selected = false;
      }
      return user;
    });

    setMatrixArr(tampArr);
    props.setCompanyKIMs(tampArr);
  };
  /*******To Show selected kim at top*******/
  // useEffect(() => {
  //   const KimArr = [...props.companyKIMs];
  //   KimArr?.sort((a: any, b: any) => (b.selected ? 1 : a.selected ? -1 : 0));
  //   props.setCompanyKIMs(KimArr);
  // }, [props.companyKIMs]);

  const addMatricToChart = async (KIM: any) => {
    let url = "";
    switch (props?.selectEditChart?.type) {
      case "Pie Chart With Needle":
        url = `/company/pieChart/needle/kim/${props?.selectEditChart?.id}`;
        break;
      case "Two Level Pie Chart":
        url = `/company/twoLevel/chart/kim/${props?.selectEditChart?.id}`;
        break;
      case "Custom Active Shape Pie Chart":
        url = `/company/customActive/chart/kim/${props?.selectEditChart?.id}`;
        break;
      case "Stacked Bar Chart":
        url = `/company/stackedBar/chart/kim/${props?.selectEditChart?.id}`;
        break;
      case "Composed Responsive Container":
        url = `/company/composedResponsive/container/kim/${props?.selectEditChart?.id}`;
        break;
      case "Simple tree map":
        url = `/company/simpleTree/map/kim/${props?.selectEditChart?.id}`;
        break;
      case "boolean Chart":
        url = `/company/boolean/chart/kim/${props?.selectEditChart?.id}`;
    }

    await putDataWithToken(url, [KIM], token)
      .then(function (resp) {
        const chartData = resp?.data;
        console.log(resp);

        if (chartData) {
          Toast.showToast(ToastType.SUCCESS, chartData?.message);
          props?.handleEditChart(
            props?.selectEditChart?.id,
            chartData?.data?.chartType,
            chartData?.data,
            props?.selectEditChart?.callBack
          );
          props?.selectEditChart?.callBack();
        } else {
          Toast.showToast(ToastType.ERROR, resp?.response?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleSearchInput = (input: string) => {
    setSearchKIM(input);
  };
  const handleSearchButton = () => {
    setShowSearchInput(true);
  };
  const handleAlphaButton = () => {
    if (!sort) {
      matrixArr?.sort((a: any, b: any) =>
        a.metric > b.metric ? 1 : a.metric < b.metric ? -1 : 0
      );
    } else {
      matrixArr?.sort((a: any, b: any) =>
        a.metric < b.metric ? 1 : a.metric > b.metric ? -1 : 0
      );
    }
    setSort(!sort);
  };
  return (
    <>
      <div className="sticky top-0 bg-darkGray z-[3] left-0">
        {showSearchInput ? (
          <div className="relative top-0 right-0 flex items-center justify-center w-full h-10 text-gray-600 border-b border-b-[868686] grow ">
            <input
              autoFocus
              className="min-h-10 px-5 pr-16 bg-transparent focus:outline-none h-[41px] text-base w-full"
              type="search"
              name="search"
              onChange={(e: any) => handleSearchInput(e.target.value)}
            />
            <div
              onClick={() => {
                setShowSearchInput(false);
                setSearchKIM("");
              }}
              className="absolute top-0 right-0 mr-4 flex h-[inherit] items-center cursor-pointer"
            >
              {closeIconSvg}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-b-[#868686]">
            <div className="items-start px-4 py-2 font-medium text-whiteOpacity">
              Key Impact Metric
            </div>
            <div className="flex items-center">
              <div
                onClick={handleSearchButton}
                className={`px-2 cursor-pointer`}
              >
                {searchIcon}
              </div>
              <div
                onClick={handleAlphaButton}
                className={`px-2 pt-2 cursor-pointer`}
              >
                {alpha}
              </div>
            </div>
          </div>
        )}
      </div>

      {matrixArr &&
        matrixArr.length > 0 &&
        matrixArr
          ?.filter((kim: any) => {
            if (searchKIM) {
              return kim?.metric
                ?.toLowerCase()
                .includes(searchKIM?.toLowerCase());
            } else {
              return kim;
            }
          })
          .map((items: any) => {
            return (
              <div
                key={items._id}
                className="p-3 border-b flex border-[#868686] "
              >
                <input
                  className="top-0 left-0 w-full h-5 text-blue-600 bg-gray-100 border-gray-300 rounded max-w-4 min-w-4 peer styled-checkbox focus:ring-blue-500 focus:ring-2"
                  type={"checkbox"}
                  id={`${items.metric}`}
                  name={`picked`}
                  checked={items.selected}
                  onChange={(e) => changeKIMCheck(e, items)}
                  value={items.metric}
                />
                <label
                  htmlFor={items.metric}
                  className="flex w-full leading-[19px] text-sm"
                >
                  <span
                    className={`${
                      items?.formula?.length > 0
                        ? "text-purple trim-text"
                        : "trim-text"
                    }`}
                  >
                    {items.metric}
                  </span>
                </label>
                {items?.selected &&
                  items.formula.length > 0 &&
                  props?.selectEditChart?.id && (
                    <Button
                      type={"submit"}
                      classProperty={
                        "bg-purple !px-2 !py-1 items-center max-w-7"
                      }
                      marginProperty={"mb-0"}
                      imageClass="ml-[1px]"
                      text={""}
                      changeStep={() => addMatricToChart(items)}
                    />
                  )}
                {items?.selected &&
                  !items.formula.length &&
                  props?.selectEditChart?.id && (
                    // <Image className={"kim-warn-id-for-tooltip"} src={warning} alt="" />
                    <div id="kim-warn-id-for-tooltip">{dangerIcon}</div>
                  )}
              </div>
            );
          })}
    </>
  );
};

export default FormulaKIM;
