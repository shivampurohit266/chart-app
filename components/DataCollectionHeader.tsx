import React, { useState } from "react";
import Button from "./Button";

const moreOptionArray = ["Import history"];

const DataCollectionHeader = () => {
  const [state, setState] = useState(false);
  const handleState = () => {
    setState(!state);
  };
  return (
    <div className="flex justify-between">
      <div>
        <h4>Unleash the Power of Data: Every input matters...</h4>
        <h6 className="text-sm text-[#C6C6C6]">
          User edits are highlighted in different colour, verify the updates
          before clicking &apos;Save&apos; button
        </h6>
      </div>
      <div className="flex">
        <Button
          type={"submit"}
          marginProperty={"mb-0 m"}
          classProperty={"bg-purple"}
          imageClass="hidden"
          text={"Import"}
        />
        <div className="relative black-svg">
          <button
            className="border border-[#C6C6C6] p-4 ml-3"
            onClick={handleState}
          >
            <svg
              width="2"
              height="12"
              viewBox="0 0 2 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.997584 11.3332C0.77694 11.3332 0.58884 11.2546 0.433284 11.0975C0.277729 10.9403 0.199951 10.7515 0.199951 10.5308C0.199951 10.3102 0.278518 10.1221 0.435651 9.9665C0.592773 9.81095 0.781662 9.73317 1.00232 9.73317C1.22296 9.73317 1.41106 9.81174 1.56662 9.96887C1.72217 10.126 1.79995 10.3149 1.79995 10.5355C1.79995 10.7562 1.72138 10.9443 1.56425 11.0998C1.40713 11.2554 1.21824 11.3332 0.997584 11.3332ZM0.997584 6.79984C0.77694 6.79984 0.58884 6.72127 0.433284 6.56414C0.277729 6.40701 0.199951 6.21813 0.199951 5.99747C0.199951 5.77683 0.278518 5.58873 0.435651 5.43317C0.592773 5.27761 0.781662 5.19984 1.00232 5.19984C1.22296 5.19984 1.41106 5.2784 1.56662 5.43554C1.72217 5.59266 1.79995 5.78155 1.79995 6.0022C1.79995 6.22285 1.72138 6.41095 1.56425 6.5665C1.40713 6.72206 1.21824 6.79984 0.997584 6.79984ZM0.997584 2.2665C0.77694 2.2665 0.58884 2.18794 0.433284 2.0308C0.277729 1.87368 0.199951 1.68479 0.199951 1.46414C0.199951 1.24349 0.278518 1.05539 0.435651 0.899837C0.592773 0.744282 0.781662 0.666504 1.00232 0.666504C1.22296 0.666504 1.41106 0.745071 1.56662 0.902204C1.72217 1.05933 1.79995 1.24821 1.79995 1.46887C1.79995 1.68951 1.72138 1.87761 1.56425 2.03317C1.40713 2.18873 1.21824 2.2665 0.997584 2.2665Z"
                fill="white"
              />
            </svg>
          </button>
          {state && (
            <div className="absolute right-0 bg-charcoal top-[65px] min-w-[160px] w-full z-[5] ">
              {moreOptionArray.map((value, index) => {
                return (
                  <ul key={index}>
                    <li className="p-4 text-sm !text-white cursor-pointer">
                      {value}
                    </li>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCollectionHeader;
