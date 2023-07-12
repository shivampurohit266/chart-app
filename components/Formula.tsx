import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { putDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import Button from "./Button";
import { dangerIcon } from "@/utils/UtilsSvg";

const Formula = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [matrixArr, setMatrixArr] = useState(props.companyKIMs);
  const [sort, setSort] = useState(false);
  const [searchVariable, setSearchVariable] = useState<any>("");

  useEffect(() => {
    setMatrixArr(props.companyKIMs);
  }, [props.companyKIMs]);

  const changeKIMCheck = (e: any, kimId: any) => {
    let tampArr = [...matrixArr];
    tampArr.map((user) => {
      if (user._id === kimId) {
        user.selected = e.target.checked;
        props?.setSelectedKim && props?.setSelectedKim(kimId);
      } else {
        user.selected = false;
      }
      return user;
    });
    const totalItems = matrixArr.length;
    const totalCheckedItems = tampArr.filter((e) => e.selected).length;

    setMatrixArr(tampArr);
    props.setCompanyKIMs(tampArr);
  };

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
    console.log(KIM, "addeddd", url);

    await putDataWithToken(url, KIM, token)
      .then(function (resp) {
        const chartData = resp?.data;
        console.log(resp);

        if (chartData) {
          Toast.showToast(ToastType.SUCCESS, chartData?.message);
          props?.selectEditChart?.callBack();
        } else {
          Toast.showToast(ToastType.ERROR, resp?.response?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const sortedArray = () => {
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
      <div className="sticky top-0 bg-darkGray z-[3]">
        <SearchBar
          plusOption="hidden"
          editOption="hidden"
          deleteOption="hidden"
          setSearchData={setSearchVariable}
          sortedArray={sortedArray}
        />

        <div className="p-3 border-b border-[#868686] ">
          <label htmlFor={"kim"} className="flex w-full leading-[19px] text-sm">
            {"Key Impact Metric"}
          </label>
        </div>
      </div>

      {matrixArr &&
        matrixArr.length > 0 &&
        matrixArr
          ?.filter((kim: any) => {
            if (searchVariable) {
              return kim?.metric
                ?.toLowerCase()
                .includes(searchVariable?.toLowerCase());
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
                  className="w-full max-w-4 min-w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded peer styled-checkbox focus:ring-blue-500 focus:ring-2"
                  type={"checkbox"}
                  id={`${items.metric}`}
                  name={`picked`}
                  checked={items.selected}
                  onChange={(e) => changeKIMCheck(e, items._id)}
                  value={items.metric}
                />

                <label
                  htmlFor={items.metric}
                  className="flex w-full leading-[19px] text-sm"
                >
                  {/* {items.metric.length > 22 ? (
                    <span
                      className={`${
                        items.formula.length > 0 ? "text-purple" : ""
                      }`}
                    >
                      {items.metric.substring(0, 20)}...
                    </span>
                  ) : ( */}
                  <span
                    className={`${
                      items.formula.length > 0
                        ? "text-purple trim-text"
                        : "trim-text"
                    }`}
                  >
                    {items.metric}
                  </span>
                  {/* )} */}
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
                    <div className="kim-warn-id-for-tooltip">{dangerIcon}</div>
                  )}
              </div>
            );
          })}
    </>
  );
};

export default Formula;
