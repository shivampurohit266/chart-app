import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { getData } from "@/utils/Api";
import { alpha, plusIconSvg, searchIcon, closeIconSvg } from "@/utils/UtilsSvg";
import { ToastType } from "@/utils/Constant";
import ToastContext from "@/ToastContext";
import Button from "./Button";
import Modal from "./Modal/Modal";

const FormulaConstant = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [formulaConstant, setFormulaConstant] = useState<any>([]);
  const [constantModal, setConstantModal] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchConstant, setSearchConstant] = useState<any>("");
  const [sort, setSort] = useState(false);

  useEffect(() => {
    getFormulaConstant();
  }, []);
  const getFormulaConstant = async () => {
    await getData("/company/get/constants", token)
      .then(function (resp) {
        const constantData = resp?.data?.data;
        if (constantData?.constants) {
          setFormulaConstant(constantData?.constants);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleConstantSelection = (constant: any) => {
    if (constant === props?.selectedConstant) {
      props?.setSelectedConstant("");
    } else {
      props?.setSelectedConstant(constant);
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

  const handleConstantModal = () => {
    setConstantModal(!constantModal);
    getFormulaConstant();
  };

  const handleAlphaButton = () => {
    if (!sort) {
      formulaConstant?.sort((a: any, b: any) =>
        a.nameOfTheVariable > b.nameOfTheVariable
          ? 1
          : a.nameOfTheConstant < b.nameOfTheConstant
          ? -1
          : 0
      );
    } else {
      formulaConstant?.sort((a: any, b: any) =>
        a.nameOfTheConstant < b.nameOfTheConstant
          ? 1
          : a.nameOfTheConstant > b.nameOfTheConstant
          ? -1
          : 0
      );
    }
    setSort(!sort);
  };
  return (
    <>
      <div className="h-full">
        <div className="bg-darkGray">
          <SearchBar
            searchFor={"Constant"}
            getData={getFormulaConstant}
            setSearchData={setSearchConstant}
            selectedItem={props?.selectedConstant}
            setSelectedItem={props?.setSelectedConstant}
            showConstant={props?.showConstant}
            setShowConstant={props?.setShowConstant}
            handleAlphaButton={handleAlphaButton}
          />
        </div>

        <div className="h-[calc(100%-52px)] overflow-y-auto">
          {formulaConstant &&
            formulaConstant.length > 0 &&
            formulaConstant
              ?.filter((kim: any) => {
                if (searchConstant) {
                  return kim?.nameOfTheConstant
                    ?.toLowerCase()
                    .includes(searchConstant?.toLowerCase());
                } else {
                  return kim;
                }
              })
              .map((items: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      props.selectedKIMData?.dataTypeOfMatric === "boolean" ||
                      props.selectedKIMData?.dataTypeOfMatric === "list"
                        ? null
                        : handleConstantSelection(items);
                    }}
                    className={`border-b-[#868686] px-4 py-2 text-sm border-b  capitalize flex justify-between gap-3  ${
                      props?.selectedConstant?._id === items?._id &&
                      "bg-purple/20"
                    } ${
                      props.selectedKIMData?.dataTypeOfMatric === "boolean" ||
                      props.selectedKIMData?.dataTypeOfMatric === "list"
                        ? "pointer-none"
                        : "cursor-pointer"
                    }
                    }`}
                  >
                    {items?.nameOfTheConstant}
                    {props?.selectedConstant?.nameOfTheConstant ===
                    items?.nameOfTheConstant ? (
                      <Button
                        type={"submit"}
                        classProperty={
                          "bg-purple !px-2 !py-1 items-center max-w-7"
                        }
                        marginProperty={"mb-0"}
                        imageClass="ml-[1px]"
                        text={""}
                        changeStep={() =>
                          handleFormSymbol(
                            props?.selectedConstant?.nameOfTheConstant
                          )
                        }
                      />
                    ) : null}
                  </div>
                );
              })}
        </div>
      </div>
      {constantModal && (
        <Modal
          ModalHeading={"Add Constant"}
          paraClass={"hidden"}
          modalWidth={"max-w-[250px] !w-full"}
          labelFirst={"Name of the constant"}
          labelSecond={"Unit of the constant"}
          labelThird={"Value of the Constant"}
          closeVariableModal={handleConstantModal}
          modalFor={"constants"}
        />
      )}
    </>
  );
};

export default FormulaConstant;
