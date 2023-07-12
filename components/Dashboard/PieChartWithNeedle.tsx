/* eslint-disable no-shadow */
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const RADIAN = Math.PI / 180;
const data = [
  { name: "A", value: 30, color: "#8e4dff" },
  { name: "B", value: 40, color: "#DDCAFF" },
  { name: "C", value: 30, color: "#A300AD" },
];
const cx = 122;
const cy = 150;
const iR = 50;
const oR = 100;
const value = 20;

const needle = (
  value: any,
  data: any,
  cx: any,
  cy: any,
  iR: any,
  oR: any,
  color: any
) => {
  let total = 0;
  data.forEach((v: any) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <React.Fragment key={1}>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />
    </React.Fragment>,
  ];
};

const PieChartWithNeedle = (props: any) => {
  const newData = props?.pieChartWithNeedle?.chart?.data;
  let val = "";
  const myVal = props?.pieChartWithNeedle?.kims[0]?.data.map((data: any) => {
    if (data?.value) {
      val = data?.value > 100 ? 100 : data?.value;
    }
    return data.value;
  });
  const lessGood = props?.pieChartWithNeedle?.chart?.isLessGood;

  // const newValue = props?.pieChartWithNeedle?.kims[0]?.data[0]?.value > 100 ? 100 : props?.pieChartWithNeedle?.kims[0]?.data[0]?.value
  if (val) {
    console.log("datapieee", val);

    props?.setShowWelcomeMsg(false);
  }
  return (
    <div>
      {val ? (
        <PieChart width={250} height={257}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={lessGood ? [...newData]?.reverse() : newData}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {lessGood ? (
              <>
                {[...data].reverse().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </>
            ) : (
              <>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </>
            )}
          </Pie>
          {val && <>{needle(val, data, cx, cy, iR, oR, "#532FE7")}</>}
          <Tooltip />
        </PieChart>
      ) : (
        <p className="text-center">
          No data available for this chart please configure data to view chart
        </p>
      )}
    </div>
  );
};

export default PieChartWithNeedle;
