import {
  closeIconSvg,
  collapseIcon,
  editIcon,
  saveFileIcon,
  searchIcon,
} from "@/utils/UtilsSvg";
import React, { useState } from "react";

const DataCollectionTableHeaderFilter = ({
  collapseSbuChild,
  editRowContent,
  dataFilterMonthOrYear,
  saveKIMDataCollected,
  cancelEditedRowContent,
  monthYearTab,
  expandAll,
}: any) => {
  const [showCancelSaveBtn, sethSowCancelSaveBtn] = useState(false);
  const handleCancelSaveBtn = () => {
    saveKIMDataCollected();
    sethSowCancelSaveBtn(false);
  };

  return (
    <div className="flex border-b-[#868686]">
      <div className="relative top-0 right-0 flex items-center justify-center h-10 text-gray-600 grow ">
        {/* <input
          className="min-h-10 px-5 pr-16 bg-transparent focus:outline-none h-[41px] text-base w-full"
          type="search"
          name="search"
          onChange={event => setSearchResult(event.target.value)}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 mr-4 flex h-[inherit] items-center"
        >
          {searchIcon}
        </button> */}
      </div>
      {/* <div className="flex items-center mx-4 my-2">
        <div
          className={`${
            !monthYearTab ? "bg-purple" : "bg-charcoal"
          } px-4 py-[2px] h-max cursor-pointer`}
          onClick={(e) => dataFilterMonthOrYear(false)}
        >
          Qty
        </div>
        <div
          className={`${
            monthYearTab ? "bg-purple" : "bg-charcoal"
          }  px-4 py-[2px] h-max cursor-pointer`}
          onClick={(e) => dataFilterMonthOrYear(true)}
        >
          Yr
        </div>
      </div> */}

      <div className="flex">
        <button
          type="reset"
          className="px-4 py-2.5 text-white my-1.5 mr-1.5 btn btn-secondary flex items-center hover:opacity-70 transition rounded bg-charcoal "
          onClick={collapseSbuChild}
        >
          {expandAll ? <> Collapse all </> : <>Expand All</>}
          <span className="pl-2.5"> {collapseIcon}</span>
        </button>

        {showCancelSaveBtn ? (
          <>
            <button
              type="reset"
              className="px-4 py-2.5 my-1.5 mr-1.5 text-white btn btn-secondary flex items-center hover:opacity-70 transition rounded bg-charcoal"
              onClick={() => {
                cancelEditedRowContent(), sethSowCancelSaveBtn(false);
              }}
            >
              Cancel
              <span className="pl-2.5"> {closeIconSvg} </span>
            </button>

            <button
              type="reset"
              className="px-4 py-2.5 my-1.5 mr-1.5 text-white btn btn-secondary flex items-center hover:opacity-70 transition rounded bg-purple"
              onClick={() => {
                handleCancelSaveBtn();
              }}
            >
              Save
              <span className="pl-2.5"> {saveFileIcon}</span>
            </button>
          </>
        ) : (
          <button
            type="reset"
            className="px-4 py-2.5 my-1.5 mr-1.5 text-white btn btn-secondary flex items-center hover:opacity-70 transition rounded bg-charcoal"
            onClick={() => {
              editRowContent(), sethSowCancelSaveBtn(true);
            }}
          >
            Edit
            <span className="pl-2.5"> {editIcon}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DataCollectionTableHeaderFilter;
