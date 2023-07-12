/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import KeyImpactSearchBar from "./KeyImpactSearchBar";
import MetricRow from "./MetricRow";
import MetricContentTable from "./MetricContentTable";
import Button from "./Button";
import { SubThemeArr, ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { getData, postDataWithToken } from "@/utils/Api";
import { ToastType } from "@/utils/Constant";
import ToastContext from "@/ToastContext";

const KeyImpactMetrics = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<any>("All Themes");
  const [selectedSubTheme, setSelectedSubTheme] =
    useState<any>("Select Sub Theme");
  const [KIMSuggestion, setKIMSuggestion] = useState<any>([]);
  const [KIMSuggestionSearch, setKIMSuggestionSearch] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    getKIMSuggestion();
    getCompanyThemes();
  }, [selectedTheme, selectedSubTheme]);

  useEffect(() => {
    if (KIMSuggestion && KIMSuggestion.length) {
      setKIMSuggestionSearch(KIMSuggestion);
    }
  }, [KIMSuggestion]);
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
              // description: "",
              // theme: "",
              // subtheme: "",
              // metricMultiLocation: false,
              // metricMultiProduct: false,
            };
          });
          setKIMSuggestion(newKIMdData);
        } else {
          setKIMSuggestion([]);
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
          setShowLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handlePrevStep = () => {
    props.setStep(3);
  };
  const handleNextStep = async () => {
    await postDataWithToken("/company/variable/constant", {}, token)
      .then(function (resp) {
        const kimData = resp?.data;
        if (kimData) {
          Toast.showToast(
            ToastType.SUCCESS,
            "Success:Changes to the key impact metric have been saved"
          );
          props.setStep(5);
          if (props?.stepDefault < 5) {
            props?.setStepDefault(5);
          }
          props.getCompanyDetails();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 text-xl font-medium">
        Measurable Key Impact Metrics: Easily Add, Edit, and Delete to Align
        with Your Company&apos;s Impact Framework
      </p>
      <div className="overflow-y-auto inside-content bg-darkGray grow">
        <KeyImpactSearchBar
          getKIMSuggestion={getKIMSuggestion}
          themeArray={themeArray}
          KIMSuggestion={KIMSuggestion}
          KIMSuggestionSearch={KIMSuggestionSearch}
          setKIMSuggestionSearch={setKIMSuggestionSearch}
          setKIMSuggestion={setKIMSuggestion}
          selectedSubTheme={selectedSubTheme}
          selectedTheme={selectedTheme}
          setSelectedSubTheme={setSelectedSubTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <MetricContentTable
          KIMSuggestion={KIMSuggestionSearch}
          setKIMSuggestion={setKIMSuggestion}
          selectedTheme={selectedTheme}
          selectedSubTheme={selectedSubTheme}
        />
      </div>
      <div className="flex justify-end gap-4 mt-10 form-group">
        <Button
          type={"reset"}
          classProperty={"bg-charcoal"}
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
          text={"Next"}
          changeStep={handleNextStep}
        />
      </div>
    </div>
  );
};

export default KeyImpactMetrics;
