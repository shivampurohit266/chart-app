import Layout from "@/components/Layout";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataCollectionTabs from "@/components/DataCollectionTabs";
import PieChartWithNeedle from "@/components/Dashboard/PieChartWithNeedle";
import {
  downloadSvg,
  filterSvg,
  maximizeSvg,
  subthermes,
  thermes,
} from "@/utils/UtilsSvg";
// import { authToken } from "@/utils/Api";
import education from "../images/education.png";
import zoom from "../images/zoom.png";
import Details from "@/components/Dashboard/Details";
import Filter from "@/components/Dashboard/Filter";
import PieChartDash from "@/components/Dashboard/PieChartDash";
import StackedBarChart from "@/components/Dashboard/StackedBarChart";
import CombineChart from "@/components/Dashboard/CombineChart";
import TreeMapChart from "@/components/Dashboard/TreeMapChart";
import BooleanChart from "@/components/Dashboard/BooleanChart";
import WelcomeMsg from "@/components/WelcomeMsg";
import { getData } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import { logOut } from "@/utils/Auth";
import Head from "next/head";

const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  const { push } = useRouter();
  const Toast = useContext(ToastContext);
  const [showDetail, setShowDetail] = useState(false);
  const [chartType, setChartType] = useState("");
  const [chartId, setChartId] = useState("");
  const [filterData, setFilterData] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);
  const [pieChartWithNeedle, setPieChartWithNeedle] = useState<any>([]);
  const [pieChartDash, setPieChartDash] = useState<any>([]);
  const [stackedBarChart, setStackedBarChart] = useState<any>([]);
  const [combineChart, setCombineChart] = useState<any>([]);
  const [treeMapChart, setTreeMapChart] = useState<any>([]);
  const [booleanChart, setBooleanChart] = useState<any>([]);

  useEffect(() => {
    getPieChartWithNeedle();
    getPieChartDash();
    getStackedBarChart();
    getCombineChart();
    getTreeMapChart();
    getBooleanChart();
  }, []);

  const getPieChartWithNeedle = async () => {
    await getData("/company/pieChartWithNeedle/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setPieChartWithNeedle(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const getPieChartDash = async () => {
    await getData("/company/twoLevelPieChart/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setPieChartDash(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const getCombineChart = async () => {
    await getData("/company/composedResponsiveContainer/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setCombineChart(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const getStackedBarChart = async () => {
    await getData("/company/stackedBarChart/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setStackedBarChart(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const getTreeMapChart = async () => {
    await getData("/company/simpleTreeMap/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setTreeMapChart(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const getBooleanChart = async () => {
    await getData("/company/booleanChart/dashboard/data", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const charts = resp?.data?.data;
          // if (charts.length > 0) {
          //   setShowWelcomeMsg(false);
          // }
          setBooleanChart(charts);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  if (!token) {
    push("/");
  }

  const handleClose = (props: any) => {
    setShowDetail(!showDetail);
    setChartType(props?.type);
    setChartId(props?.id);
  };

  const handleFilter = () => {
    setFilterData(!filterData);
  };
  // useEffect(() => {
  //   return () => {
  //     setWelcomeMsg(!welcomeMsg)
  //   };
  // })

  return (
    <>
      <div className={!showWelcomeMsg ? "hidden" : ""}>
        <Layout>
          <WelcomeMsg />
        </Layout>
      </div>
      <>
        <div className={showWelcomeMsg ? "hidden" : ""}>
          <Layout>
            <div className=" ml-[auto] w-[calc(100%-240px)]  max-h-[calc(100vh-48px)] text-white bg-primaryBlack fixed right-0 overflow-y-auto h-full dashboard">
              <div className="left-0 z-20 w-full h-12 bg-primaryBlack dark:bg-gray-900 ">
                <div className="flex items-center justify-end p-2 mr-8">
                  <div className="flex md:order-2">
                    <button
                      onClick={handleFilter}
                      className="px-2 py-2 mr-4 bg-gray"
                    >
                      {filterSvg}
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-between px-4 py-2.5 mr-3 text-sm font-medium text-center text-[#fff] rounded-sm bg-purple hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Download
                      <span className="pl-2.5"> {downloadSvg}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 mb-6 overflow-hidden xl:justify-center place-items-center graph-area">
                {pieChartWithNeedle?.length > 0 &&
                  pieChartWithNeedle?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-4 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "Pie Chart With Needle",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="h-48 xl:mt-4">
                          {pieChartWithNeedle?.length && (
                            <PieChartWithNeedle
                              pieChartWithNeedle={data}
                              setShowWelcomeMsg={setShowWelcomeMsg}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}

                {pieChartDash?.length > 0 &&
                  pieChartDash?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-4 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "Two Level Pie Chart",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="h-48 xl:mt-4">
                          <PieChartDash
                            pieChartDash={data}
                            setShowWelcomeMsg={setShowWelcomeMsg}
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}
                {stackedBarChart?.length > 0 &&
                  stackedBarChart?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-1.5 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "Stacked Bar Chart",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="h-48 xl:mt-4">
                          <StackedBarChart
                            stackedBarChart={data}
                            setShowWelcomeMsg={setShowWelcomeMsg}
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}
                {combineChart?.length > 0 &&
                  combineChart?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-1.5 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          {/* <button className="pr-1.5" onClick={()=>handleClose("Composed Responsive Container")}>{maximizeSvg}</button> */}
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "Composed Responsive Container",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="h-48 xl:mt-4">
                          <CombineChart
                            combineChart={data}
                            setShowWelcomeMsg={setShowWelcomeMsg}
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}
                {treeMapChart?.length > 0 &&
                  treeMapChart?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-1.5 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "Simple tree map",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="h-48 xl:mt-4">
                          <TreeMapChart
                            treeMapChart={data}
                            setShowWelcomeMsg={setShowWelcomeMsg}
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}
                {booleanChart?.length > 0 &&
                  booleanChart?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[30%] p-4 bg-secondaryBlack"
                      >
                        <div className="flex items-center justify-between !bg-transparent">
                          <h2 className="font-bold text-bold">
                            {data?.chart?.chartLabel}
                          </h2>
                          <button
                            className="pr-1.5"
                            onClick={() =>
                              handleClose({
                                type: "boolean Chart",
                                id: index,
                              })
                            }
                          >
                            <div className="black-svg">{maximizeSvg}</div>
                          </button>
                        </div>
                        <div className="flex items-center justify-center h-48 xl:mt-4">
                          <BooleanChart
                            booleanChart={data}
                            setShowWelcomeMsg={setShowWelcomeMsg}
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-3 ml-2 xl:mt-11 black-svg ">
                          {thermes}
                          {subthermes}
                          <Image src={education} alt="" />
                          <Image src={zoom} alt="" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Layout>
        </div>
        {showDetail && (
          <Details
            chartType={chartType}
            showDetail={showDetail}
            chartId={chartId}
            handleClose={handleClose}
            pieChartWithNeedle={pieChartWithNeedle}
            pieChartDash={pieChartDash}
            treeMapChart={treeMapChart}
            stackedBarChart={stackedBarChart}
            combineChart={combineChart}
            booleanChart={booleanChart}
            setShowWelcomeMsg={setShowWelcomeMsg}
          />
        )}
        {filterData && (
          <Filter filterData={filterData} handleFilter={handleFilter} />
        )}
      </>
    </>
  );
};

export default Dashboard;
