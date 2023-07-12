import React, { useEffect, useMemo, useState } from "react";
import MetricRow from "./MetricRow";
import { matrixRowArray } from "@/utils/utilsArray";

const MetricContentTable = (props: any) => {
  const [matrixArr, setMatrixArr] = useState(props.KIMSuggestion);
  const [masterCheck, setMasterCheck] = useState(false);
  useEffect(() => {
    setMatrixArr(props.KIMSuggestion);
  }, [props.KIMSuggestion]);

  const changeMasterCheck = (e: any) => {
    let tampArr = matrixArr;
    tampArr.map((user: any) => (user.selected = e.target.checked));
    setMatrixArr(tampArr);
    props.setKIMSuggestion(tampArr);
    setMasterCheck(e.target.checked);
  };
  const changeKIMCheck = (e: any, kimId: any) => {
    let tampArr = [...matrixArr];
    tampArr.map((user) => {
      if (user._id == kimId) {
        user.selected = e.target.checked;
      } else {
        user.selected = false;
      }
      return user;
    });
    const totalItems = matrixArr.length;
    const totalCheckedItems = tampArr.filter((e) => e.selected).length;

    setMatrixArr(tampArr);
    props.setKIMSuggestion(tampArr);
    setMasterCheck(totalItems == totalCheckedItems);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-darkGray matrix-row">
      <div className="w-full text-sm text-left text-gray-700">
        <div className="metric-content-table text-base leading-5 text-[#a4a6a9] bg-gray-50">
          <div className="grid gap-3 grid-cols-tablestruct bg-graySecond ">
            {/* <div className="p-4">
              <div className="flex items-center">
                <input
                  id={`checkbox-table-search`}
                  type="checkbox"
                  defaultChecked={masterCheck}
                  value="value"
                  onChange={changeMasterCheck}
                  className="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded styled-checkbox focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`checkbox-table-search`}>
               
                </label>
              </div>
            </div> */}
            <div className="flex items-center pl-[55px] pr-3 py-3">
              Name of the metric
            </div>
            <div className="flex items-center px-3 py-3">UoM</div>
            <div className="flex items-center px-3 py-3">Data type</div>
            <div className="flex items-center px-3 py-3">Location</div>
            <div className="flex items-center px-3 py-3">Product</div>
          </div>
        </div>
        <div className="metrix-main-content">
          {matrixArr.map((items: any) => {
            // console.log(items,"?????");

            return (
              <MetricRow
                key={items?._id}
                selected={items?.selected}
                inputValue={items?._id}
                labelContent={items?.labelContent}
                metricName={items?.metric}
                metricUnit={items?.UOM}
                metricType={items?.dataTypeOfMatric}
                metricMultiLocation={items?.multipleLocation}
                metricMultiProduct={items?.multipleProduct}
                changeKIMCheck={changeKIMCheck}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricContentTable;
