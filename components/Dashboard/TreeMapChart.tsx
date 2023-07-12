import React, { PureComponent, useState } from "react";
import { Treemap, ResponsiveContainer } from "recharts";

const data = [
  { name: "Area 1", size: 89.54, fill: "#8E4DFF" },
  { name: "Area 2", size: 80.0, fill: "#DDCAFF" },
  // { name: 'Axis', size: 65, fill: "#A300AD" },
  // { name: 'Axis', size: 63, fill: "#532FE7" },
];

const COLORS = ["#8E4DFF", "#DDCAFF", "#A300AD", "#532FE7"];

// class CustomizedContent extends PureComponent {
//   render() {
//     const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

//     return (
//       <g>
//         <rect
//           x={x}
//           y={y}
//           width={width}
//           height={height}
//           style={{
//             fill: depth < 2 ? colors[Math.floor((index / root?.children?.length) * 6)] : '#ffffff00',
//             stroke: '#fff',
//             strokeWidth: 2 / (depth + 1e-10),
//             strokeOpacity: 1 / (depth + 1e-10),
//           }}
//         />
//         {depth === 1 ? (
//           <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
//             {name}
//           </text>
//         ) : null}
//         {depth === 1 ? (
//           <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
//             {index + 1}
//           </text>
//         ) : null}
//       </g>
//     );
//   }
// }

const TreeMapChart = (props: any) => {
  const [flag, setFlag] = useState(false);
  let newData: any = [];
  if (props?.treeMapChart?.kims?.length) {
    props?.treeMapChart?.kims?.map((data: any, index: number) => {
      let val = "";
      if (data?.data?.length) {
        data?.data?.map((value: any) => {
          if (value?.value) {
            val = value?.value;
            if (!flag) {
              setFlag(true);
              props?.setShowWelcomeMsg(false);
            }
          }
        });
      }

      newData.push({
        name: props?.treeMapChart?.chart?.data[index]?.name,
        size: Number(val),
        fill: COLORS[index],
      });
    });
  }
  console.log(newData, "newData");

  return (
    <>
      {flag && newData?.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={400}
            height={200}
            data={newData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            // content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      ) : (
        <p className="text-center">
          No data available for this chart please configure data to view chart
        </p>
      )}
    </>
  );
};

export default TreeMapChart;
