import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import Input from "./Input";
import format from "date-fns/format";
import { Field, Form, Formik } from "formik";
import { modifyDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";

const initialValues = {
  chartLabel: "",
  timePeriod: "",
  orderBy: "",
};

const CustomizeModalBody = ({ chartDataArr, chartId, closeModal }: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterData, setFilterData] = useState<any>({});
  const handleModalData = () => {};
  useEffect(() => {
    if (chartDataArr && chartId) {
      const chartdata = chartDataArr?.filter(
        (chartData: any) =>
          chartData.stackedBarChartId === chartId ||
          chartData.composedResponsiveContainerId === chartId
      );
      setFilterData(chartdata[0]);
      const formData = {
        chartLabel: chartdata[0]?.chartLabel,
        timePeriod: chartdata[0]?.timePeriod ? chartdata[0]?.timePeriod : "",
        orderBy: chartdata[0]?.orderBy ? chartdata[0]?.orderBy : "",
      };
      setFormInitialValues(formData);
      if (chartdata[0]?.startDate && chartdata[0]?.endDate) {
        setStartDate(new Date(chartdata[0]?.startDate));
        setEndDate(new Date(chartdata[0]?.endDate));
      }
    }
  }, [chartId]);
  console.log(filterData, "dataOfArr>>");

  const reduceMonth = () => {
    setStartDate(new Date(startDate?.getTime() - 24 * 60 * 60 * 1000 * 30));
  };

  const increaseMonth = () => {
    setStartDate(new Date(startDate?.getTime() + 24 * 60 * 60 * 1000 * 30));
  };

  const increaseMonthUntil = () => {
    setEndDate(new Date(endDate?.getTime() + 24 * 60 * 60 * 1000 * 30));
  };

  const reduceMonthUntil = () => {
    setEndDate(new Date(endDate?.getTime() - 24 * 60 * 60 * 1000 * 30));
  };

  return (
    <div className="customize-modal">
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={async (values) => {
          let submitData = { ...filterData };
          submitData.startDate = format(startDate, "yyyy-MM-dd");
          submitData.endDate = format(endDate, "yyyy-MM-dd");
          submitData.chartLabel = values.chartLabel;
          submitData.timePeriod = values.timePeriod;
          submitData.orderBy = values.orderBy;
          console.log(submitData);

          if (
            submitData.chartLabel &&
            submitData.timePeriod &&
            submitData.orderBy
          ) {
            if (chartId) {
              let url = "";
              switch (filterData?.chartType) {
                case "Stacked Bar Chart":
                  url = `/company/stackedBar/chart/${chartId}`;
                  break;
                case "Composed Responsive Container":
                  url = `/company/composedResponsive/container/${chartId}`;
                  break;
              }
              modifyDataWithToken(url, submitData, token)
                .then(function (resp) {
                  const chartData = resp?.data;
                  if (chartData?.data) {
                    Toast.showToast(ToastType.SUCCESS, chartData?.message);
                    closeModal();
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
          }
        }}
      >
        {({ values }) => (
          <Form>
            <Input
              label={"Name the chart"}
              placeholder={"Enter your input"}
              name={"chartLabel"}
              type={"text"}
              value={values.chartLabel}
              htmlFor="chartLabel"
              parentClassName={"flex justify-between items-center mb-0"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />

            {filterData?.chartType === "Composed Responsive Container" && (
              <div className="flex flex-col mt-2">
                <ul>
                  <li>KIM1: Line</li>
                  <li>KIM2: Area</li>
                  <li>KIM3: Bar</li>
                </ul>
              </div>
            )}
            {filterData?.chartType !== "Composed Responsive Container" && (
              <div className="flex flex-col">
                <h6 className="mt-2 mt-4 mb-1 text-sm text-gray">
                  Time Period
                </h6>
                <Field
                  component="div"
                  name={`timePeriod`}
                  className="relative my-2"
                >
                  <input
                    type="radio"
                    required
                    id="MonthlyBases"
                    name="timePeriod"
                    value="Monthly"
                    checked={values.timePeriod === "Monthly"}
                    className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                  />
                  <label htmlFor="MonthlyBases" className="mr-10 text-sm">
                    Monthly
                  </label>

                  <input
                    type="radio"
                    id="onDate"
                    required
                    name="timePeriod"
                    value="As on date"
                    checked={values.timePeriod === "As on date"}
                    className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                  />
                  <label htmlFor="onDate" className="text-sm">
                    As on date
                  </label>
                </Field>
              </div>
            )}

            {/* <div>
              <h6 className="mt-2 mt-4 mb-1 text-sm text-gray">Order by</h6>
              <Field component="div" name={`orderBy`} className="relative my-2">
                <input
                  type="radio"
                  required
                  id="orderByName"
                  name="orderBy"
                  value="Name"
                  checked={values.orderBy === "Name"}
                  className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                />
                <label htmlFor="orderByName" className="mr-10 text-sm">
                  Name
                </label>

                <input
                  type="radio"
                  required
                  id="orderByValue"
                  name="orderBy"
                  value="Value"
                  checked={values.orderBy === "Value"}
                  className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                />
                <label htmlFor="orderByValue" className="text-sm">
                  Value
                </label>
              </Field>
            </div> */}

            <div>
              <h6 className="mt-2 mt-4 mb-1 text-sm text-gray">Timeline</h6>
              <div className="flex items-center justify-between">
                <div className="flex justify-center">
                  <span className="mr-4 text-sm">From</span>

                  <DatePicker
                    selected={startDate}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    name="startDate"
                    onChange={(date: Date) => setStartDate(date)}
                    className="text-sm text-white bg-charcoal flex w-[125px] px-2 py-1"
                  />
                  <div className="flex flex-col justify-between h-6 mx-1 mt-[2px]">
                    <button
                      onClick={reduceMonth}
                      className="border-[5px] border-t-0 border-x-transparent border-b-white w-0 h-0"
                    ></button>
                    <br />
                    <button
                      className="border-[5px] border-b-0 border-x-transparent border-t-white w-0 h-0"
                      onClick={increaseMonth}
                    ></button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span className="mr-4">To</span>
                  <DatePicker
                    selected={endDate}
                    name="endDate"
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    onChange={(date: Date) => setEndDate(date)}
                    // minDate={startDate}
                    className="text-sm text-white bg-charcoal flex w-[125px] px-2 py-1"
                  />

                  <div className="flex flex-col justify-between h-6 mx-1 mt-[2px]">
                    <button
                      onClick={reduceMonthUntil}
                      className="border-[5px] border-t-0 border-x-transparent border-b-white w-0 h-0"
                    ></button>
                    <br />
                    <button
                      className="border-[5px] border-b-0 border-x-transparent border-t-white w-0 h-0"
                      onClick={increaseMonthUntil}
                    ></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6 form-group">
              <Button
                type={"reset"}
                classProperty={"bg-charcoal "}
                imageClass="hidden"
                text={"Cancel"}
                value={"cancel"}
                marginProperty={"mb-0"}
                changeStep={closeModal}
              />

              <Button
                type={"submit"}
                classProperty={"bg-purple"}
                imageClass="hidden"
                text={"Save"}
                marginProperty={"mb-0"}
                changeStep={handleModalData}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomizeModalBody;
