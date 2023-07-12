/* eslint-disable react-hooks/exhaustive-deps */
import { checkIcon, closeIconSvg, crossSvg } from "@/utils/UtilsSvg";
import closeIcon from "../../images/cross.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export const dashboardGstGraphValue = [
  {
    id: 1,
    month: "Jan-Mar",
    gst1: "true",
  },
  {
    id: 2,
    month: "Apr-Jun",
    gst1: "false",
  },
  {
    id: 3,
    month: "Jul-Sep",
    gst1: "",
  },
  {
    id: 4,
    month: "Oct-Dec",
    gst1: "true",
  },
];

const BooleanChart = (props: any) => {
  const kimName = props?.booleanChart?.kims[0]?.metric;
  const checkVal = props?.booleanChart?.kims[0]?.value.split(",");
  const data = props?.booleanChart?.kims[0]?.data;
  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    if (props.detailPage && data) {
      setChartData(data);
    } else {
      const trimmedData = data?.slice(0, 6);
      setChartData(trimmedData);
    }
  }, [props.detailPage, data]);
  return (
    <div className="grid grid-cols-gstGrid grid-rows-3 gap-[2px] boolean-chart">
      <div className="gst-grid relative grid grid-cols-1 row-start-1 row-end-3 grid-row-3 after:h-[105%] after:w-px after:bg-white after:absolute after:right-0 after:top-0">
        <div className="row-start-1 row-end-2 py-2 !text-[#A300AD] text-sm">
          {kimName?.substring(0, 5)}...
        </div>
        {/* <div className="row-start-2 row-end-3 px-1 py-2 !text-[#A300AD] text-sm">
          KIM 2
        </div> */}
      </div>

      <div className="grid row-start-1 row-end-4 grid-cols-gstGridHalfMonth grid-row-3">
        {chartData &&
          chartData?.map((value: any) => {
            return (
              <>
                <div className="row-start-1 row-end-2 px-2 py-2 ">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      value.value == checkVal[0].trim()
                        ? "!bg-purple"
                        : value.value == checkVal[1].trim()
                        ? "!bg-[red]"
                        : ""
                    }`}
                  >
                    {value.value == checkVal[0].trim()
                      ? checkIcon
                      : value.value == checkVal[1].trim()
                      ? closeIconSvg
                      : ""}
                  </div>
                </div>
                {/* <div className="row-start-2 row-end-3 px-2 py-2">
                <div
                  className={`h-6 w-6 rounded-full flex justify-center items-center ${
                    value.gst2 === true ? "!bg-purple" :(value.gst2 === false ? "!bg-[red]":"")
                  }`}
                >
                  {value.gst2 === true
                    ? checkIcon :(value.gst2 === false ? closeIconSvg : "")}
                </div>
              </div> */}
                <p className="gst-grid !text-[#8E4DFF] relative row-start-3 row-end-4 px-1 py-2 before:absolute before:top-[2px] before:-left-[2px] before:bg-white before:w-full before:h-px ">
                  {value.name}
                </p>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default BooleanChart;
