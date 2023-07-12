import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";

import Toggler from "./Toggler";
import Input from "./Input";
import DropFIle from "./DropFIle";
import { deleteIconSvg, plusIconSvg } from "../utils/UtilsSvg";
import {
  REACT_API_BASE_URL,
  getData,
  postDataWithToken,
  putDataWithToken,
} from "@/utils/Api";
import Button from "./Button";
import { logOut } from "@/utils/Auth";
import { companyProfileValidation } from "@/utils/Validations/ValidationCompanyProfile";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import CustomizeModal from "./CustomizeModal";

const formMultiLocation = "";
const formMultiProducts = "";

const initialValues = {
  companyName: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  multiLocation: [formMultiLocation],
  multiProducts: [formMultiProducts],
  gstNumber: "",
};
const CompanyProfile = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [companyData, setCompanyData] = useState<any>({});
  const [companyLogo, setCompanyLogo] = useState<any>("");
  const [companyInfo, setCompanyInfo] = useState<any>(initialValues);
  const [locationToggle, setLocationToggle] = useState(false);
  const [productToggle, setProductToggle] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    getCompanyDetails();
  }, []);
  const getCompanyDetails = async () => {
    await getData("/company", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const company = resp?.data?.data;
          setCompanyData(company);
          // setStep(company.stepCompleted + 1);
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  console.log(companyData, "companyData");
  useEffect(() => {
    if (companyData) {
      setCompanyInfo({
        companyName: companyData?.companyName,
        address: companyData?.registeredAddress,
        city: companyData?.city,
        state: companyData?.state,
        postalCode: companyData?.zipCode,
        country: companyData?.country,
        multiLocation: companyData?.locationName?.length
          ? companyData?.locationName
          : [formMultiLocation],
        multiProducts: companyData?.locationName?.length
          ? companyData?.productName
          : [formMultiProducts],
        gstNumber: companyData?.companyGSTNumber
          ? companyData?.companyGSTNumber
          : "",
      });
      setLocationToggle(companyData?.multipleLocation);
      setProductToggle(companyData?.multipleProduct);
      setCompanyLogo(companyData?.logo);
    }
  }, [companyData]);

  const handleThemeColor = () => {
    setLocationToggle(!locationToggle);
  };

  const handleProductToggle = () => {
    setProductToggle(!productToggle);
  };
  const handleFileUpload = (event: any) => {
    const files = event;
    if (files[0]) {
      if (files[0].message && companyLogo.path) {
        setCompanyLogo({});
        Toast.showToast(ToastType.ERROR, files[0].message);
      }
      if (files[0].path) {
        setCompanyLogo(
          Object.assign(files[0], {
            preview: URL.createObjectURL(files[0]),
          })
        );
      }
    }
  };
  const handleWarnModal = () => {
    setShowWarning(!showWarning);
  };
  const WarnModalBody = (props: any) => {
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
            // value={"next"}
            // iconName="right"
            changeStep={() => {
              setCompanyData({});
              getCompanyDetails();
              handleWarnModal();
            }}
          />
          <Button
            type={"button"}
            classProperty={"bg-purple"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Save"}
            // value={"next"}
            // iconName="cross"
            changeStep={() => props?.handleSubmit()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <Formik
        initialValues={companyInfo}
        enableReinitialize
        onSubmit={async (fields, values) => {
          const data = new FormData();
          data.append("companyName", fields?.companyName);
          data.append("registeredAddress", fields?.address);
          data.append("city", fields?.city);
          data.append("state", fields?.state);
          data.append("zipCode", fields?.postalCode);
          data.append("companyGSTNumber", fields?.gstNumber);
          if (companyLogo.preview) {
            data.append("logo", companyLogo);
          }

          if (locationToggle) {
            fields?.multiLocation.forEach((tag: any) =>
              data.append("locationName[]", tag)
            );
            // data.append("locationName", JSON.stringify(fields?.multiLocation));
          }
          if (productToggle) {
            fields?.multiProducts.forEach((tag: any) =>
              data.append("productName[]", tag)
            );
            // data.append("productName", JSON.stringify(fields?.multiProducts));
          }
          data.append("country", fields?.country);
          {
            companyData && companyData?.companyId
              ? await putDataWithToken(
                  `/company/${companyData?.companyId}`,
                  data,
                  token,
                  true
                )
                  .then(function (resp) {
                    if (resp?.data?.data) {
                      setCompanyData(resp?.data?.data);
                      Toast.showToast(ToastType.SUCCESS, resp?.data?.message);
                      props.setStep(2);
                      props?.getCompanyDetails();
                      if (props?.stepDefault < 1) {
                        props?.setStepDefault(1);
                      }
                    } else if (
                      resp?.response?.data?.message === "Unauthorized"
                    ) {
                      logOut();
                    } else if (resp?.response?.data?.message) {
                      Toast.showToast(
                        ToastType.ERROR,
                        resp?.response?.data?.message
                      );
                    } else {
                      Toast.showToast(
                        ToastType.ERROR,
                        "Please fill all required fields and logo"
                      );
                    }
                  })
                  .catch((err) => {
                    console.log(err, "errrr");
                  })
              : await postDataWithToken("/company", data, token, true)
                  .then(function (resp) {
                    if (resp?.data?.data) {
                      setCompanyData(resp?.data?.data);
                      Toast.showToast(ToastType.SUCCESS, resp?.data?.message);
                      props.setStep(2);
                      props?.getCompanyDetails();
                    } else if (
                      resp?.response?.data?.message === "Unauthorized"
                    ) {
                      logOut();
                    } else if (resp?.response?.data?.message) {
                      Toast.showToast(
                        ToastType.ERROR,
                        resp?.response?.data?.message
                      );
                    } else {
                      Toast.showToast(
                        ToastType.ERROR,
                        "Please fill all required fields and logo"
                      );
                    }
                  })
                  .catch((err) => {
                    console.log(err, "errrr");
                  });
          }
        }}
        validationSchema={companyProfileValidation}
      >
        {({ handleSubmit, errors, status, touched, values }) => (
          <Form>
            <div className="max-w-[675px] w-full xl:max-w-[70%]">
              <div className="relative">
                <Input
                  errors={errors.companyName}
                  touched={touched.companyName}
                  value={values.companyName}
                  label={"Legal/ Entity Name"}
                  placeholder={"Enter your input here"}
                  name={"companyName"}
                  type={"text"}
                  htmlFor={"companyName"}
                  infoText={"Eg. Company Pvt Ltd./ LLC/ Corp/ Inc. /Co"}
                />
                {/* <span className="absolute left-4 top-[42px]">Sus|</span> */}
              </div>

              <Input
                errors={errors.address}
                touched={touched.address}
                value={values.address}
                label={"Registered Address"}
                placeholder={"Enter your input here"}
                name={"address"}
                type={"text"}
                htmlFor={"address"}
                infoText={"Building name, Street name, Street address"}
              />

              <div className="flex justify-between gap-6">
                <div className="mb-6 form-group basis-1/2">
                  <Input
                    errors={errors.city}
                    touched={touched.city}
                    value={values.city}
                    label={"City"}
                    placeholder={"Enter your input here"}
                    name={"city"}
                    type={"text"}
                    htmlFor={"city"}
                  />
                </div>

                <div className="mb-6 form-group basis-1/2">
                  <Input
                    errors={errors.state}
                    touched={touched.state}
                    value={values.state}
                    label={"State"}
                    placeholder={"Enter your input here"}
                    name={"state"}
                    type={"text"}
                    htmlFor={"state"}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-6">
                <div className="mb-6 form-group basis-1/2">
                  <Input
                    errors={errors.postalCode}
                    touched={touched.postalCode}
                    value={values.postalCode}
                    label={"Postal/ Zip Code"}
                    placeholder={"Enter your input here"}
                    name={"postalCode"}
                    type={"text"}
                    htmlFor={"postalCode"}
                  />
                </div>

                <div className="mb-6 form-group basis-1/2">
                  <Input
                    errors={errors.country}
                    touched={touched.country}
                    value={values.country}
                    label={"Country"}
                    placeholder={"Enter your input here"}
                    name={"country"}
                    type={"text"}
                    htmlFor={"country"}
                  />
                </div>
              </div>

              {/* Field array */}
              <div className="mb-6">
                <div className="form-group">
                  <h6 className="flex pb-2 text-sm font-font-semibold text-gray">
                    Multiple Location
                  </h6>

                  <Toggler
                    handleOnClick={handleThemeColor}
                    multiLocation={locationToggle}
                  />
                </div>
                {locationToggle && (
                  // <div className="form-group">
                  <FieldArray name="multiLocation">
                    {(arrayHelpers) => (
                      <div>
                        {values.multiLocation.map(
                          (formItem: string, index: number) => (
                            <div
                              className="flex items-end gap-6 mb-6 form"
                              key={index}
                            >
                              <div className="flex flex-col w-full">
                                <Input
                                  errors={errors.location}
                                  touched={touched.location}
                                  label={"Location Name"}
                                  placeholder={"Enter your input here"}
                                  name={`multiLocation.${index}`}
                                  type={"text"}
                                  value={formItem}
                                  htmlFor={"locationName"}
                                />
                              </div>

                              <div className="flex gap-6 mb-6">
                                <button
                                  type="button"
                                  className="flex items-center justify-center w-10 h-10 text-center transition border rounded border-gray text-purple hover:opacity-70"
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      index,
                                      formMultiLocation
                                    )
                                  }
                                >
                                  {plusIconSvg}
                                </button>
                                {values.multiLocation.length > 1 && (
                                  <button
                                    type="button"
                                    className="flex items-center justify-center w-10 h-10 text-center transition border rounded border-gray text-purple hover:opacity-70"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    {deleteIconSvg}
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </FieldArray>
                  // </div>
                )}
              </div>

              {/* field array */}
              <div className="mb-6 form-group">
                <h6 className="flex pb-2 text-sm font-font-semibold text-gray">
                  Multiple Products
                </h6>
                <Toggler
                  handleOnClick={handleProductToggle}
                  multiLocation={productToggle}
                />
              </div>

              {productToggle && (
                <FieldArray name="multiProducts">
                  {(arrayHelpers) => (
                    <div>
                      {values.multiProducts &&
                        // values.multiProducts.length > 0 ? (
                        values.multiProducts.map(
                          (formItem: string, index: number) => (
                            <div
                              className="flex items-end gap-6 mb-6 form"
                              key={index}
                            >
                              <div className="flex-col w-full ">
                                <Input
                                  label={"Product Name"}
                                  placeholder={"Enter your input here"}
                                  name={`multiProducts.${index}`}
                                  type={"text"}
                                  value={formItem}
                                  htmlFor={"product"}
                                />
                              </div>

                              <div className="flex gap-6 mb-6">
                                <button
                                  type="button"
                                  className="flex items-center justify-center w-10 h-10 text-center transition border rounded border-gray text-purple"
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      index,
                                      formMultiProducts
                                    )
                                  }
                                >
                                  {plusIconSvg}
                                </button>
                                {values.multiProducts.length > 1 && (
                                  <button
                                    type="button"
                                    className="flex items-center justify-center w-10 h-10 text-center transition border rounded border-gray text-purple"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    {deleteIconSvg}
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      <div></div>
                    </div>
                  )}
                </FieldArray>
              )}

              <Input
                errors={errors.gstNumber}
                touched={touched.gstNumber}
                label={"Company/ GST number (Optional)"}
                placeholder={"Enter your input here"}
                value={values.gstNumber}
                name={"gstNumber"}
                type={"text"}
                htmlFor={"gstNumber"}
              />

              <div>
                <h6 className="flex pb-2 text-sm font-font-semibold text-gray">
                  Attach Logo
                </h6>
                <p className="mb-2 text-sm">
                  Max file size is 2MB. Supported file types are .jpg and .png.
                </p>
                <div>
                  <DropFIle setLogo={handleFileUpload} uploadImage={false} />
                  {companyLogo?.preview && (
                    <img src={companyLogo?.preview} height={200} width={200} />
                  )}
                  {companyLogo && !companyLogo?.preview && (
                    <img
                      src={
                        companyLogo &&
                        `${REACT_API_BASE_URL}/uploads/${companyLogo}`
                      }
                      height={200}
                      width={200}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 form-group">
              <Button
                type={"submit"}
                classProperty={"bg-purple"}
                imageClass="ml-2"
                marginProperty="mb-0"
                text={
                  companyData && companyData?.companyId
                    ? "Update"
                    : "Save & Continue"
                }
              />
              <Button
                type={"button"}
                classProperty={"bg-purple"}
                imageClass="ml-2"
                marginProperty="mb-0"
                text={"Next"}
                // value={"next"}
                iconName="right"
                changeStep={handleWarnModal}
              />
            </div>
            {showWarning && (
              <CustomizeModal header="Warning" closeModal={handleWarnModal}>
                <WarnModalBody handleSubmit={handleSubmit} />
              </CustomizeModal>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanyProfile;
