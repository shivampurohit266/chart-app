/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { Field, Form, Formik } from "formik";
import closeIcon from "../images/cross.png";
import Input from "./Input";
import Image from "next/image";
import Toggler from "./Toggler";
import ThemeDropDown from "./ThemeDropDown";
import SubThemeDropDown from "./SubThemeDropDown";
import { getData, modifyDataWithToken, postDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import MetricType from "./MetricType";
import { crossSvg } from "@/utils/UtilsSvg";

const initialValues = {
  metric: "",
  UOM: "",
  description: "",
};
const AddMetricModal = (props: any) => {
  const token = localStorage.getItem("authToken");
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [locationToggle, setLocationToggle] = useState(false);
  const [productToggle, setProductToggle] = useState(false);
  const Toast = useContext(ToastContext);
  const [typeOfMatric, setTypeOfMatric] = useState<any>("number");
  const [selectedTheme, setSelectedTheme] = useState<any>("All Themes");
  const [selectedSubTheme, setSelectedSubTheme] =
    useState<any>("Select Sub Theme");
  const [booleanMetricValues, setBooleanMetricValues] = useState("true, false");
  const [listMetricValues, setistMetricValues] = useState(
    "Item One, Item Second, Item Third"
  );

  const handleBooleanMetric = (e: any) => {
    setBooleanMetricValues(e.target.value);
  };

  const handleListMetric = (e: any) => {
    setistMetricValues(e.target.value);
  };

  useEffect(() => {
    if (props?.selectedTheme && props?.selectedSubTheme) {
      setSelectedTheme(props?.selectedTheme);
      setSelectedSubTheme(props?.selectedSubTheme);
    }
    if (props?.kimId) {
      getKimById();
    }
  }, [props?.kimId]);

  const getKimById = () => {
    getData(`/company/kim/${props?.kimId}`, token)
      .then(function (resp) {
        const kimData = resp?.data?.data?.kims?.[0];
        if (kimData?.subthemeId) {
          setLocationToggle(kimData?.multipleLocation);
          setProductToggle(kimData?.multipleProduct);
          setFormInitialValues({
            metric: kimData?.metric,
            UOM: kimData?.UOM,
            description: kimData?.description ? kimData?.description : "",
          });
          setSelectedTheme(kimData?.themeId);
          setSelectedSubTheme(
            kimData?.subthemeId ? kimData?.subthemeId : "Select Sub Theme"
          );
          setTypeOfMatric(kimData?.dataTypeOfMatric);
          if (kimData?.dataTypeOfMatric === "boolean") {
            setBooleanMetricValues(kimData?.value);
          }
          if (kimData?.dataTypeOfMatric === "list") {
            setistMetricValues(kimData?.value);
          }
          // Toast.showToast(ToastType.SUCCESS, kimData?.message);
          // props.closeModal();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const handleLocationToggler = () => {
    setLocationToggle(!locationToggle);
  };

  const handleProductToggle = () => {
    setProductToggle(!productToggle);
  };

  return (
    <>
      <div
        data-te-modal-init
        className="modal fixed left-0 top-0 z-[100] h-full w-full outline-none text-white bg-primaryBlack/80 flex items-center content-center "

        // tabIndex="-1"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-[-50px] transition-all duration-300 ease-in-out mx-auto max-w-[706px] w-[100%] pt-10"
        >
          <div className="relative flex flex-col w-full px-8 py-4 pointer-events-auto bg-darkGray max-h-[80vh] h-max overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold leading-normal text-neutral-400">
                  Add metric
                </h2>
                <p className="pt-1 text-sm text-normal">
                  This is the key impact metric for which data collection
                  happens at regular interval
                </p>
              </div>
              <button
                type="button"
                className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none bg-red"
                data-te-modal-dismiss
                aria-label="Close"
                onClick={props.closeModal}
              >
                {/* <Image src={closeIcon} alt="" /> */}
                {crossSvg}
              </button>
            </div>

            <div className="relative flex-auto pt-8" data-te-modal-body-ref>
              <Formik
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={async (actions, values) => {
                  let value: any = "";
                  if (typeOfMatric === "boolean") {
                    value = booleanMetricValues;
                  } else if (typeOfMatric === "list") {
                    value = listMetricValues;
                  }
                  const data: any = {
                    ...actions,
                    subthemeId: selectedSubTheme,
                    themeId: selectedTheme,
                    multipleLocation: locationToggle,
                    multipleProduct: productToggle,
                    dataTypeOfMatric: typeOfMatric,
                    value: value,
                  };
                  if (
                    data.metric &&
                    // data.UOM &&
                    typeOfMatric !== "Data type of the matric" &&
                    data.subthemeId !== "Select Sub Theme" &&
                    data.themeId !== "All Themes"
                  ) {
                    if (props?.kimId) {
                      modifyDataWithToken(
                        `/company/update/kim/${props?.kimId}`,
                        data,
                        token
                      )
                        .then(function (resp) {
                          const kimData = resp?.data;

                          if (kimData?.data) {
                            Toast.showToast(
                              ToastType.SUCCESS,
                              kimData?.message
                            );
                            props.closeModal();
                          }
                        })
                        .catch((err) => {
                          console.log(err, "errrr");
                        });
                    } else {
                      data.formula = "";
                      await postDataWithToken("/company/add/kim", data, token)
                        .then(function (resp) {
                          const kimData = resp?.data;
                          if (resp?.response?.status === 500) {
                            console.log(resp, "KimData");
                            Toast.showToast(
                              ToastType.ERROR,
                              resp?.response?.data?.message
                            );
                          }
                          if (kimData?.data?.kims?.length) {
                            Toast.showToast(
                              ToastType.SUCCESS,
                              kimData?.message
                            );
                            props.closeModal();
                          }
                        })
                        .catch((err) => {
                          console.log(err, "errrr");
                        });
                    }
                  }
                  // props.setKIMSuggestion([...props.KIMSuggestion, data]);
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <Input
                        isAsterisk={true}
                        parentClassName="mb-0"
                        label={"Name of the metric"}
                        placeholder={"Enter your input"}
                        name={"metric"}
                        type={"text"}
                        value={values?.metric}
                        htmlFor={"metric"}
                      />

                      <ThemeDropDown
                        isAsterisk={true}
                        selectedTheme={selectedTheme}
                        setSelectedTheme={setSelectedTheme}
                        setSelectedSubTheme={setSelectedSubTheme}
                        selectHeight={"h-[38px] bg-secondaryBlack"}
                        showLabelText={true}
                      />

                      <MetricType
                        options={["number", "boolean", "list"]}
                        typeOfMatric={typeOfMatric}
                        setTypeOfMatric={setTypeOfMatric}
                      />

                      <SubThemeDropDown
                        isAsterisk={true}
                        selectedTheme={selectedTheme}
                        selectedSubTheme={selectedSubTheme}
                        setSelectedSubTheme={setSelectedSubTheme}
                        selectHeight={"h-[38px] bg-secondaryBlack"}
                        showLabelText={true}
                      />
                      <div className="test">
                        {typeOfMatric === "number" ? (
                          <Input
                            isAsterisk={true}
                            parentClassName="mb-0"
                            label={"Unit of the metric"}
                            placeholder={"Enter your text"}
                            name={"UOM"}
                            value={values.UOM}
                            type={"text"}
                            htmlFor={"UOM"}
                          />
                        ) : typeOfMatric === "boolean" ? (
                          <div className="text-gray-800 h-max form-group ">
                            <label
                              htmlFor="description"
                              className="flex pb-2 text-sm font-font-semibold text-gray"
                            >
                              Default Values (Seperated by Comma)
                              <span className="text-red-500">*</span>
                            </label>
                            <Field
                              defaultValue={booleanMetricValues}
                              placeholder={booleanMetricValues}
                              name={"booleanValue"}
                              type={"text"}
                              onChange={(e: any) => {
                                handleBooleanMetric(e);
                              }}
                              className={`w-full py-2 px-4 form-control text-sm bg-secondaryBlack border-1 border border-transparent border-t-transparent border-b-gray focus:outline-none focus:border-purple`}
                            />
                          </div>
                        ) : (
                          <div className="text-gray-800 h-max form-group ">
                            <label
                              htmlFor="description"
                              className="flex pb-2 text-sm font-font-semibold text-gray"
                            >
                              Default Values (Seperated by Comma)
                              <span className="text-red-500">*</span>
                            </label>
                            <Field
                              as={"textarea"}
                              defaultValue={listMetricValues}
                              placeholder={listMetricValues}
                              name={"listValue"}
                              type={"text"}
                              onChange={(e: any) => {
                                handleListMetric(e);
                              }}
                              className={`w-full py-2 px-4 form-control text-sm bg-secondaryBlack border-1 border border-transparent border-t-transparent border-b-gray focus:outline-none focus:border-purple`}
                            />
                          </div>
                        )}

                        <div>
                          <h6 className="flex pt-6 text-sm font-font-semibold text-gray">
                            Does this metric apply to each
                          </h6>
                          <div className="flex pt-2">
                            <div className="flex flex-col w-3/6">
                              <label
                                htmlFor="location"
                                className="pb-2 text-sm"
                              >
                                Location
                              </label>
                              <Toggler
                                handleOnClick={handleLocationToggler}
                                multiLocation={locationToggle}
                              />
                            </div>

                            <div className="flex flex-col w-3/6">
                              <label htmlFor="product" className="pb-2 text-sm">
                                Product
                              </label>
                              <Toggler
                                handleOnClick={handleProductToggle}
                                multiLocation={productToggle}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col text-gray-800 h-max">
                          <label
                            htmlFor="description"
                            className="flex pb-2 text-sm font-font-semibold text-gray"
                          >
                            Description (optional)
                          </label>
                          <Field
                            placeholder={"Description"}
                            name={"description"}
                            value={values.description}
                            type={"text"}
                            htmlFor={"description"}
                            as={"textarea"}
                            className="text-sm resize-none w-full p-3 pr-12 bg-secondaryBlack appearance-none cursor-pointer focus:outline-none focus:border focus:border-purple border-b border-b-[#868686] min-h-[132px] h-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 mb-2 form-group">
                      <div onClick={props.closeModal}>
                        <Button
                          type={"reset"}
                          marginProperty={"mb-0"}
                          classProperty={"bg-charcoal "}
                          imageClass="ml-2"
                          text={"Discard"}
                          value={"cancel"}
                        />
                      </div>

                      <div
                        onClick={() => {
                          setTimeout(() => {
                            props.closeModal;
                          }, 2000);
                        }}
                      >
                        <Button
                          type={"submit"}
                          marginProperty={"mb-0"}
                          classProperty={"bg-purple"}
                          imageClass="ml-2"
                          text={props?.kimId ? "Update" : " Save"}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMetricModal;
