/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FormulaKIM from "./FormulaKIM";
import PieChartWithNeedle from "./PieChartWithNeedle";
import { searchIcon } from "@/utils/UtilsSvg";
import Button from "./Button";
import ThemeDropDown from "./ThemeDropDown";
import SubThemeDropDown from "./SubThemeDropDown";
import { getData } from "@/utils/Api";
import { ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import PieChart from "./PieChart";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import StackedBarChart from "./StackedBarChart";
import ComposedResponsiveChart from "./ComposedResponsiveChart";
import SimpleTreeMapChart from "./SimpleTreeMapChart";
import BooleanChart from "./BooleanChart";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import { useRouter } from "next/router";

const RelatedChart = (props: any) => {
  const router = useRouter();
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [selectEditChart, setSelectEditChart] = useState<any>("");
  const [selectedTheme, setSelectedTheme] = useState<any>("All Themes");
  const [selectedSubTheme, setSelectedSubTheme] =
    useState<any>("Select Sub Theme");
  const [toolTipMatricNameObj, setToolTipMatricNameObj] = useState("");
  const [companyKIMs, setCompanyKIMs] = useState<any[]>([]);
  const [selectedKim, setSelectedKim] = useState<String>();
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    getKIMSuggestion();
    getCompanyThemes();
  }, [selectedTheme, selectedSubTheme]);

  const handleEditChart = (
    id: string,
    type: string,
    chart: any,
    getChartData: any
  ) => {
    const data = {
      id: id,
      type: type,
      chart: chart,
      callBack: getChartData,
    };
    setSelectEditChart(data);
  };

  const showAddKimError = () => {
    Toast.showToast(ToastType.ERROR, "Please add KIM or delete the chart");
  };

  const getKIMSuggestion = async () => {
    await getData(
      `/company/get/kim?themeId=${
        selectedTheme !== "All Themes" ? selectedTheme : ""
      }&subthemeId=${
        selectedSubTheme !== "Select Sub Theme" ? selectedSubTheme : ""
      }`,
      token
    )
      .then(function (resp) {
        if (resp?.data?.data?.kims?.length) {
          const KIMdData = resp?.data?.data?.kims;
          const newKIMdData = KIMdData.map((data: any, idx: Number) => {
            return {
              ...data,
              selected: false,
              labelContent: "checkbox",
              description: "",
              theme: "",
              subtheme: "",
              // metricMultiLocation: false,
              // metricMultiProduct: false,
            };
          });
          setCompanyKIMs(newKIMdData);
        } else {
          setCompanyKIMs([]);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

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

  const handlePrevStep = () => {
    selectEditChart && !selectEditChart?.chart?.kims?.length
      ? showAddKimError()
      : props.setStep(7);
  };
  const handleNextStep = () => {
    selectEditChart && !selectEditChart?.chart?.kims?.length
      ? showAddKimError()
      : router.push("/dashboard");
  };
  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 text-xl font-medium">
        Define your dashboard: Create relevant chart types to visualize Key
        Impact Metrics
      </p>
      <div className="flex bg-[#141A23] p-2 gap-2.5 max-h-[68vh] h-full overflow-y-auto step-five grow">
        <div className="themes max-w-[30%] flex flex-col w-full sticky left-0 top-0">
          <div className="flex w-full mb-2 bg-darkGray h-max">
            <ThemeDropDown
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              setSelectedSubTheme={setSelectedSubTheme}
              selectHeight={"h-12"}
            />
            <SubThemeDropDown
              selectedTheme={selectedTheme}
              selectedSubTheme={selectedSubTheme}
              setSelectedSubTheme={setSelectedSubTheme}
              selectHeight={"h-12"}
            />
          </div>
          <div className="w-full h-full overflow-y-auto bg-darkGray grow">
            <FormulaKIM
              selectEditChart={selectEditChart}
              companyKIMs={companyKIMs}
              setCompanyKIMs={setCompanyKIMs}
              handleEditChart={handleEditChart}
              // setSelectedKim={setSelectedKim}
            />
          </div>
        </div>

        <div className="max-w-[70%] flex flex-col w-full h-full">
          <div className="w-full h-full">
            <div className="relative top-0 right-0 flex items-center justify-center w-full h-12 text-gray-600 grow bg-darkGray border-b border-[#868686] max-h-12 ">
              <input
                className="w-full h-12 px-5 pr-16 ml-4 text-sm bg-transparent focus:outline-none"
                type="search"
                name="search"
                placeholder="Search for chart, metric, ..."
              />
              <button
                type="submit"
                className="absolute top-0 left-0 mr-4 flex h-[inherit] items-center mx-2"
              >
                {searchIcon}
              </button>
            </div>

            <div className="pb-2.5">
              {/* <h4 className="text-[#6F6F6F] font-semibold text-xs pt-6 w-full border-b border-[#868686] pb-2">
                HETEROGENEOUS METRIC CHART
              </h4> */}
              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Gauge Chart
                  </h2>
                  <PieChartWithNeedle
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                  />
                </div>
              </div>
              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Pie Chart
                  </h2>
                  <PieChart
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                    chartType={"COMPOSED RESPONSIVE CONTAINER"}
                    boxHeading={"Emissions"}
                    headingFirst={"Scope 2 emissions (MTCO2E)"}
                    bgChartType={"bar-chart"}
                  />
                </div>
              </div>

              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Bar Chart
                  </h2>
                  <StackedBarChart
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                    chartType={"COMPOSED RESPONSIVE CONTAINER"}
                    boxHeading={"Emissions"}
                    headingFirst={"Scope 2 emissions (MTCO2E)"}
                    bgChartType={"bar-chart"}
                  />
                </div>
              </div>
              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Combined Chart
                  </h2>
                  <ComposedResponsiveChart
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                    chartType={"COMPOSED RESPONSIVE CONTAINER"}
                    boxHeading={"Emissions"}
                    headingFirst={"Scope 2 emissions (MTCO2E)"}
                    bgChartType={"bar-chart"}
                  />
                </div>
              </div>
              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Ratio Chart
                  </h2>
                  <SimpleTreeMapChart
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                    chartType={"COMPOSED RESPONSIVE CONTAINER"}
                    boxHeading={"Emissions"}
                    headingFirst={"Scope 2 emissions (MTCO2E)"}
                    bgChartType={"bar-chart"}
                  />
                </div>
              </div>
              <div className="px-4 mt-3">
                <div>
                  <h2 className="py-1 mb-2 text-base text-center bg-transparent text-white/87 border-b border-[#b3b3b3]">
                    Status Chart
                  </h2>
                  <BooleanChart
                    selectEditChart={selectEditChart}
                    setSelectEditChart={setSelectEditChart}
                    handleEditChart={handleEditChart}
                    showAddKimError={showAddKimError}
                    setToolTipMatricNameObj={setToolTipMatricNameObj}
                    chartType={"COMPOSED RESPONSIVE CONTAINER"}
                    boxHeading={"Emissions"}
                    headingFirst={"Scope 2 emissions (MTCO2E)"}
                    bgChartType={"bar-chart"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 form-group">
        <Button
          type={"reset"}
          classProperty={"bg-charcoal "}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={"Previous"}
          value={"previous"}
          changeStep={handlePrevStep}
        />

        <Button
          type={"submit"}
          classProperty={"bg-purple"}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={"Finish"}
          changeStep={handleNextStep}
        />
      </div>
      <div className="z-[10]">
        <ReactTooltip
          anchorSelect={"#kim-warn-id-for-tooltip"}
          variant="warning"
          place="bottom"
          content="Formula is required for mapping"
        />
      </div>
      <div className="z-[10]">
        <ReactTooltip
          anchorSelect=".kim-name-for-tooltip"
          variant="info"
          place="bottom"
          content={toolTipMatricNameObj}
        />
      </div>
    </div>
  );
};

export default RelatedChart;
