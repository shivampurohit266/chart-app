import React, { useContext, useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Toggler from "../Toggler";
import { Form, Formik } from "formik";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import { modifyDataWithToken } from "@/utils/Api";
import { validationCustomizeNeedle } from "@/utils/Validations/validationCustomizeNeedle";

const initialValues = {
  chartLabel: "",
  bad: 0,
  average: 0,
  good: 0,
};

const CustomizeNeedleModalBody = ({
  chartDataArr,
  chartId,
  closeModal,
}: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [filterData, setFilterData] = useState<any>([]);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [filterDataToggler, setFilterDataToggler] = useState(false);

  useEffect(() => {
    if (chartDataArr && chartId) {
      const chartdata = chartDataArr?.filter(
        (chartData: any) => chartData.pieChartWithNeedleId === chartId
      );
      setFilterData(chartdata[0]);
      setFilterDataToggler(chartdata[0]?.isLessGood);
      const formData = {
        chartLabel: chartdata[0]?.chartLabel,
        bad: chartdata[0]?.data[0]?.value,
        average: chartdata[0]?.data[1]?.value,
        good: chartdata[0]?.data[2]?.value,
      };
      setFormInitialValues(formData);
    }
  }, [chartId]);

  // console.log(filterData, "dataOfArr>>");

  const handleFilterDataToggler = () => {
    setFilterDataToggler(!filterDataToggler);
  };

  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationCustomizeNeedle}
        enableReinitialize
        onSubmit={async (actions, values) => {
          let submitData = { ...filterData };
          submitData.chartLabel = actions?.chartLabel;
          submitData.isLessGood = filterDataToggler;
          submitData.data[0].value = actions?.bad ? actions?.bad : 0;
          submitData.data[1].value = actions?.average ? actions?.average : 0;
          submitData.data[2].value = actions?.good ? actions?.good : 0;
          console.log("submit", actions, submitData);
          console.log(
            Number(actions.bad) +
              Number(actions.average) +
              Number(actions.good),
            "??????"
          );
          if (
            submitData.chartLabel &&
            submitData.data[0].value > -1 &&
            submitData.data[1].value > -1 &&
            submitData.data[2].value > -1
          ) {
            if (submitData?.pieChartWithNeedleId) {
              modifyDataWithToken(
                `/company/pieChart/needle/${submitData?.pieChartWithNeedleId}`,
                submitData,
                token
              )
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
          // props.setKIMSuggestion([...props.KIMSuggestion, data]);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Input
              label={"Name of the chart"}
              placeholder={"Enter your input"}
              name={"chartLabel"}
              value={values.chartLabel}
              type={"text"}
              htmlFor={"chartLabel"}
              parentClassName={"flex justify-between items-center mb-6 gap-3"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />
            <Input
              label={"Bad"}
              placeholder={"Enter your input"}
              name={"bad"}
              value={values.bad}
              type={"number"}
              htmlFor={"bad"}
              parentClassName={"flex justify-between items-center mb-6 gap-3"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />
            <Input
              label={"Average"}
              placeholder={"Enter your input"}
              name={"average"}
              value={values.average}
              type={"number"}
              htmlFor={"average"}
              parentClassName={"flex justify-between items-center mb-6 gap-3"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />
            <Input
              label={"Good"}
              placeholder={"Enter your input"}
              name={"good"}
              value={values.good}
              type={"number"}
              htmlFor={"good"}
              parentClassName={"flex justify-between items-center mb-6 gap-3"}
              labelClassName={"!pb-0"}
              inputClassName={"w-[70%]"}
            />

            <div className="flex mt-6">
              <label
                className="flex w-2/6 pb-2 mt-2 text-sm font-font-semibold text-gray"
                htmlFor=""
              >
                isLessGood
              </label>
              <Toggler
                handleOnClick={handleFilterDataToggler}
                multiLocation={filterDataToggler}
              />
            </div>

            <div className="flex justify-end gap-4 form-group">
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
                // changeStep={closeModal}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomizeNeedleModalBody;
