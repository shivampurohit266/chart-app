import React, { PureComponent, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data01 = [
  { name: "Group A", value: 89.54 },
  { name: "Group B", value: 80.0 },
];
const data02 = [
  { name: "Group A", value: 91.44 },
  { name: "Group B", value: 64.0 },
];

const PieChartDash = (props: any) => {
  const [innerIndex, setInnerIndex] = useState(3);
  const [outerIndex, setOuterIndex] = useState(3);
  let val1 = "";
  let val2 = "";
  let name1 = "";
  let name2 = "";
  let newData1: any = [];
  let newData2: any = [];
  if (
    props?.pieChartDash?.kims?.length &&
    props?.pieChartDash?.kims?.length > 1
  ) {
    props?.pieChartDash?.kims[0]?.data?.map((data: any, idx: number) => {
      console.log(data, "dataPi", idx);
      if (data?.value) {
        val1 = data?.value;
        name1 = props?.pieChartDash?.kims[0].metric;
      }
    });
    props?.pieChartDash?.kims[1]?.data?.map((data: any, idx: number) => {
      console.log(data, "dataPi", idx);
      if (data?.value) {
        val2 = data?.value;
        name2 = props?.pieChartDash?.kims[1].metric;
      }
    });
  } else if (
    props?.pieChartDash?.kims?.length &&
    props?.pieChartDash?.kims?.length === 1
  ) {
    props?.pieChartDash?.kims[0]?.data?.map((data: any, idx: number) => {
      console.log(data, "dataPi", idx);
      if (data?.value) {
        val1 = data?.value;
        name1 = props?.pieChartDash?.kims[0].metric;
      }
    });
  }

  if (val1) {
    newData1.push({
      name: name1,
      value: val1 ? Number(val1) : 0,
    });
    newData1.push({
      name: `100 - ${name1}`,
      value: val1 ? 100.0 - Number(val1) : 0,
    });
  }
  if (val2) {
    newData2.push({
      name: name2,
      value: val2 ? Number(val2) : 0,
    });
    newData2.push({
      name: `100 - ${name2}`,
      value: val2 ? 100.0 - Number(val2) : 0,
    });
  }
  // newData1.push({
  //   name: "Group A",
  //   value: data?.data[0]?.value ? Number(data?.data[0]?.value) : 0,
  // });
  // newData2.push({
  //   name: "Group B",
  //   value: data?.data[0]?.value ? Number(data?.data[0]?.value) : 0,
  // });
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
          {/* {payload.name} */}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 2}
          outerRadius={outerRadius + 3}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${payload.name}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const onPieEnter = (_: any, index: any) => {
    setInnerIndex(index);
    setOuterIndex(3);
  };
  const onPieEnterOuter = (_: any, index: any) => {
    setOuterIndex(index);
    setInnerIndex(3);
  };
  if (newData1?.length || newData2?.length) {
    props?.setShowWelcomeMsg(false);
  }
  return (
    <>
      {newData1?.length || newData2?.length ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <>
              {newData1?.length && (
                <Pie
                  data={newData1}
                  activeIndex={innerIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={30}
                  fill="#8e4dff"
                />
              )}
              {newData2?.length && (
                <Pie
                  data={newData2}
                  activeIndex={outerIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnterOuter}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={60}
                  fill="#A300AD"
                  // label
                />
              )}
            </>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">
          No data available for this chart please configure data to view chart
        </p>
      )}
    </>
  );
};

export default PieChartDash;
