/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CreateFormula from "./CreateFormula";
import ThemeDropDown from "./ThemeDropDown";
import ExistingFormula from "./ExistingFormula";
import FormulaKIM from "./FormulaKIM";
import FormulaConstant from "./FormulaConstant";
import FormulaVariable from "./FormulaVariable";
import Button from "./Button";
import SubThemeDropDown from "./SubThemeDropDown";
import { ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import { getData } from "@/utils/Api";
import CustomizeModal from "./CustomizeModal";

const FormulaBuilder = (props: any) => {
  const token = localStorage.getItem("authToken");
  const [selectedTheme, setSelectedTheme] = useState<any>("All Themes");
  const [textInput, setTextInput] = useState<String[]>([]);
  const [selectedSubTheme, setSelectedSubTheme] =
    useState<any>("Select Sub Theme");
  const [companyKIMs, setCompanyKIMs] = useState<any[]>([]);
  const [editFormula, setEditFormula] = useState<boolean>(false);
  const [selectedVariable, setSelectedVariable] = useState<any>("");
  const [selectedConstant, setSelectedConstant] = useState<any>("");
  const [selectedKIMData, setSelectedKIMData] = useState<any>([]);
  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [showConstant, setShowConstant] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [triggerSaveFunction, setTriggerSaveFuntion] = useState<boolean>(false);
  const [triggerDiscardFunction, setTriggerDiscardFunction] =
    useState<boolean>(false);

  useEffect(() => {
    getKIMSuggestion();
    getCompanyThemes();
  }, [selectedTheme, selectedSubTheme]);

  useEffect(() => {
    const kimData = companyKIMs.filter((e) => e.selected);
    setSelectedKIMData(kimData && kimData[0]);
  }, [companyKIMs]);

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
              selected: selectedKIMData?._id === data?._id ? true : false,
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
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handlePrevStep = () => {
    if (editFormula) {
      setShowWarningModal(true);
    } else {
      props.setStep(4);
    }
  };
  const handleNextStep = () => {
    if (editFormula) {
      setShowWarningModal(true);
    } else {
      props.setStep(6);
      if (props?.stepDefault < 6) {
        props?.setStepDefault(6);
      }
    }
  };
  const handleModalSaveButton = () => {
    setTriggerSaveFuntion(true);
    setShowWarningModal(false);
  };
  const handleModalDiscardButton = () => {
    setTriggerDiscardFunction(true);
    setShowWarningModal(false);
  };
  const handleCloseModal = () => {
    setShowWarningModal(false);
  };
  const SubThemeWarningModal = (props: any) => {
    return (
      <>
        <h1 className="mb-3">Do you want to discard the changes</h1>
        <div className="flex justify-end gap-4 form-group">
          <Button
            type={"button"}
            classProperty={"bg-[#414141]"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Discard"}
            changeStep={() => {
              handleModalDiscardButton();
            }}
          />
          <Button
            type={"button"}
            classProperty={"bg-purple"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Save"}
            changeStep={() => handleModalSaveButton()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <p className="mb-4 text-xl font-medium">
          Formula Builder - No one size fits all: Customize Your Key Impact
          Metric Logic for meaningful data
        </p>
        <div className="flex bg-[#141A23] p-2 gap-2.5 h-[68vh] step-five grow">
          <div className="themes w-[25%] flex flex-col">
            <div className="mb-2 bg-darkGray h-max">
              <ThemeDropDown
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                setSelectedSubTheme={setSelectedSubTheme}
                selectHeight={"h-10"}
              />
              <SubThemeDropDown
                selectedTheme={selectedTheme}
                selectedSubTheme={selectedSubTheme}
                setSelectedSubTheme={setSelectedSubTheme}
                selectHeight={"h-10"}
              />
            </div>

            <div className="w-full h-full overflow-y-auto bg-darkGray grow">
              <FormulaKIM
                companyKIMs={companyKIMs}
                setCompanyKIMs={setCompanyKIMs}
                setSelectedKIMData={setSelectedKIMData}
              />
            </div>
          </div>
          <div className="variable-constant w-[25%] gap-2 flex flex-col">
            <div
              className={`relative bg-darkGray ${
                !showConstant ? "h-[57vh]" : "h-[7vh]"
              }`}
            >
              {!false && (
                <FormulaVariable
                  textInput={textInput}
                  setTextInput={setTextInput}
                  selectedKIMData={selectedKIMData}
                  companyKIMs={companyKIMs}
                  editFormula={editFormula}
                  selectedVariable={selectedVariable}
                  setSelectedVariable={setSelectedVariable}
                  showConstant={showConstant}
                  setShowConstant={setShowConstant}
                />
              )}
            </div>
            <div
              className={`relative bg-darkGray ${
                showConstant ? "h-[57vh]" : "h-[7vh]"
              }`}
            >
              {true && (
                <FormulaConstant
                  textInput={textInput}
                  setTextInput={setTextInput}
                  selectedKIMData={selectedKIMData}
                  companyKIMs={companyKIMs}
                  editFormula={editFormula}
                  setEditFormula={setEditFormula}
                  selectedConstant={selectedConstant}
                  setSelectedConstant={setSelectedConstant}
                  showConstant={showConstant}
                  setShowConstant={setShowConstant}
                />
              )}
            </div>
          </div>
          <div className="formula-builder w-[50%]">
            <ExistingFormula selectedKIMData={selectedKIMData} />
            <CreateFormula
              textInput={textInput}
              setTextInput={setTextInput}
              companyKIMs={companyKIMs}
              getKIMSuggestion={getKIMSuggestion}
              editFormula={editFormula}
              setEditFormula={setEditFormula}
              setSelectedVariable={setSelectedVariable}
              setSelectedConstant={setSelectedConstant}
              selectedKIMData={selectedKIMData}
              setSelectedKIMData={setSelectedKIMData}
              setCompanyKIMs={setCompanyKIMs}
              triggerSaveFunction={triggerSaveFunction}
              setTriggerSaveFuntion={setTriggerSaveFuntion}
              triggerDiscardFunction={triggerDiscardFunction}
              setTriggerDiscardFunction={setTriggerDiscardFunction}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6 form-group">
          <Button
            type={"reset"}
            classProperty={"bg-charcoal "}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Previous"}
            changeStep={handlePrevStep}
            value={"previous"}
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
      {showWarningModal && (
        <CustomizeModal header="Warning" closeModal={handleCloseModal}>
          <SubThemeWarningModal />
        </CustomizeModal>
      )}
    </>
  );
};

export default FormulaBuilder;
