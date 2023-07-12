import Image from "next/image";
import React from "react";

import crossIcon from "../images/cross.png";
import arrowRight from "../images/arrow-right.png";
import arrowLeft from "../images/arrow-left-icon.png";
import { ButtonInterface } from "@/utils/Interface/InterfaceButton";

const Button = (props: ButtonInterface) => {
  return (
    <div
      className={`flex z-10 justify-end gap-4 form-group ${
        props.marginProperty ? `${props.marginProperty}` : `mb-6`
      }`}
    >
      <button
        disabled={props?.disabled}
        type={props.type}
        onClick={props.changeStep}
        className={`px-4 py-2.5 text-white btn btn-secondary flex items-center hover:opacity-70 transition rounded ${props.classProperty} `}
      >
        {props.type === "reset" && props.value === "previous" && (
          <Image className="mr-2" src={arrowLeft} alt="" />
        )}
        {props.text}
        {props.type === "button" && props.iconName && (
          <Image
            className={props.imageClass}
            src={
              props?.iconName === "left"
                ? arrowLeft
                : props?.iconName === "right"
                ? arrowRight
                : crossIcon
            }
            alt=""
          />
        )}
        {props.type === "submit" && (
          <Image className={props.imageClass} src={arrowRight} alt="" />
        )}
        {props.type === "reset" && props.value === "cancel" && (
          <Image className={props.imageClass} src={crossIcon} alt="" />
        )}
      </button>
    </div>
  );
};

export default Button;
