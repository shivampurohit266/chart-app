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
  // innerChartNameOne: "",
  // innerChartNameSecond: "",
  // outerChartNameOne: "",
  // outerChartNameSecond: "",
};

const BooleanCustomizeBody = ({ chartDataArr, chartId, closeModal }: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [filterData, setFilterData] = useState<any>([]);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const handleModalData = () => {};

  useEffect(() => {
    if (chartDataArr && chartId) {
      const chartdata = chartDataArr?.filter(
        (chartData: any) =>
          chartData.booleanChartId === chartId ||
          chartData.customActiveShapePieChartId === chartId
      );
      setFilterData(chartdata[0]);

      const formData = {
        chartLabel: chartdata[0]?.chartLabel,
      };
      setFormInitialValues(formData);
    }
  }, [chartId]);
  console.log(filterData, "dataOfArr>>");

  return (
    <div className="customize-modal">
      <Formik
        initialValues={formInitialValues}
        // validationSchema={validationCustomizePieChart}
        enableReinitialize
        onSubmit={async (actions, values) => {
          let submitData = { ...filterData };
          submitData.chartLabel = actions?.chartLabel;
          // submitData.data2 = [
          //   { name: actions.outerChartNameOne, value: "" },
          //   { name: actions.outerChartNameSecond, value: "" },
          // ];
          console.log("submit:action", actions, "submitdata", submitData);
          if (submitData.chartLabel) {
            if (chartId) {
              let url = "";
              switch (filterData?.chartType) {
                case "boolean Chart":
                  url = `/company/boolean/chart/${chartId}`;
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

export default BooleanCustomizeBody;
