import React, { PureComponent, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Abc-Adr",
    KIM1: 40,
    KIM2: 24,
    KIM3: 24,
  },
  {
    name: "Bds-Bfs",
    KIM1: 30,
    KIM2: 13,
    KIM3: 22,
  },
  {
    name: "Cfs-Cfd",
    KIM1: 83,
    KIM2: 45,
    KIM3: 22,
  },
  {
    name: "Dda-Dsf",
    KIM1: 80,
    KIM2: 39,
    KIM3: 20,
  },
  {
    name: "Eda-Esf",
    KIM1: 80,
    KIM2: 39,
    KIM3: 20,
  },
];

const StackedBarChart = (props: any) => {
  const [flag, setFlag] = useState(false);
  let convertedData = [];
  let KIM1 = "";
  let KIM2 = "";
  let KIM3 = "";
  const newData = props?.stackedBarChart?.kims;
  if (newData?.length) {
    const monthArry = newData[0]?.data?.map((monthData: any, idx: any) => {
      return { name: monthData?.name };
    });

    const allArr = monthArry.map((data: any, index: any) => {
      const myDatas = newData.map((value: any, idx: any) => {
        console.log(
          value.metric,
          "stackedBarChart data",
          idx,
          "stackedBarChart month",
          index
        );
        if (monthArry.length > 4) {
          return {
            name:
              index === 0 || index === 11 || props?.expandMode
                ? data?.name
                : data?.name.charAt(0),
            data: value?.data[index]?.value,
            key: value?.metric,
          };
        } else {
          return {
            name: data?.name,
            data: value?.data[index]?.value,
            key: value?.metric,
          };
        }
      });
      return myDatas;
    });
    if (allArr.length) {
      convertedData = allArr.map((quarter: any, index: any) => {
        console.log(quarter, "qqqqq");
        if (newData?.length === 1) {
          KIM1 = quarter[0].key.substring(0, 25);
          if (parseFloat(quarter[0]?.data) && !flag) {
            props?.setShowWelcomeMsg(false);
            setFlag(true);
          }
          return {
            name: quarter[0]?.name, // Convert index to corresponding letter A, B, C, D, ...
            [KIM1]: parseFloat(quarter[0]?.data) || "",
            // KIM2: parseFloat(quarter[1]?.data) || "",
            // KIM3: parseFloat(quarter[2]?.data) || "",
          };
        } else if (newData?.length === 2) {
          KIM1 = quarter[0].key.substring(0, 25);
          KIM2 = quarter[1].key.substring(0, 25);
          if (
            (parseFloat(quarter[0]?.data) || parseFloat(quarter[1]?.data)) &&
            !flag
          ) {
            props?.setShowWelcomeMsg(false);
            setFlag(true);
          }
          return {
            name: quarter[0]?.name,
            [KIM1]: parseFloat(quarter[0]?.data) || "",
            [KIM2]: parseFloat(quarter[1]?.data) || "",
            // KIM3: parseFloat(quarter[2]?.data) || "",
          };
        } else if (newData?.length === 3) {
          KIM1 = quarter[0].key.substring(0, 35);
          KIM2 = quarter[1].key.substring(0, 35);
          KIM3 = quarter[2].key.substring(0, 35);
          if (
            (parseFloat(quarter[0]?.data) ||
              parseFloat(quarter[1]?.data) ||
              parseFloat(quarter[2]?.data)) &&
            !flag
          ) {
            props?.setShowWelcomeMsg(false);
            setFlag(true);
          }
          return {
            name: quarter[0]?.name,
            [KIM1]: parseFloat(quarter[0]?.data) || "",
            [KIM2]: parseFloat(quarter[1]?.data) || "",
            [KIM3]: parseFloat(quarter[2]?.data) || "",
          };
        }
      });
      // console.log(convertedData, "stack?????");
    }
  }

  return (
    <>
      {flag ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={convertedData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip wrapperClassName="!whitespace-pre-wrap" />
            {/* <Legend /> */}
            <Bar dataKey={KIM1} stackId="a" fill="#8E4DFF" />
            <Bar dataKey={KIM2} stackId="a" fill="#DDCAFF" />
            <Bar dataKey={KIM3} stackId="a" fill="#A300AD" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">
          No data available for this chart please configure data to view chart
        </p>
      )}
    </>
  );
};

export default StackedBarChart;
