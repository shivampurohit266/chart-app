import React from "react";
import checkIcon from "../images/check.svg";
import deleteIcon from "../images/deleteWhite.svg";
import Image from "next/image";
import { InputEditDeleteBtn } from "@/utils/Interface/InterfaceInputEditDeletBtn";

const EditDeleteBtn = (props: InputEditDeleteBtn) => {
  return (
    <div className={`z-10 flex h-5 justify-around ${props.className}`}>
      {props.handleEdit && (
        <div
          onClick={props.handleEdit}
          className={`rounded-full ${
            props.bgColor ? props.bgColor : "bg-purple"
          } translate h-8 w-8 mx-1 relative cursor-pointer hover:opacity-70 transition`}
        >
          <Image
            className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
            src={props?.editIcon ? props?.editIcon : checkIcon}
            alt=""
          />
        </div>
      )}

      <div
        onClick={props.handleDelete}
        className={`rounded-full ${
          props.bgColor ? props.bgColor : "bg-purple"
        } translate h-8 w-8 mx-1 relative cursor-pointer hover:opacity-70 transition`}
      >
        <Image
          className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
          src={props?.deleteIcon ? props?.deleteIcon : deleteIcon}
          alt=""
        />
      </div>
    </div>
  );
};

export default EditDeleteBtn;
