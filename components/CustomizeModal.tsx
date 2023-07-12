import React, { useState } from "react";
import Modal from "./Modal/Modal";
import CustomizeModalBody from "./CustomizeModalBody";
import closeIcon from "../images/cross.png";
import Image from "next/image";
import { crossSvg } from "@/utils/UtilsSvg";

const CustomizeModal = (props: any) => {
  const [customizeModal, setCustomizeModal] = useState(true);

  const handleCustomizeModal = () => {
    setCustomizeModal(!customizeModal);
  };

  return (
    <>
      {/* <button
        type="button"
        className="flex items-center justify-center w-10 h-10 text-center transition border rounded border-gray text-purple hover:opacity-70"
        onClick={() => handleCustomizeModal()}
      >
        Test customoize modal{" "}
      </button> */}

      {/* {customizeModal && ( */}
      <div
        data-te-modal-init
        className="modal fixed left-0 top-0 z-[100] h-full w-full outline-none text-white bg-primaryBlack/80 flex items-center content-center"
      >
        <div
          data-te-modal-dialog-ref
          className={`pointer-events-none relative translate-[-50px] transition-all duration-300 ease-in-out mx-auto w-full pt-10 max-w-[450px]`}
        >
          <div className="relative flex flex-col w-full p-4 pointer-events-auto bg-darkGray">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center text-xl font-semibold leading-normal text-neutral-400">
                  {props?.header ? props.header : "Customize"}
                </h2>
              </div>

              <button
                type="button"
                className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none bg-red"
                data-te-modal-dismiss
                aria-label="Close"
                onClick={props.closeModal}
              >
                {crossSvg}
              </button>
            </div>

            <div className={`relative flex-auto pt-4`} data-te-modal-body-ref>
              {props?.children}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default CustomizeModal;
