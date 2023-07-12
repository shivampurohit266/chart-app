/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { getData } from "@/utils/Api";
import { alpha, plusIconSvg, searchIcon, closeIconSvg } from "@/utils/UtilsSvg";
import { ToastType } from "@/utils/Constant";
import ToastContext from "@/ToastContext";
import Button from "./Button";
const FormulaVariable = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [formulaVariable, setFormulaVariable] = useState<any>([]);
  const [filteredFormulaVariable, setFilteredFormulaVariable] = useState<any>(
    []
  );
  const [searchVariable, setSearchVariable] = useState<any>("");
  const [sort, setSort] = useState(false);

  useEffect(() => {
    getFormulaVariable();
  }, []);

  const getFormulaVariable = async () => {
    await getData("/company/get/variables", token)
      .then(function (resp) {
        const variablesData = resp?.data?.data;
        if (variablesData?.variables) {
          setFormulaVariable(variablesData?.variables);
          setFilteredFormulaVariable(variablesData?.variables);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleSelectedVariable = (variable: any) => {
    if (variable === props?.selectedVariable) {
      props?.setSelectedVariable("");
    } else {
      props?.setSelectedVariable(variable);
    }
  };
  const handleFormSymbol = (symbl: String) => {
    const regex = /([a-zA-Z_.][a-zA-Z0-9_. ]*)(?=\s*(?:[\/*+\-()]|$))/g;
    if (props?.selectedKIMData) {
      if (!props?.textInput[props?.textInput?.length - 1]?.match(regex)) {
        props?.setTextInput([...props?.textInput, symbl]);
      } else {
        Toast.showToast(ToastType.ERROR, "Please add operator");
      }
    } else {
      Toast.showToast(ToastType.ERROR, "Select KIM");
    }
  };

  const handleAlphaButton = () => {
    if (!sort) {
      formulaVariable?.sort((a: any, b: any) =>
        a.nameOfTheVariable > b.nameOfTheVariable
          ? 1
          : a.nameOfTheVariable < b.nameOfTheVariable
          ? -1
          : 0
      );
    } else {
      formulaVariable?.sort((a: any, b: any) =>
        a.nameOfTheVariable < b.nameOfTheVariable
          ? 1
          : a.nameOfTheVariable > b.nameOfTheVariable
          ? -1
          : 0
      );
    }
    setSort(!sort);
  };

  useEffect(() => {
    if (props.selectedKIMData && props.editFormula) {
      const filteredFormula = formulaVariable?.filter(
        (variable: any) =>
          props.selectedKIMData?.dataTypeOfMatric ===
          variable?.dataTypeOfVariable
      );
      setFilteredFormulaVariable(filteredFormula);
    } else {
      setFilteredFormulaVariable(formulaVariable);
    }
  }, [props.selectedKIMData, formulaVariable, props.editFormula]);
  return (
    <>
      <div className="h-full">
        <div className="bg-darkGray">
          <SearchBar
            searchFor="Variable"
            getData={getFormulaVariable}
            setSearchData={setSearchVariable}
            selectedItem={props?.selectedVariable}
            setSelectedItem={props?.setSelectedVariable}
            showConstant={props?.showConstant}
            setShowConstant={props?.setShowConstant}
            handleAlphaButton={handleAlphaButton}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100%-52px)]">
          {filteredFormulaVariable &&
            filteredFormulaVariable.length > 0 &&
            filteredFormulaVariable
              ?.filter((kim: any) => {
                if (searchVariable) {
                  return kim?.nameOfTheVariable
                    ?.toLowerCase()
                    .includes(searchVariable?.toLowerCase());
                } else {
                  return kim;
                }
              })
              .map((items: any, index: number) => {
                return (
                  <div
                    key={`variable${index}`}
                    className={`border-b-[#868686] px-4 py-2 text-sm border-b cursor-pointer capitalize flex justify-between gap-3 ${
                      props?.selectedVariable?._id === items?._id &&
                      "bg-purple/20"
                    }`}
                    onClick={() => handleSelectedVariable(items)}
                  >
                    <i>{items?.nameOfTheVariable}</i>
                    {!props?.editFormula ? null : props?.selectedVariable
                        ?._id === items?._id ? (
                      <Button
                        type={"submit"}
                        classProperty={
                          "bg-purple !px-2 !py-1 items-center w-7 h-max"
                        }
                        marginProperty={"mb-0 items-center"}
                        imageClass="ml-[1px]"
                        text={""}
                        changeStep={() =>
                          handleFormSymbol(
                            props?.selectedVariable?.nameOfTheVariable
                          )
                        }
                      />
                    ) : null}
                  </div>
                );
              })}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default FormulaVariable;
