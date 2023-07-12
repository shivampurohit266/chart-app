import React from "react";
import { minimizeSvg, subthermes, thermes } from "@/utils/UtilsSvg";
import PieChartWithNeedle from "./PieChartWithNeedle";
import education from "../../images/education.png";
import zoom from "../../images/zoom.png";
import Image from "next/image";
import PieChartDash from "./PieChartDash";
import StackedBarChart from "./StackedBarChart";
import CombineChart from "./CombineChart";
import TreeMapChart from "./TreeMapChart";
import BooleanChart from "./BooleanChart";

const Details = (props: any) => {
  let chartName = "";
  let month = "";
  let dataPeriod = "";
  if (
    props.chartType === "Pie Chart With Needle" &&
    props?.pieChartWithNeedle?.length
  ) {
    chartName = props?.pieChartWithNeedle[props?.chartId]?.chart?.chartLabel;
    dataPeriod =
      props?.pieChartWithNeedle[props?.chartId]?.kims[0]?.data?.length;
    const myVal = props?.pieChartWithNeedle[props?.chartId]?.kims[0]?.data.map(
      (data: any) => {
        if (data?.value) {
          month = data?.name;
        }
        return data.value;
      }
    );
  }
  if (
    props.chartType === "Two Level Pie Chart" &&
    props?.pieChartDash?.length
  ) {
    chartName = props?.pieChartDash[props?.chartId]?.chart?.chartLabel;
    dataPeriod = props?.pieChartDash[props?.chartId]?.kims[0]?.data?.length;
    const myVal = props?.pieChartDash[props?.chartId]?.kims[0]?.data.map(
      (data: any) => {
        if (data?.value) {
          month = data?.name;
        }
        return data.value;
      }
    );
  }
  if (
    props.chartType === "Stacked Bar Chart" &&
    props?.stackedBarChart?.length
  ) {
    chartName = props?.stackedBarChart[props?.chartId]?.chart?.chartLabel;
    dataPeriod = props?.stackedBarChart[props?.chartId]?.kims[0]?.data?.length;
  }
  if (
    props.chartType === "Composed Responsive Container" &&
    props?.combineChart?.length
  ) {
    chartName = props?.combineChart[props?.chartId]?.chart?.chartLabel;
    dataPeriod = props?.combineChart[props?.chartId]?.kims[0]?.data?.length;
  }
  if (props.chartType === "Simple tree map" && props?.treeMapChart?.length) {
    chartName = props?.treeMapChart[props?.chartId]?.chart?.chartLabel;
    dataPeriod = props?.treeMapChart[props?.chartId]?.kims[0]?.data?.length;
    const myVal = props?.treeMapChart[props?.chartId]?.kims[0]?.data.map(
      (data: any) => {
        if (data?.value) {
          month = data?.name;
        }
        return data.value;
      }
    );
  }
  if (props.chartType === "boolean Chart" && props?.booleanChart?.length) {
    chartName = props?.booleanChart[props?.chartId]?.chart?.chartLabel;
    dataPeriod = props?.booleanChart[props?.chartId]?.kims[0]?.data?.length;
  }

  return (
    <div
      data-te-modal-init
      className="modal fixed left-0 top-0 z-[100] h-full w-full outline-none text-white bg-primaryBlack/80 flex items-center content-center graph-area"
    >
      <div
        data-te-modal-dialog-ref
        className={`pointer-events-none relative translate-[-50px] transition-all duration-300 ease-in-out mx-auto w-full pt-10 max-w-[650px]`}
      >
        <div className="relative flex flex-col w-full p-4 pointer-events-auto bg-darkGray">
          {/* <div className="flex justify-center ml-[auto] w-[calc(100%-240px)] max-h-[calc(100vh-48px)] text-white bg-primaryBlack fixed right-0 overflow-y-auto h-full"> */}
          <div className="px-3 py-3 bg-secondaryBlack h-4/5">
            <div className="flex items-center justify-between ">
              <h2 className="pt-2 ml-3 font-bold text-bold">{chartName}</h2>
              <button onClick={props.handleClose} className="pr-1.5 black-svg">
                {minimizeSvg}
              </button>
            </div>
            <div className="flex items-center justify-center h-56">
              {props.chartType === "Pie Chart With Needle" &&
                props?.pieChartWithNeedle?.length && (
                  <PieChartWithNeedle
                    pieChartWithNeedle={
                      props?.pieChartWithNeedle[props?.chartId]
                    }
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                  />
                )}
              {props.chartType === "Two Level Pie Chart" &&
                props?.pieChartDash?.length && (
                  <PieChartDash
                    pieChartDash={props?.pieChartDash[props?.chartId]}
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                  />
                )}
              {props.chartType === "Stacked Bar Chart" &&
                props?.stackedBarChart?.length && (
                  <StackedBarChart
                    stackedBarChart={props?.stackedBarChart[props?.chartId]}
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                    expandMode={true}
                  />
                )}
              {props.chartType === "Composed Responsive Container" &&
                props?.combineChart?.length && (
                  <CombineChart
                    combineChart={props?.combineChart[props?.chartId]}
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                    expandMode={true}
                  />
                )}
              {props.chartType === "Simple tree map" &&
                props?.treeMapChart?.length && (
                  <TreeMapChart
                    treeMapChart={props?.treeMapChart[props?.chartId]}
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                  />
                )}
              {props.chartType === "boolean Chart" &&
                props?.booleanChart?.length && (
                  <BooleanChart
                    detailPage={true}
                    booleanChart={props?.booleanChart[props?.chartId]}
                    setShowWelcomeMsg={props?.setShowWelcomeMsg}
                  />
                )}
            </div>

            {(props.chartType === "Pie Chart With Needle" ||
              props.chartType === "Two Level Pie Chart" ||
              props.chartType === "Simple tree map") && (
              <div className="ml-2 text-l">
                As on
                <span className="ml-2 text-2xl font-light">{month}</span>
                {/* <button className="px-2 py-2 ml-2 text-xs bg-darkGray1">
                  this month{" "}
                </button> */}
              </div>
            )}
            <div className="flex flex-wrap justify-between h-14 black-svg">
              <div className="flex justify-between w-1/2 px-2 text-sm font-thin align-center">
                Theme 1 {thermes}
              </div>
              <div className="flex justify-between w-1/2 px-2 text-sm align-center ">
                Reduced Inequality <Image src={zoom} alt="" />
              </div>
              <div className="flex justify-between w-1/2 px-2 text-sm align-center ">
                Theme 2 {subthermes}
              </div>
              <div className="flex justify-between w-1/2 px-2 text-sm align-center ">
                Quality Education <Image src={education} alt="" />
              </div>
            </div>
            {dataPeriod && (
              <div className="ml-2 text-xs">
                Data period{" "}
                <span className="font-semibold">
                  {dataPeriod <= "4" ? "QUATERLY" : "MONTHLY"}
                </span>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
