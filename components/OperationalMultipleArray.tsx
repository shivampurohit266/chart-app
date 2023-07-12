/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ResetSVG from "../images/Reset.svg";
import { Field, Form, Formik } from "formik";
import arrowLeft from "../images/arrow-left-icon.png";
import arrowRight from "../images/arrow-right.png";
import {
  listFirst,
  listSecond,
  listThird,
  operationalArr,
  operationalArr2,
  operationalArr3,
} from "../utils/utilsArray";
import Button from "./Button";
import { getData, modifyDataWithToken } from "@/utils/Api";
import { logOut } from "@/utils/Auth";
import { ToastType } from "@/utils/Constant";
import ToastContext from "@/ToastContext";
import CustomizeModal from "./CustomizeModal";

const OperationalMultipleArray = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [tagData, setTagData] = useState<any>({ lineNo: 1, selected: [] });
  const [tagArray, setTagArray] = useState([]);
  const [allCompTags, setAllCompTags] = useState([]);
  const [companyData, setCompanyData] = useState(props?.companyData);
  const [showRestWarning, setShowRestWarning] = useState<boolean>(false);
  const arr2 = operationalArr2;
  const arr3 = operationalArr3;

  useEffect(() => {
    getOperationals();
  }, [tagData]);
  useEffect(() => {
    if (props?.companyData?.tagId?.length) {
      setTagData({ lineNo: 17, selected: props?.companyData?.tagId });
      setCompanyData(props?.companyData);
      getCompanyTags();
    }
  }, [props?.companyData?.tagId?.length]);

  const handleResetButton = () => {
    setShowRestWarning(true);
  };

  const resetSelection = () => {
    setTagData({ lineNo: 1, selected: [] });
    setTagArray([]);
    setCompanyData([]);
    setCompanyData({});
    setShowRestWarning(false);
  };

  const getCompanyTags = async () => {
    await getData(`/company/operational/info`, token)
      .then(function (resp) {
        // console.log(resp?.data?.data, "resppp");
        if (resp?.data?.data?.length) {
          setAllCompTags(resp?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const getOperationals = async () => {
    await getData(
      `/operational/byId?groupId=${tagData.lineNo}&selected=${tagData.selected}`,
      token
    )
      .then(function (resp) {
        if (resp?.data?.data?.length) {
          // props.setStep(2);
          const dataArr = resp?.data?.data;
          let newTagArr: any = [...tagArray];

          newTagArr.push(dataArr);
          if (tagData.lineNo) {
            // only splice array when item is found
            newTagArr.splice(tagData.lineNo, newTagArr.length);
            const new_arr = tagData.selected.filter(function (x: any) {
              return x <= dataArr[dataArr.length - 1].tagId;
            });

            if (JSON.stringify(new_arr) !== JSON.stringify(tagData.selected)) {
              setTagData({ lineNo: tagData.lineNo, selected: new_arr });
            }

            // console.log(
            //   dataArr[dataArr.length - 1].tagId,
            //   "???????????",
            //   new_arr
            // );
          }
          console.log(newTagArr, "tagData>>>>>>");
          setTagArray(newTagArr);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          logOut();
        } else if (!resp?.data?.data?.length && tagData.lineNo <= 17) {
          setTagData({
            lineNo: tagData.lineNo + 1,
            selected: tagData.selected,
          });
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleOutputFirst = (
    groupId: number,
    tagId: number,
    multiSelected: boolean
  ) => {
    const idxNew = groupId + 1;
    if (idxNew && !tagData.selected.includes(tagId)) {
      setTagData({ lineNo: idxNew, selected: [...tagData.selected, tagId] });
    } else if (idxNew && multiSelected && tagData.selected.includes(tagId)) {
      const new_arr = tagData.selected.filter(function (x: any) {
        return x != tagId;
      });
      setTagData({ lineNo: idxNew, selected: new_arr });
    } else if (idxNew && !multiSelected && tagData.selected.includes(tagId)) {
      // setTagData({ lineNo: idxNew, selected: tagData.selected });
      const new_arr = tagData.selected.filter(function (x: any) {
        return x != tagId;
      });
      setTagData({ lineNo: idxNew, selected: new_arr });
    }
  };
  console.log(tagData, "tagData");

  const handlePrevStep = () => {
    props.setStep(1);
  };
  const WarnModalBody = (props: any) => {
    return (
      <>
        <h1 className="mb-3">
          Clicking on the reset button will clear all the selections and any
          associated data. This action cannot be undone. Are you sure you want
          to proceed?
        </h1>
        <div className="flex justify-end gap-4 form-group">
          <Button
            type={"button"}
            iconName={"cross"}
            classProperty={"bg-[#414141]"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Cancel"}
            changeStep={() => {
              setShowRestWarning(false);
            }}
          />
          <Button
            type={"button"}
            iconName={"right"}
            classProperty={"bg-purple"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Yes reset"}
            changeStep={() => resetSelection()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <p className="text-xl font-medium">
          {/* Tell us about yourself so we can customize your account */}
          Choose the words below that best describe your business.
        </p>
        <p className="text-xs font-normal">
          {/* choose the words from below relevant to the nature of the business,
        Please choose as much as possible for best results */}
          The more information you provide, the better we can customize your
          framework and suggest relevant recommendations. Select as many options
          as applicable
        </p>
        <button
          className="flex items-center justify-between px-4 py-2.5 ml-auto text-white border rounded border-gray hover:opacity-70 transition"
          onClick={handleResetButton}
        >
          Reset
          <span>
            <Image className="ml-2" src={ResetSVG} alt="ResetSVG" />
          </span>
        </button>
        <div className="flex w-full h-full">
          <Formik
            initialValues={{
              picked: "",
            }}
            onSubmit={async (values) => {
              // await new Promise((r) => setTimeout(r, 500));
              // props.setStep(3);
              const tagId = tagData.selected;
              if (tagData.selected.length) {
                const data = { tagId };
                // console.log("submitForm");
                const resp = await modifyDataWithToken(
                  "/company/update/tag",
                  data,
                  token
                );
                console.log(resp, "resppppp");
                if (resp?.data?.message) {
                  Toast.showToast(ToastType.SUCCESS, resp?.data?.message);
                  // props.getCompanyDetails();
                  props.setStep(3);
                  if (!companyData?.tagId?.length) {
                    props?.setStepDefault(3);
                  }
                }
              } else {
                // console.log("please select a tag");
                Toast.showToast(
                  ToastType.ERROR,
                  "Error:Please select at least one of the suggestions to proceed"
                );
              }
            }}
          >
            {({ values }) => (
              <Form className="flex flex-col w-full">
                <div className="grow">
                  {companyData?.tagId?.length ? (
                    <>
                      {allCompTags.map((items: any, index: any) => (
                        <Field
                          key={index}
                          component="div"
                          name={`picked-${index}`}
                          className="relative"
                        >
                          {console.log(items, "????????")}
                          <input
                            // className="invisible w-0 -ml-1 opacity-0 peer"
                            className={`absolute left-[23px] top-[13px] peer ${
                              items.multiSelected
                                ? "styled-checkbox checkbox"
                                : "styled-checkbox radio"
                            }`}
                            type={items.multiSelected ? "checkbox" : "radio"}
                            // checked={tagData.selected.includes(items.tagId)}
                            // id={`${items.id}`}
                            id={`${items.tagLabel}`}
                            name={`picked-${index}`}
                            value={items.tagLabel}
                            checked={companyData?.companyId && true}
                            // onClick={() =>
                            //   handleOutputFirst(
                            //     items.groupId,
                            //     items.tagId,
                            //     items.multiSelected
                            //   )
                            // }
                          />
                          <label
                            className="h-10 inline-block px-3 py-2 mb-4 ml-3 text-base transition cursor-pointer rounded-3xl bg-[#c6c6c6] text-[#525252] w-max peer-checked:bg-purple peer-checked:text-[#f4f4f4]"
                            htmlFor={items.tagLabel}
                          >
                            {items.tagLabel}
                          </label>
                        </Field>
                      ))}
                      <div className="text-sm">
                        Please <span className="font-semibold">RESET</span> the
                        selection to select new chips
                      </div>
                    </>
                  ) : (
                    <>
                      {tagArray.map((rowItems: any, idx: any) => {
                        return (
                          <>
                            <div className={`flex flex-wrap`} key={idx}>
                              {rowItems.map((items: any, index: any) => (
                                <Field
                                  key={index}
                                  component="div"
                                  name={`picked-${idx}`}
                                  className="relative"
                                >
                                  <input
                                    // className="invisible w-0 -ml-1 opacity-0 peer"
                                    className={`absolute left-[23px] top-[13px] peer ${
                                      items.multiSelected
                                        ? "styled-checkbox checkbox"
                                        : "styled-checkbox radio"
                                    }`}
                                    type={
                                      items.multiSelected ? "checkbox" : "radio"
                                    }
                                    checked={tagData.selected.includes(
                                      Number(items.tagId)
                                    )}
                                    // id={`${items.id}`}
                                    id={`${items.tagLabel}`}
                                    name={`picked-${idx}`}
                                    value={items.tagLabel}
                                    // defaultChecked={companyData?.companyId && true}
                                    onClick={() =>
                                      handleOutputFirst(
                                        items.groupId,
                                        items.tagId,
                                        items.multiSelected
                                      )
                                    }
                                  />
                                  <label
                                    className="h-10 inline-block px-3 py-2 mb-4 ml-3 text-base transition cursor-pointer rounded-3xl bg-[#c6c6c6] text-[#525252] w-max peer-checked:bg-purple peer-checked:text-[#f4f4f4]"
                                    htmlFor={items.tagLabel}
                                  >
                                    {items.tagLabel}
                                  </label>
                                </Field>
                                // </div>
                              ))}
                            </div>
                          </>
                        );
                      })}
                      {tagData.lineNo >= 17 && (
                        <p className="text-sm">
                          Please select all the relevant options from above
                          keywords that align with your company&apos;s nature of
                          business. Based on your selection, we will provide you
                          with a customized impact framework in next step
                          tailored specifically for your business.
                        </p>
                      )}
                    </>
                  )}
                </div>
                {/* 
              <div className="flex list-second">
                {rowNumber >= 1 &&
                  listSecond.map((items, index) => {
                    // rowChecker = 2;
                    return (
                      <div key={index}>
                        <Field
                          component="div"
                          name="checkedFirst"
                          // onClick={handleOutputSecond}
                        >
                          <input
                            className="invisible w-0 -ml-1 opacity-0 peer"
                            type="checkbox"
                            id={`${items}`}
                            name="checkedFirst"
                            value={items}
                          />
                          <label
                            className="cursor-pointer ml-3 px-3 py-2 rounded-3xl text-base mb-4 inline-block transition bg-[#c6c6c6] text-[#525252] w-max peer-checked:bg-[#412974] peer-checked:text-[#f4f4f4]"
                            htmlFor={items}
                          >
                            {items}
                          </label>
                        </Field>
                      </div>
                    );
                  })}
              </div> */}

                {/* <div
                className="flex list-third"
                role="group"
                aria-labelledby="checkbox-group"
              >
                {rowNumber >= 0 &&
                  listThird.map((items, index) => {
                    // rowChecker = 3;
                    return (
                      <div key={index}>
                        <Field
                          component="div"
                          name="radioSecond"
                          // onClick={handleOutputFirst}
                        >
                          <input
                            className="invisible w-0 -ml-1 opacity-0 peer"
                            type="radio"
                            id={`${items}`}
                            name="radioSecond"
                            value={items}
                          />
                          <label
                            className="cursor-pointer ml-3 px-3 py-2 rounded-3xl text-base mb-4 inline-block transition bg-[#c6c6c6] text-[#525252] w-max peer-checked:bg-[#412974] peer-checked:text-[#f4f4f4]"
                            htmlFor={items}
                          >
                            {items}
                          </label>
                        </Field>
                      </div>
                    );
                  })}
              </div> */}

                <div className="flex justify-end gap-4 pb-7 form-group">
                  {/* <button
                  onClick={handlePrevStep}
                  className="flex items-center p-4 text-white transition rounded h-max bg-charcoal btn btn-secondary hover:opacity-70"
                >
                  Previous
                  <Image className="ml-2" src={arrowLeft} alt="" />
                </button> */}

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
                    text={"Save & Continue"}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showRestWarning && (
        <CustomizeModal
          header="Warning"
          closeModal={() => {
            setShowRestWarning(false);
          }}
        >
          <WarnModalBody />
        </CustomizeModal>
      )}
    </>
  );
};

export default OperationalMultipleArray;
