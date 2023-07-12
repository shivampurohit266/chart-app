import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { Form, Formik } from "formik";
import Input from "../Input";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import { modifyDataWithToken } from "@/utils/Api";
import { validationCustomizePieChart } from "@/utils/Validations/validationCustomizePieChart";

const initialValues = {
  chartLabel: "",
  innerChartNameOne: "",
  innerChartNameSecond: "",
  outerChartNameOne: "",
  outerChartNameSecond: "",
};

const CustomizePieChartModalBody = ({
  chartDataArr,
  chartId,
  closeModal,
}: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [filterData, setFilterData] = useState<any>([]);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const handleModalData = () => {};

  useEffect(() => {
    if (chartDataArr && chartId) {
      const chartdata = chartDataArr?.filter(
        (chartData: any) =>
          chartData.twoLevelPieChartId === chartId ||
          chartData.customActiveShapePieChartId === chartId
      );
      setFilterData(chartdata[0]);

      const formData = {
        chartLabel: chartdata[0]?.chartLabel,
        innerChartNameOne: chartdata[0]?.data1?.length
          ? chartdata[0]?.data1[0]?.name
          : "",
        innerChartNameSecond: chartdata[0]?.data1?.length
          ? chartdata[0]?.data1[1]?.name
          : "",
        outerChartNameOne: chartdata[0]?.data2?.length
          ? chartdata[0]?.data2[0]?.name
          : "",
        outerChartNameSecond: chartdata[0]?.data2?.length
          ? chartdata[0]?.data2[1]?.name
          : "",
      };
      setFormInitialValues(formData);
    }
  }, [chartId]);
  console.log(filterData, "dataOfArr>>");

  return (
    <div className="customize-modal">
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationCustomizePieChart}
        enableReinitialize
        onSubmit={async (actions, values) => {
          let submitData = { ...filterData };
          submitData.chartLabel = actions?.chartLabel;
          submitData.data1 = [
            { name: actions.innerChartNameOne, value: "" },
            { name: actions.innerChartNameSecond, value: "" },
          ];
          submitData.data2 = [
            { name: actions.outerChartNameOne, value: "" },
            { name: actions.outerChartNameSecond, value: "" },
          ];
          console.log("submit:action", actions, "submitdata", submitData);
          if (
            submitData.chartLabel &&
            actions.innerChartNameOne &&
            actions.outerChartNameOne
          ) {
            if (chartId) {
              let url = "";
              switch (filterData?.chartType) {
                case "Two Level Pie Chart":
                  url = `/company/twoLevel/chart/${chartId}`;
                  break;
                case "Custom Active Shape Pie Chart":
                  url = `/company/customActive/chart/${chartId}`;
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
              value={values.chartLabel}
              name={"chartLabel"}
              type={"text"}
              htmlFor="chartLabel"
              parentClassName={"flex justify-between items-center mb-0"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />

            <div>
              <h6 className="mt-2 mt-4 mb-2 text-sm text-gray">
                Inner chart labels:
              </h6>
              <div className="flex gap-4">
                <Input
                  label={"InnerChart name 1"}
                  placeholder={"KIM label 1"}
                  value={values.innerChartNameOne}
                  name={"innerChartNameOne"}
                  type={"text"}
                  htmlFor={"innerChartNameOne"}
                  labelClassName="hidden"
                  parentClassName={"mb-0"}
                />

                <Input
                  label={"InnerChart name 2"}
                  placeholder={"100 - KIM label 1"}
                  value={values.innerChartNameSecond}
                  name={"innerChartNameSecond"}
                  type={"text"}
                  htmlFor={"innerChartNameSecond"}
                  labelClassName="hidden"
                  parentClassName={"mb-0"}
                />
              </div>
            </div>

            <div>
              <h6 className="mt-2 mt-4 mb-2 text-sm text-gray">
                Outer chart labels :
              </h6>
              <div className="flex gap-4">
                <Input
                  label={"OuterChart name 1"}
                  placeholder={"KIM label 2"}
                  value={values.outerChartNameOne}
                  name={"outerChartNameOne"}
                  type={"text"}
                  htmlFor={"outerChartNameOne"}
                  labelClassName="hidden"
                  parentClassName={"mb-0"}
                />

                <Input
                  label={"OuterChart name 2"}
                  placeholder={"100- KIM label 2"}
                  value={values.outerChartNameSecond}
                  name={"outerChartNameSecond"}
                  type={"text"}
                  htmlFor={"outerChartNameSecond"}
                  labelClassName="hidden"
                  parentClassName={"mb-0"}
                />
              </div>
            </div>

            {/* <div className="flex flex-col">
              <h6 className="mt-2 mt-4 mb-1 text-sm text-gray">Time Period</h6>
              <Field
                component="div"
                name={`timePeriod`}
                className="relative my-2"
              >
                <input
                  type="radio"
                  id="MonthlyBases"
                  name="timePeriod"
                  value="Monthly"
                  className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                />
                <label htmlFor="MonthlyBases" className="mr-10 text-sm">
                  Monthly
                </label>

                <input
                  type="radio"
                  id="onDate"
                  name="timePeriod"
                  value="As on date"
                  className="absolute left-[23px] top-[13px] peer styled-checkbox radio"
                />
                <label htmlFor="onDate" className="text-sm">
                  As on date
                </label>
              </Field>
            </div> */}

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

export default CustomizePieChartModalBody;
