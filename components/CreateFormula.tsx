/* eslint-disable react-hooks/exhaustive-deps */
import { SAMD } from "@/utils/UtilsSvg";
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { ToastType } from "@/utils/Constant";
import ToastContext from "@/ToastContext";
import { putDataWithToken } from "@/utils/Api";

const CreateFormula = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [toggle, setToggle] = useState(false);
  const [bracesCount, setBracesCount] = useState(0);

  const handleFormSymbol = (symbl: String) => {
    if (props?.selectedKIMData) {
      props?.setTextInput([...props?.textInput, symbl]);
    } else {
      Toast.showToast(ToastType.ERROR, "Select KIM");
    }
  };
  useEffect(() => {
    if (props.triggerSaveFunction) {
      saveFormula();
      props.setTriggerSaveFuntion(false);
    }
    if (props.triggerDiscardFunction) {
      handleDiscardButton();
      props.setTriggerDiscardFunction(false);
    }
  }, [props.triggerSaveFunction, props.triggerDiscardFunction]);

  const saveFormula = async () => {
    if (
      props?.textInput?.length &&
      props?.selectedKIMData &&
      props?.selectedKIMData?._id
    ) {
      if (!bracesCount) {
        const id = props?.selectedKIMData?.kimId;
        const data = {
          formula: props?.textInput.join(""),
        };

        await putDataWithToken(`/company/kim/${id}`, data, token)
          .then(function (resp) {
            const constantData = resp?.data?.data;
            if (constantData) {
              Toast.showToast(
                ToastType.SUCCESS,
                "Success:The formula has been successfully added to the key impact metric"
              );
              props?.setEditFormula(false);
              props?.getKIMSuggestion();
              props?.setTextInput([]);
            }
          })
          .catch((err) => {
            console.log(err, "errrr");
          });
      } else {
        Toast.showToast(
          ToastType.ERROR,
          "Please match opening and closing braces"
        );
      }
    } else {
      Toast.showToast(
        ToastType.ERROR,
        "Formula can't be empty. Please add formula"
      );
    }
  };

  const handleEditButton = () => {
    props?.setEditFormula(true);
    props?.setSelectedVariable("");
    props?.setSelectedConstant("");
  };

  const handleDiscardButton = () => {
    props?.setEditFormula(false);
    props?.setSelectedVariable("");
    props?.setSelectedConstant("");
    props?.setTextInput([]);
    setToggle(false);
    const tempArr = props.companyKIMs;
    const foundIndex = props?.companyKIMs?.findIndex(
      (kim: any) => kim?._id === props?.selectedKIMData?._id
    );
    tempArr[foundIndex].selected = false;
    props?.setSelectedKIMData("");
    props?.setCompanyKIMs(tempArr);
  };
  const regex = /([a-zA-Z_.)(][a-zA-Z0-9_. ]*)(?=\s*(?:[\/*+\-()]|$))/g;
  const opratorArr = ["+", "-", "*", "/"];
  const myfnc = (e: any) => {
    if (e.key === "Backspace") {
      console.log(e.key);
      props?.setTextInput(props?.textInput.slice(0, -1));
    }
  };
  React.useEffect(() => {
    window.addEventListener("keydown", myfnc);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", myfnc);
    };
  }, [props?.textInput]);
  // if (window && window !== undefined) {
  //   window?.addEventListener("keydown", (e) => myfnc(e));
  // }
  return (
    <div id="create-formula-area" className="flex flex-col h-3/5">
      <div className="flex items-center justify-between my-2">
        <p className="leading-4">Formula builder</p>
        <div className="flex justify-end gap-4 form-group rounded-[0]">
          {props?.editFormula ? (
            <>
              <Button
                type={"reset"}
                marginProperty={"mb-0"}
                classProperty={"bg-charcoal px-2.5 py-1.5"}
                imageClass="hidden"
                text={"Discard"}
                value={"cancel"}
                changeStep={() => handleDiscardButton()}
              />
              <Button
                type={"reset"}
                marginProperty={"mb-0"}
                classProperty={"bg-charcoal px-2.5 py-1.5"}
                imageClass="hidden"
                text={"Clear"}
                value={"cancel"}
                changeStep={() => props?.setTextInput([])}
              />
              {/* <Button
                type={"reset"}
                marginProperty={"mb-0"}
                classProperty={"bg-charcoal px-2.5 py-1.5"}
                imageClass="hidden"
                text={"Backspace"}
                value={"backspace"}
                changeStep={() =>
                  props?.setTextInput(props?.textInput.slice(0, -1))
                }
              /> */}

              <Button
                type={"submit"}
                marginProperty={"mb-0"}
                classProperty={"bg-purple px-2.5 py-1.5"}
                imageClass="hidden"
                text={"Save formula"}
                changeStep={() => saveFormula()}
              />
            </>
          ) : (
            <Button
              disabled={props?.selectedKIMData ? false : true}
              type={"submit"}
              marginProperty={"mb-0"}
              classProperty={"bg-charcoal px-2.5 py-1.5"}
              imageClass="hidden"
              text={"Edit formula"}
              changeStep={() => handleEditButton()}
            />
          )}
        </div>
      </div>

      <div className="p-4 overflow-y-scroll bg-darkGray grow ">
        {props.editFormula && props?.selectedKIMData ? (
          <>
            <p className="text-xs text-whiteOpacity">
              {props?.selectedKIMData?.metric}
            </p>
            <div className="flex flex-wrap">
              <div className="flex flex-wrap pr-1 my-1">=</div>
              {props?.textInput?.length
                ? props?.textInput.map((data: string, index: number) => {
                    return (
                      <span
                        key={`Key-${index}`}
                        className="p-1 m-1 text-xs text-black bg-white h-max create-formula-text"
                      >
                        {data}
                      </span>
                    );
                  })
                : null}
            </div>
            <div
              className="relative mb-10 w-max"
              onClick={() => setToggle(!toggle)}
            >
              {props?.textInput[props?.textInput?.length - 1] !== "(" && SAMD}
              {toggle && (
                <div className="absolute flex mb-1 border w-max border-slate-400">
                  <div className="">
                    {props?.textInput[props?.textInput?.length - 1] !== "(" &&
                      !props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) &&
                      props?.textInput[props?.textInput?.length - 1] !==
                        ")" && (
                        <button
                          onClick={() => {
                            handleFormSymbol("(");
                            setBracesCount(bracesCount + 1);
                          }}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          (
                        </button>
                      )}
                    {props?.textInput?.length > 0 &&
                      props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) && (
                        <button
                          onClick={() => handleFormSymbol("+")}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          +
                        </button>
                      )}
                    {props?.textInput?.length > 0 &&
                      props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) && (
                        <button
                          onClick={() => handleFormSymbol("-")}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          -
                        </button>
                      )}
                    {props?.textInput?.length > 0 &&
                      props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) && (
                        <button
                          onClick={() => handleFormSymbol("*")}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          *
                        </button>
                      )}
                    {props?.textInput?.length > 0 &&
                      props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) && (
                        <button
                          onClick={() => handleFormSymbol("/")}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          /
                        </button>
                      )}
                    {props?.textInput?.length > 0 &&
                      !opratorArr.includes(
                        props?.textInput[props?.textInput?.length - 1]
                      ) &&
                      props?.textInput[props?.textInput?.length - 1] !== ")" &&
                      props?.textInput[props?.textInput?.length - 1]?.match(
                        regex
                      ) &&
                      bracesCount > 0 && (
                        <button
                          onClick={() => {
                            handleFormSymbol(")");
                            setBracesCount(bracesCount - 1);
                          }}
                          className="p-1 m-1 text-black bg-white ps-2 pe-2"
                        >
                          )
                        </button>
                      )}
                  </div>
                </div>
              )}
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CreateFormula;
