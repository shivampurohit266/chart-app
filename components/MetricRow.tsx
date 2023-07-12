import { MatrxiTableRowInterface } from "@/utils/Interface/InterfaceMatrixTableRow";
import { Field, Formik } from "formik";
import React from "react";

const MetricRow = (props: MatrxiTableRowInterface) => {
  return (
    <>
      <div className="text-base leading-[20px] border-b border-[#868686] hover:bg-gray-50 grid grid-cols-tablestruct gap-3 items-center">
        {/* <div className="w-4 px-4 py-3">
          <div className="flex items-center h-full">
            <input
              id={`checkbox-table-search-${props.inputValue}`}
              type="checkbox"
              checked={props.selected}
              onChange={(e) => props.changeKIMCheck(e, props.inputValue)}
              className="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded styled-checkbox focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor={`checkbox-table-search-${props.inputValue}`}>
              {props.labelContent}
            </label>
          </div>
        </div> */}
        <div className="flex items-center py-3 pl-4 pr-6 text-sm font-medium text-gray-900">
          <div className="">
            <div className="flex items-center h-full">
              <input
                id={`checkbox-table-search-${props.inputValue}`}
                type="checkbox"
                checked={props.selected}
                onChange={(e) => props.changeKIMCheck(e, props.inputValue)}
                className="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded styled-checkbox focus:ring-blue-500 focus:ring-2"
              />
              <label
                className="flex items-center"
                htmlFor={`checkbox-table-search-${props.inputValue}`}
              >
                <span className="ml-2">{props.metricName}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="px-3 py-3 text-sm">{props.metricUnit}</div>
        <div className="px-3 py-3 text-sm">
          {props.metricType === "number" ? "Number" : props.metricType}
        </div>
        <div className="px-3 py-3 text-sm">
          {props.metricMultiLocation ? "Multiple" : "Single"}
        </div>
        <div className="px-3 py-3 text-sm">
          {props.metricMultiProduct ? "Multiple" : "Single"}
        </div>
      </div>
    </>
  );
};

export default MetricRow;
