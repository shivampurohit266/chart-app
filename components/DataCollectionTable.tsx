/* eslint-disable react-hooks/exhaustive-deps */
import {
  alpha,
  arrowDown,
  arrowRight,
  dangerIcon,
  infoIconSvg,
} from "@/utils/UtilsSvg";
import React, { useContext, useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DataCollectionTableHeaderFilter from "./DataCollectionTableHeaderFilter";
import { putDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import DataCollectionTablePagination from "./Dashboard/DataCollectionTablePagination";
const DataCollectionTable = ({
  KIMData,
  getKIMSuggestion,
  setKIMSuggestion,
  setLoading,
}: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [tableData, setTableData] = useState(KIMData);
  const [expandAll, setExpandAll] = useState(false);
  const [editMonthValueDisabled, setEditMonthValueDisabled] = useState(true);
  const [monthYearTab, setMonthYearTab] = useState(true);
  const [parentArrayId, setParentArrayId] = useState<any>([]);
  const [sort, setSort] = useState(false);
  const [showTooltipFormula, setShowTooltipFormula] = useState({
    id: "",
    formula: "",
  });
  const [a, setA] = useState(0);
  const [b, setB] = useState(6);
  useEffect(() => {
    setTableData(KIMData);
  }, [KIMData]);

  const handleCollapseData = () => {
    setExpandAll(!expandAll);
    setParentArrayId([]);
  };
  console.log(showTooltipFormula, "tooltip");

  const handleNextPage = () => {
    setA(6);
    setB(12);
  };

  const handlePrevPage = () => {
    setA(0);
    setB(6);
  };

  const handleEditMonthValueDisabled = () => {
    setEditMonthValueDisabled(false);
  };
  useEffect(() => {
    if (expandAll && tableData) {
      const kimIDs = tableData?.map((data: any) => data?.kim?._id);
      setParentArrayId([...kimIDs]);
    }
  }, [expandAll]);

  const handleShowSubChild = (e: any) => {
    if (!parentArrayId.includes(e)) {
      setParentArrayId([...parentArrayId, e]);
    } else {
      const parentArray = parentArrayId.filter((data: any) => data !== e);
      setParentArrayId([...parentArray]);
    }
  };

  const handleRemoveEditedRowContent = () => {
    setEditMonthValueDisabled(!editMonthValueDisabled);
    getKIMSuggestion();
  };
  const updateVariable = (
    e: any,
    kimIndex: number,
    variableIndex: number,
    variableInputIndex: number
  ) => {
    let newUpdates = [...KIMData];
    newUpdates[kimIndex].matchingVariables[variableIndex].data[
      variableInputIndex
    ].value = e.target.value;
    newUpdates[kimIndex].matchingVariables[variableIndex].data[
      variableInputIndex
    ].isEdited = true;
    setKIMSuggestion(newUpdates);
  };
  const handleSelectDrop = (
    e: any,
    kimIndex: number,
    variableIndex: number,
    variableInputIndex: number
  ) => {
    let newUpdates = [...KIMData];
    newUpdates[kimIndex].matchingVariables[variableIndex].data[
      variableInputIndex
    ].value = e.target.value;
    newUpdates[kimIndex].matchingVariables[variableIndex].data[
      variableInputIndex
    ].isEdited = true;
    newUpdates[kimIndex].kim.data[variableInputIndex].value = e.target.value;
    newUpdates[kimIndex].kim.data[variableInputIndex].isEdited = true;
    setKIMSuggestion(newUpdates);
  };

  const updateConstants = (
    e: any,
    kimIndex: number,
    constantsIndex: number,
    variableInputIndex: number
  ) => {
    let newUpdates = [...KIMData];
    newUpdates[kimIndex].matchingConstants[constantsIndex].data[
      variableInputIndex
    ].value = e.target.value;
    newUpdates[kimIndex].matchingConstants[constantsIndex].data[
      variableInputIndex
    ].isEdited = true;
    setKIMSuggestion(newUpdates);
  };

  const updateKIMData = (
    kimIndex: number,
    variableIndex: number,
    variableInputIndex: number
  ) => {
    let newUpdates = [...KIMData];
    const formula = newUpdates[kimIndex]?.kim?.formula;
    const dataVar = newUpdates[kimIndex]?.matchingVariables?.map(
      (datas: any, idx: number) => {
        const name = datas.nameOfTheVariable;
        return { key: name, value: datas?.data[variableInputIndex]?.value };
      }
    );
    const dataConst = newUpdates[kimIndex]?.matchingConstants?.map(
      (datas: any, idx: number) => {
        const name = datas?.nameOfTheConstant;
        return { key: name, value: datas?.data[variableInputIndex]?.value };
      }
    );
    let str = formula;
    let Obj = dataVar.concat(dataConst).reduce(function (obj: any, item: any) {
      obj[item.key] = item.value;
      return obj;
    }, {});
    let mySrt: any = "";
    dataVar.concat(dataConst).map((items: any, index: number) => {
      const length = dataVar.concat(dataConst).length;
      if (index === 0) {
        mySrt += `${items.key}`;
      } else if (index === length - 1) {
        mySrt += `|${items.key}/gi`;
      } else {
        mySrt += `|${items.key}`;
      }
    });
    let ans = null;
    const allObjVal = Object.values(Obj);
    if (mySrt !== "" && !allObjVal.includes("")) {
      ans = eval(
        str?.replace(
          /([a-zA-Z_.][a-zA-Z0-9_. ]*)(?=\s*(?:[\/*+\-()]|$))/g,
          function (matched: any) {
            return Obj[matched.trim()];
          }
        )
      );
      newUpdates[kimIndex].kim.data[variableInputIndex].value = ans.toFixed(2);
      newUpdates[kimIndex].kim.data[variableInputIndex].isEdited = true;
    } else {
      newUpdates[kimIndex].kim.data[variableInputIndex].value = "";
    }
    setKIMSuggestion(newUpdates);
  };

  const saveKIMDataCollected = async () => {
    // console.log("save Data", KIMData);
    let kims: any = [];
    let variables: any = [];
    let constants: any = [];
    if (KIMData.length) {
      KIMData.map((data: any) => {
        kims.push(data?.kim);
        variables = variables.concat(data?.matchingVariables);
        constants = constants.concat(data?.matchingConstants);
      });
    }
    const data = { kims, variables, constants };
    // console.log(data, "object");
    setLoading(true);
    await putDataWithToken("/company/update/dataCollection", data, token)
      .then(function (resp) {
        getKIMSuggestion();
        // Toast.showToast(ToastType.ERROR, "Unauthorized");
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };
  const handleAlpha = () => {
    // console.log("alpha clicked");
    if (!sort) {
      tableData?.sort((a: any, b: any) =>
        a.kim.metric > b.kim.metric ? 1 : a.kim.metric < b.kim.metric ? -1 : 0
      );
    } else {
      tableData?.sort((a: any, b: any) =>
        a.kim.metric < b.kim.metric ? 1 : a.kim.metric > b.kim.metric ? -1 : 0
      );
    }
    setSort(!sort);
  };
  return (
    <div className="mt-3 bg-darkGray">
      <div className="flex justify-end items-center">
        <div className="h-10 pt-2 pr-2 table-pagination">
          {tableData[0]?.kim?.data?.length >= 6 && (
            <DataCollectionTablePagination setA={setA} setB={setB} />
          )}
        </div>
        <DataCollectionTableHeaderFilter
          collapseSbuChild={handleCollapseData}
          editRowContent={handleEditMonthValueDisabled}
          dataFilterMonthOrYear={setMonthYearTab}
          saveKIMDataCollected={saveKIMDataCollected}
          cancelEditedRowContent={handleRemoveEditedRowContent}
          monthYearTab={monthYearTab}
          expandAll={expandAll}
        />
      </div>
      <div className="overflow-x-hidden max-h-[calc(100vh-300px)]">
        {/* table content */}
        <div className="grid grid-cols-9 border-y-2 border-y-[#868686] focus:outline-none  min-w-[1040px] w-[100%] sticky top-0 z-[3] bg-darkGray ">
          {/* table heading */}
          <div className="sticky left-0 px-3 py-4 text-sm text-center "></div>
          <div className="sticky flex justify-between px-4 py-2.5 left-[54px] bg-darkGray">
            <h6 className="text-sm font-medium ">Key Impact Metric</h6>
            <button onClick={handleAlpha}>{alpha}</button>
          </div>
          <div className="sticky px-3 py-2.5 text-sm bg-darkGray left-[335px]">
            Unit
          </div>
          {tableData &&
          tableData.length > 0 &&
          tableData[0]?.kim?.data?.length > 0 ? (
            <>
              {tableData[0]?.kim?.data
                .slice(a, b)
                .map((value: any, kimIndex: number) => {
                  return (
                    <div key={kimIndex} className="px-2 py-2.5 text-sm">
                      {value.name}
                    </div>
                  );
                })}
            </>
          ) : null}
        </div>
        {/* table content*/}

        {tableData &&
          tableData.length > 0 &&
          tableData.map((data: any, kimIndex: number) => {
            return (
              <div
                key={data?.kim?._id}
                className="mt-1 mb-5 pb-3 parent-child-array border-b border-[#868686]/20"
              >
                <div className="grid grid-cols-9 border-[#868686] focus:outline-none min-w-[1060px] w-[100%]">
                  <span
                    onClick={() => handleShowSubChild(data?.kim?._id)}
                    className="sticky left-0 flex items-center cursor-pointer justify-center px-4 py-2.5"
                  >
                    {parentArrayId.includes(data?.kim?._id)
                      ? arrowDown
                      : arrowRight}
                  </span>
                  <span className="flex justify-between max-w-[270px]">
                    {" "}
                    <h6 className="sticky px-4 py-2.5 text-sm bg-darkGray left-[54px]">
                      {data?.kim?.metric}
                    </h6>
                    <div
                      className="show-tooltip mt-2"
                      onMouseEnter={() => {
                        setShowTooltipFormula({
                          id: data?.kim?._id,
                          formula: data?.kim?.formula,
                        });
                      }}
                    >
                      {infoIconSvg}
                    </div>
                  </span>
                  <div className="sticky px-4 py-2.5 text-sm bg-darkGray left-[335px]">
                    {data?.kim?.UOM}
                  </div>

                  {data?.kim?.data?.length > 0 &&
                    data.kim.data
                      .slice(a, b)
                      .map((kimvalue: any, kimInputIndex: number) => {
                        return (
                          <div key={kimInputIndex} className="text-sm">
                            <input
                              type="text"
                              disabled
                              value={
                                kimvalue?.value !== "" ? kimvalue.value : ""
                              }
                              placeholder="_"
                              className={`px-2 py-2 m-1 max-w-[80px] focus:outline-none bg-darkGray border border-transparent ${
                                kimvalue.isEdited ? "bg-purple/20" : ""
                              }`}
                            />
                          </div>
                        );
                      })}
                </div>

                <div className="children-array">
                  {parentArrayId.includes(data?.kim?._id) &&
                    data?.matchingVariables?.length > 0 &&
                    data?.matchingVariables.map(
                      (value: any, variableIndex: number) => {
                        return (
                          <div key={value.id}>
                            <div
                              className="grid grid-cols-9 pt-2 border-b-[#868686] focus:outline-none min-w-[1060px] w-[100%]"
                              key={value.id}
                            >
                              <span className="sticky left-0"></span>
                              <h6 className="sticky px-4 py-2.5 text-sm bg-darkGray left-[54px]">
                                {value.nameOfTheVariable}
                              </h6>

                              <div className="sticky px-4 py-2.5 text-sm bg-darkGray left-[335px]">
                                {value.unitOfTheVariable}
                              </div>
                              {value.data.length > 0 &&
                                value.data
                                  .slice(a, b)
                                  .map(
                                    (
                                      varvalue: any,
                                      variableInputIndex: number
                                    ) => {
                                      let selectValues =
                                        data?.kim?.value?.split(",");
                                      return (
                                        <div
                                          key={variableInputIndex}
                                          className="text-sm"
                                        >
                                          {data?.kim?.dataTypeOfMatric ===
                                          "number" ? (
                                            <input
                                              type="number"
                                              value={varvalue?.value}
                                              placeholder="_"
                                              disabled={editMonthValueDisabled}
                                              className={`px-2 py-2 m-1 border border-dotted focus:outline-none max-w-[80px] bg-darkGray ${
                                                editMonthValueDisabled
                                                  ? "border-transparent"
                                                  : "border border-[#868686]"
                                              } ${
                                                varvalue.isEdited
                                                  ? "bg-purple/20"
                                                  : ""
                                              }`}
                                              onBlur={() =>
                                                updateKIMData(
                                                  kimIndex,
                                                  variableIndex,
                                                  variableInputIndex
                                                )
                                              }
                                              onChange={(e) =>
                                                updateVariable(
                                                  e,
                                                  kimIndex,
                                                  variableIndex,
                                                  variableInputIndex
                                                )
                                              }
                                            />
                                          ) : (
                                            <select
                                              id="boolean"
                                              name="boolean"
                                              disabled={editMonthValueDisabled}
                                              onChange={(e) =>
                                                handleSelectDrop(
                                                  e,
                                                  kimIndex,
                                                  variableIndex,
                                                  variableInputIndex
                                                )
                                              }
                                              value={varvalue.value}
                                              className={`px-2 py-2 m-1 border border-dotted focus:outline-none max-w-[80px] bg-darkGray ${
                                                editMonthValueDisabled
                                                  ? "border-transparent"
                                                  : "border border-[#868686]"
                                              } ${
                                                varvalue.isEdited
                                                  ? "bg-purple/20"
                                                  : ""
                                              }`}
                                            >
                                              <option value=""></option>
                                              {selectValues?.map(
                                                (
                                                  select: any,
                                                  idSelect: any
                                                ) => {
                                                  return (
                                                    <option
                                                      key={idSelect}
                                                      value={select.trim()}
                                                    >
                                                      {select}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
                <div className="children-array">
                  {parentArrayId.includes(data?.kim?._id) &&
                    data.matchingConstants?.length > 0 &&
                    data.matchingConstants.map(
                      (value: any, constantsIndex: number) => {
                        return (
                          <div key={value.id}>
                            <div
                              className="grid grid-cols-9 pt-2  border-b-[#868686] focus:outline-none min-w-[1060px] w-[100%]"
                              key={value.id}
                            >
                              <span className="sticky left-0"></span>
                              <h6 className="sticky px-4 py-2.5 text-sm bg-darkGray left-[54px]">
                                {value.nameOfTheConstant}
                              </h6>
                              <div className="sticky px-4 py-2.5 text-sm bg-darkGray left-[335px]">
                                {value.unitOfTheConstant}
                              </div>
                              {value.data.length > 0 &&
                                value.data
                                  .slice(a, b)
                                  .map(
                                    (
                                      constvalue: any,
                                      constantsInputIndex: number
                                    ) => {
                                      return (
                                        <div
                                          key={constantsInputIndex}
                                          className="text-sm"
                                        >
                                          <input
                                            type="number"
                                            value={constvalue?.value}
                                            placeholder="_"
                                            disabled={editMonthValueDisabled}
                                            className={`px-2 py-2 m-1 focus:outline-none border max-w-[80px] bg-darkGray ${
                                              editMonthValueDisabled
                                                ? "border-transparent"
                                                : "border border-[#868686]"
                                            }
                                          ${
                                            constvalue.isEdited
                                              ? "bg-purple/20"
                                              : ""
                                          }
                                          `}
                                            onChange={(e) =>
                                              updateConstants(
                                                e,
                                                kimIndex,
                                                constantsIndex,
                                                constantsInputIndex
                                              )
                                            }
                                            onBlur={() =>
                                              updateKIMData(
                                                kimIndex,
                                                constantsIndex,
                                                constantsInputIndex
                                              )
                                            }
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            );
          })}
      </div>
      {/* {showTooltipFormula?.id && ( */}
      <div className="z-[10] w-54">
        <ReactTooltip
          anchorSelect=".show-tooltip"
          variant="info"
          place="bottom"
          content={`${showTooltipFormula?.formula}`}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default DataCollectionTable;
