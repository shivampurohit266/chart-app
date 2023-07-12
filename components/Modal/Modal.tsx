/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import closeIcon from "../../images/cross.png";
import { ModalInterface } from "@/utils/Interface/InterfaceModal";
import warningIcon from "../../images/warning-icon.png";
import MetricType from "../MetricType";
import ToastContext from "@/ToastContext";
import { getData } from "@/utils/Api";
import { putDataWithToken } from "@/utils/Api";
import { ToastType } from "@/utils/Constant";
import { crossSvg } from "@/utils/UtilsSvg";

const initialValues = {
  variableName: "",
  variableUnit: "",
  constantValue: "",
};
const Modal = (props: ModalInterface) => {
  const token = localStorage.getItem("authToken");
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const Toast = useContext(ToastContext);
  const [typeOfMatric, setTypeOfMatric] = useState<any>("number");
  useEffect(() => {
    if (props?.selectedItem?._id) {
      getDataById();
    }
  }, [props?.selectedItem?._id]);

  const getDataById = () => {
    getData(
      `/company/${
        props?.ModalHeading === "Edit Variable" ? "variable" : "constant"
      }/${props?.selectedItem?._id}`,
      token
    )
      .then(function (resp) {
        const data =
          props?.ModalHeading === "Edit Variable"
            ? resp?.data?.data?.variables?.[0]
            : resp?.data?.data?.constants?.[0];

        if (data) {
          props?.ModalHeading === "Edit Variable"
            ? setFormInitialValues({
                variableName: data?.nameOfTheVariable,
                variableUnit: data?.unitOfTheVariable,
                constantValue: "",
              })
            : setFormInitialValues({
                variableName: data?.nameOfTheConstant,
                variableUnit: data?.unitOfTheConstant,
                constantValue: data?.valueOfConstant,
              });
          setTypeOfMatric(
            props?.ModalHeading === "Edit Variable"
              ? data?.dataTypeOfVariable
              : data?.dataTypeOfConstant
          );
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <div
      data-te-modal-init
      className="modal fixed left-0 top-0 z-[100] h-full w-full outline-none text-white bg-primaryBlack/80 flex items-center content-center"
    >
      <div
        data-te-modal-dialog-ref
        className={`pointer-events-none relative w-auto translate-[-50px] transition-all duration-300 ease-in-out mx-auto w-[100%] pt-10 ${props.modalWidth}`}
      >
        <div className="relative flex flex-col w-full p-4 pointer-events-auto bg-darkGray">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center text-xl font-semibold leading-normal text-neutral-400">
                {props.headingImageType === "warning" && (
                  <Image className="mr-5" src={warningIcon} alt="" />
                )}
                {props.ModalHeading}
              </h2>
            </div>

            <button
              type="button"
              className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none bg-red"
              data-te-modal-dismiss
              aria-label="Close"
              onClick={() => {
                props?.closeVariableModal();
                props?.setSelectedItem && props?.setSelectedItem("");
              }}
            >
              {crossSvg}
            </button>
          </div>
          <p className={`para-name ${props.paraClass}`}>{props.children}</p>

          <div
            className={`relative flex-auto pt-4 ${props.formClass}`}
            data-te-modal-body-ref
          >
            <Formik
              initialValues={formInitialValues}
              enableReinitialize
              onSubmit={async (actions, values) => {
                if (
                  props?.modalFor === "constants" &&
                  actions?.variableName &&
                  actions?.constantValue &&
                  actions?.variableUnit &&
                  typeOfMatric !== "Data type of the matric"
                ) {
                  const data = {
                    nameOfTheConstant: actions?.variableName,
                    unitOfTheConstant: actions?.variableUnit,
                    dataTypeOfConstant: typeOfMatric,
                    valueOfConstant: actions?.constantValue,
                  };
                  await putDataWithToken(
                    `${
                      props?.selectedItem?._id
                        ? `/company/update/constant/${props?.selectedItem?._id}`
                        : "/company/add/constant"
                    }`,
                    data,
                    token
                  )
                    .then(function (resp) {
                      const constantData = resp?.data?.data;
                      if (constantData) {
                        Toast.showToast(
                          ToastType.SUCCESS,
                          `${
                            props?.selectedItem?._id
                              ? "Constant updated"
                              : "Constant added"
                          }`
                        );
                        props.closeVariableModal();
                        props?.setSelectedItem("");
                      } else if (resp?.response?.data?.message) console.log(resp);
                      Toast.showToast(
                        ToastType.ERROR,
                        resp?.response?.data?.message
                      );
                    })
                    .catch((err) => {
                      console.log(err, "errrr");
                    });
                } else {
                  if (
                    actions?.variableName &&
                    actions?.variableUnit &&
                    typeOfMatric !== "Data type of the matric"
                  ) {
                    const data = {
                      nameOfTheVariable: actions?.variableName,
                      unitOfTheVariable: actions?.variableUnit,
                      dataTypeOfVariable: typeOfMatric,
                    };
                    await putDataWithToken(
                      `${
                        props?.selectedItem?._id
                          ? `/company/update/variable/${props?.selectedItem?._id}`
                          : "/company/add/variable"
                      }`,
                      data,
                      token
                    )
                      .then(function (resp) {
                        const variablesData = resp?.data?.data;
                        if (variablesData) {
                          Toast.showToast(
                            ToastType.SUCCESS,
                            `${
                              props?.selectedItem?._id
                                ? "Variable updated"
                                : "Variable added"
                            }`
                          );
                          props.closeVariableModal();
                          props?.setSelectedItem("");
                        } else if (resp?.response?.data?.message) console.log(resp);
                        Toast.showToast(
                          ToastType.ERROR,
                          resp?.response?.data?.message
                        );
                      })
                      .catch((err) => {
                        console.log(err, "errrr");
                      });
                  }
                }
              }}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form>
                    <Input
                      isAsterisk={props.isAsterisk}
                      value={values?.variableName}
                      label={props.labelFirst}
                      placeholder={"Enter your input"}
                      name={"variableName"}
                      type={"text"}
                      htmlFor={"variableName"}
                    />

                    <Input
                      isAsterisk={props.isAsterisk}
                      value={values?.variableUnit}
                      label={props.labelSecond}
                      placeholder={"Enter your input"}
                      name={"variableUnit"}
                      type={"text"}
                      htmlFor={"variableUnit"}
                    />

                    <MetricType
                      options={["number", "boolean", "list"]}
                      typeOfMatric={typeOfMatric}
                      setTypeOfMatric={setTypeOfMatric}
                    />

                    {props.modalFor === "constants" && (
                      <div className="mt-6">
                        <Input
                          isAsterisk={props.isAsterisk}
                          modalFor={props.modalFor}
                          value={values?.constantValue}
                          label={props.labelThird}
                          placeholder={"1000"}
                          name={"constantValue"}
                          type={"number"}
                          htmlFor={"constant"}
                        />
                      </div>
                    )}

                    <div className="flex justify-end gap-4 mt-4 form-group">
                      <div
                        className=""
                        onClick={() => {
                          props?.setSelectedItem && props?.setSelectedItem("");
                          props?.closeVariableModal();
                        }}
                      >
                        <Button
                          type={"reset"}
                          classProperty={"bg-charcoal mb-0"}
                          imageClass="hidden"
                          text={"Cancel"}
                          value={"cancel"}
                        />
                      </div>

                      <Button
                        type={"submit"}
                        classProperty={"bg-purple mb-0"}
                        imageClass="hidden"
                        text={"Save"}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>

          {props.showSeparateBtn === "show" && (
            <div className="flex justify-end gap-4 form-group">
              <div className="" onClick={props.closeVariableModal}>
                <Button
                  type={"reset"}
                  classProperty={"bg-charcoal mb-0"}
                  imageClass="ml-2"
                  text={"Cancel"}
                  value={"cancel"}
                />
              </div>
              <div className="" onClick={props?.onYes}>
                <Button
                  type={"submit"}
                  classProperty={"bg-purple mb-0"}
                  imageClass="hidden"
                  text={`${props.btnSecondText}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
