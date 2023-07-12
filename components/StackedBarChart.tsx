import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
// import editIcon from "../images/edit.png";
import deleteIcon from "../images/delete.png";
// import settingIcon from "../images/setting-icon.png";
import closeIcon from "../images/cross.png";
import { ChartInterface } from "@/utils/Interface/InterfaceChart";
import plusIcon from "../images/plus-icon.png";
import piChart from "../images/stackedChart.png";
import pieChartWithNeedle from "../images/pieChartWithNeedle.png";
import barChart from "../images/bar-chart.png";
import {
  crossSvg,
  deleteIconSvg,
  editIcon,
  settingIcon,
} from "@/utils/UtilsSvg";
import { deleteData, getData, postDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import Modal from "./Modal/Modal";
import CustomizeModal from "./CustomizeModal";
import CustomizeModalBody from "./CustomizeModalBody";

const StackedBarChart = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [chartDataArr, setChartDataArr] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [chartSettingModal, setChartSettingModal] = useState(false);
  const [chartId, setChartId] = useState("");

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    await getData("/company/stackedBar/chart", token)
      .then(function (resp) {
        const chartData = resp?.data;
        console.log(chartData);

        if (chartData) {
          if (chartData?.data && chartData?.data?.length) {
            setChartDataArr(chartData?.data);
          } else {
            setChartDataArr([]);
          }
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const addData = async () => {
    await postDataWithToken(
      "/company/stackedBar/chart",
      { chartType: "Stacked Bar Chart", chartLabel: "Bar Chart" },
      token
    )
      .then(function (resp) {
        const chartData = resp?.data;
        console.log(chartData);

        if (chartData) {
          Toast.showToast(ToastType.SUCCESS, chartData?.message);
          props?.handleEditChart(
            chartData?.data?.stackedBarChartId,
            chartData?.data?.chartType,
            chartData?.data,
            getChartData
          );
          getChartData();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
    setChartId("");
  };

  const handleChartModal = () => {
    setChartSettingModal(!chartSettingModal);
    getChartData();
  };

  const deleteChart = async () => {
    console.log(chartId);

    await deleteData(`/company/stackedBar/chart/${chartId}`, token)
      .then(function (resp) {
        const chartData = resp?.data;

        if (chartData) {
          Toast.showToast(ToastType.SUCCESS, chartData?.message);
          props?.setSelectEditChart("");
          getChartData();
          setDeleteModal(false);
          setChartId("");
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const deleteKIM = async (chartId: string, kimId: string) => {
    await deleteData(
      `/company/stackedBar/chart/kim/${chartId}?kimId=${kimId}`,
      token
    )
      .then(function (resp) {
        const chartData = resp?.data;
        console.log(chartData);

        if (chartData) {
          Toast.showToast(ToastType.SUCCESS, chartData?.message);
          getChartData();
          setDeleteModal(false);
          setChartId("");
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  return (
    <>
      <div className="flex items-stretch justify-start -mx-2">
        {chartDataArr &&
          chartDataArr.length > 0 &&
          chartDataArr.map((chart: any, index: any) => {
            return (
              <div
                key={index}
                className={`m-2 chart-tile border hover:border-purple p-2 my-2 relative min-h-[208px] grow self-stretch max-w-[33.33%] ${
                  props?.selectEditChart?.id === chart?.stackedBarChartId
                    ? "border-purple"
                    : "border-[#868686]"
                }`}
              >
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                  <Image
                    className="h-[50%] object-contain w-full mx-6 chart-img"
                    src={piChart}
                    alt=""
                    style={{ filter: "brightness(0.3)" }}
                  />
                </div>
                <div className="relative z-10">
                  <div className="relative flex items-center justify-between">
                    <h6 className="text-xs ">{chart?.chartLabel}</h6>
                    <div className="flex h-[auto] p-2 align-center ml-3">
                      <div
                        onClick={() => {
                          console.log(
                            props?.selectEditChart?.chart?.kims?.length,
                            "props?.selectEditChart?.chart?.kims?.StackBar"
                          );
                          props?.selectEditChart &&
                          !props?.selectEditChart?.chart?.kims?.length
                            ? props?.showAddKimError()
                            : props?.handleEditChart(
                                chart?.stackedBarChartId,
                                chart?.chartType,
                                chart,
                                getChartData
                              );
                        }}
                        className={`flex items-center p-1 mx-1 transition cursor-pointer chart-icons white-svg hover:bg-purple ${
                          props?.selectEditChart?.id ===
                            chart?.stackedBarChartId && "bg-purple"
                        }`}
                      >
                        {editIcon}
                      </div>

                      <div
                        onClick={() => {
                          setChartId(chart?.stackedBarChartId);
                          setDeleteModal(true);
                        }}
                        className="flex items-center p-1 mx-1 transition cursor-pointer chart-icons white-svg hover:bg-purple"
                      >
                        {deleteIconSvg}
                      </div>

                      <div
                        onClick={() => {
                          handleChartModal();
                          setChartId(chart?.stackedBarChartId);
                        }}
                        className="flex items-center p-1 mx-1 transition cursor-pointer chart-icons white-svg hover:bg-purple"
                      >
                        {settingIcon}
                      </div>
                    </div>
                  </div>
                  {chart?.kims &&
                    chart?.kims.length > 0 &&
                    chart?.kims?.map((kimData: any, index: any) => {
                      return (
                        <div
                          key={index}
                          onMouseEnter={() =>
                            props?.setToolTipMatricNameObj(kimData?.metric)
                          }
                          className="flex items-center justify-between w-full px-4 py-2 my-3 text-sm rounded-full bg-darkGray kim-name-for-tooltip"
                        >
                          {/* <p className="text-sm">
                          {kimData.metric.substring(0, 20)}...
                        </p> */}

                          <p className="text-sm trim-text">{kimData?.metric}</p>

                          <span
                            onClick={() =>
                              props?.selectEditChart?.id ===
                              chart?.stackedBarChartId
                                ? deleteKIM(
                                    chart?.stackedBarChartId,
                                    kimData?.kimId
                                  )
                                : {}
                            }
                            className="ml-1 cursor-pointer h-max"
                          >
                            {crossSvg}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        {chartDataArr?.length < 3 && (
          <div className="flex items-center justify-center w-1/4">
            <div
              onClick={() => {
                props?.selectEditChart &&
                !props?.selectEditChart?.chart?.kims?.length
                  ? props?.showAddKimError()
                  : addData();
              }}
              className="flex items-center justify-center w-12 h-12 my-3 cursor-pointer bg-charcoal"
            >
              <Image src={plusIcon} alt="" />
            </div>
          </div>
        )}
      </div>
      {deleteModal && (
        <Modal
          ModalHeading={"Warning"}
          headingImageType={"warning"}
          paraClass={"show my-7"}
          modalWidth={"max-w-[646px]"}
          formClass={"hidden"}
          showSeparateBtn={"show"}
          btnSecondText={"Yes, Delete"}
          closeVariableModal={handleCloseDeleteModal}
          onYes={deleteChart}
        >
          Are you sure want to delete this Chart?
        </Modal>
      )}
      {chartSettingModal && (
        <CustomizeModal closeModal={handleChartModal}>
          <CustomizeModalBody
            chartDataArr={chartDataArr}
            chartId={chartId}
            closeModal={handleChartModal}
          />
        </CustomizeModal>
      )}
    </>
  );
};

export default StackedBarChart;
