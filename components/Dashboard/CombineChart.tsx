import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
];

const CombineChart = (props: any) => {
  const [flag, setFlag] = useState(false);
  let convertedData = [];
  let KIM1 = "";
  let KIM2 = "";
  let KIM3 = "";
  const newData = props?.combineChart?.kims;
  if (newData?.length) {
    // console.log(newData,"sta?????>>>");

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
          KIM1 = quarter[0].key.substring(0, 25);
          KIM2 = quarter[1].key.substring(0, 25);
          KIM3 = quarter[2].key.substring(0, 25);
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
    <div style={{ width: "100%", height: "100%" }}>
      {flag ? (
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={convertedData}
            // margin={{
            //   top: 50,
            //   right: 40,
            //   bottom: 20,
            //   left: 20,
            // }}
          >
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Line type="monotone" dataKey={KIM1} stroke="#A300AD" />
            <Area
              type="monotone"
              dataKey={KIM2}
              fill="#8e4dff"
              stroke="#8e4dff"
            />
            <Bar dataKey={KIM3} barSize={20} fill="#DDCAFF" />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">
          No data available for this chart please configure data to view chart
        </p>
      )}
    </div>
  );
};

export default CombineChart;
