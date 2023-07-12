import { arrowRight, arrowUp, arrowLeft } from "@/utils/UtilsSvg";
import Link from "next/link";
import React, { useState } from "react";

const DataCollectionTablePagination = (props: any) => {
  const [pageNumber, setPageNumber] = useState(false);
  const [number, setNumber] = useState(1);

  const handlePaginationNumber = () => {
    setPageNumber(!pageNumber);
  };

  const handleRemainingMonthData = () => {
    // setPageNumber(!pageNumber);
    setNumber(2);
    props.setA(6);
    props.setB(12);
  };
  const handleInitialMonthData = () => {
    // setPageNumber(!pageNumber);
    setNumber(1);
    props.setA(0);
    props.setB(6);
  };

  return (
    <>
      <div className="flex justify-end gap-2 pl-4">
        <div className="flex">
          <div className="relative">
            <div
              // onClick={handlePaginationNumber}
              className="relative flex items-center gap-2 px-2"
            >
              <div
                onClick={handleInitialMonthData}
                className="rotate-180 cursor-pointer"
              >
                {arrowRight}
              </div>
              <span>{number}</span>
              <div
                onClick={handleRemainingMonthData}
                className="cursor-pointer"
              >
                {arrowRight}
              </div>
            </div>

            {pageNumber && (
              <ul className="absolute z-10 w-full text-center top-full bg-darkGray2">
                <li>
                  <button onClick={handleInitialMonthData}>1</button>
                </li>
                <li>
                  <button onClick={handleRemainingMonthData}>2</button>
                </li>
              </ul>
            )}
          </div>
          <span className="pl-2">of 2 pages</span>
        </div>

        <div className="flex items-center">
          {/* <Link href="#" className="rotate-180 px-[14px] py-2">
            {arrowRight}
          </Link>
          <Link href="#" className="px-[14px] py-2">
            {arrowRight}
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default DataCollectionTablePagination;
