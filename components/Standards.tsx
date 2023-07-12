import {
  dataPeriod,
  financialYear,
  formatReports,
  reportingStandard,
} from "@/utils/utilsArray";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import ToastContext from "@/ToastContext";
import { modifyDataWithToken } from "@/utils/Api";
import { ToastType } from "@/utils/Constant";

const initialValues: any = {
  reportingStandard: ["Custom"],
  format: [],
  periodFrequency: "",
  year: "",
};
const Standards = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  useEffect(() => {
    setFormInitialValues(props?.companyData?.standards);
  }, [props?.companyData]);
  const handlePrevStep = () => {
    props.setStep(5);
  };
  const handleNextStep = () => {
    props.setStep(7);
  };
  return (
    <div className="flex flex-col h-full standard-step">
      <p className="mb-4 text-xl font-medium">
        Reporting and Output Preferences: Define your reporting standard, format
        and data settings{" "}
      </p>
      {/* <div className="h-[74vh] overflow-scroll"> */}
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={(actions, values) => {
          console.log("submit", actions, values);
          if (!actions.reportingStandard.includes("Custom")) {
            actions.reportingStandard.push("Custom");
          }
          if (
            actions?.reportingStandard.length &&
            actions?.year &&
            actions?.format.length &&
            actions?.periodFrequency
          ) {
            modifyDataWithToken(
              "/company/update/standard",
              { standards: actions },
              token
            )
              .then(function (resp) {
                const chartData = resp?.data;
                if (chartData?.data) {
                  Toast.showToast(ToastType.SUCCESS, chartData?.message);
                  // closeModal();
                  props.setStep(7);
                  if(props?.stepDefault<7){
                    props?.setStepDefault(7)
                  }
                  // props.getCompanyDetails();
                } else {
                  Toast.showToast(
                    ToastType.ERROR,
                    resp?.response?.data?.message
                  );
                }
              })
              .catch((err) => {
                console.log(err, "errrr");
              });
          }
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col h-[inherit]">
            <div className="grow">
              <div id="reporting-standards" className="mb-6 text-sm ">
                Select the reporting standard that best suits your requirements
                <div className="pl-5">
                  {reportingStandard.map((items, index) => {
                    return (
                      <Field
                        key={index}
                        component="div"
                        name={"reportingStandard"}
                        className="relative my-2"
                      >
                        <input
                          className={`absolute left-[23px] top-[13px] peer styled-checkbox`}
                          type={"checkbox"}
                          id={`${items}`}
                          name={"reportingStandard"}
                          value={items}
                          disabled={items === "Custom"}
                          checked={values?.reportingStandard?.includes(items)}
                        />
                        <label htmlFor={items} className="text-sm">
                          {items}
                        </label>
                      </Field>
                    );
                  })}
                </div>
              </div>

              <div id="format-reports" className="mb-6 text-sm ">
                Select the preferred file format for downloadable reports
                <div className="pl-5">
                  {formatReports.map((items, index) => {
                    return (
                      <>
                        <Field
                          key={index}
                          component="div"
                          name={"format"}
                          className="relative my-2"
                        >
                          <input
                            className={`absolute left-[23px] top-[13px] peer styled-checkbox`}
                            type={"checkbox"}
                            id={`${items}`}
                            name={"format"}
                            value={items}
                            checked={values?.format?.includes(items)}
                          />
                          <label htmlFor={items} className="text-sm">
                            {items}
                          </label>
                        </Field>
                      </>
                    );
                  })}
                </div>
              </div>

              <div id="data-period" className="mb-6 text-sm ">
                Select the financial period option that aligns with your company
                <div className="pl-5">
                  {dataPeriod.map((items, index) => {
                    return (
                      <Field
                        key={index}
                        component="div"
                        name={"periodFrequency"}
                        className="relative my-2"
                      >
                        <input
                          className={`absolute left-[23px] top-[13px] peer styled-checkbox radio`}
                          type={"radio"}
                          id={`${items}`}
                          name={"periodFrequency"}
                          value={items}
                          checked={items === values?.periodFrequency}
                        />
                        <label htmlFor={items} className="text-sm">
                          {items.charAt(0) + items.slice(1).toLowerCase()}
                        </label>
                      </Field>
                    );
                  })}
                </div>
              </div>

              <div id="financial-year" className="mb-6 text-sm ">
                Select the data collection frequency for the reporting period
                <div className="pl-5">
                  {financialYear.map((items, index) => {
                    return (
                      <Field
                        key={index}
                        component="div"
                        name={"year"}
                        className="relative my-2"
                      >
                        <input
                          className={`absolute left-[23px] top-[13px] peer styled-checkbox radio `}
                          type={"radio"}
                          id={`${items}`}
                          name={"year"}
                          value={items}
                          checked={items === values?.year}
                        />
                        <label htmlFor={items} className="text-sm">
                          {items === "JAN-DEC" ? "Jan-Dec" : "Apr-Mar"}
                        </label>
                      </Field>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <button type="submit">Submit</button> */}
            <div className="flex justify-end gap-4 form-group">
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
                // changeStep={handleNextStep}
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* </div> */}
    </div>
  );
};

export default Standards;
