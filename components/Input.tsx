import { InputInterface } from "@/utils/Interface/InterfaceCompanyProfile";
import { ErrorMessage, Field } from "formik";
import React from "react";

const Input = (props: InputInterface) => {
  return (
    <div
      className={`form-group ${
        props.parentClassName ? props.parentClassName : "mb-6 "
      }`}
    >
      <label
        className={`flex pb-2 text-sm font-font-semibold text-gray ${props.labelClassName}`}
        htmlFor={props.htmlFor}
      >
        {props.label}
        {props?.isAsterisk && <span className="text-red-500">*</span>}
      </label>

      <Field
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        className={
          `py-2 px-4 form-control text-sm bg-secondaryBlack border-1 border border-transparent border-t-transparent border-b-gray focus:outline-none focus:border-purple ${
            props.inputClassName ? props.inputClassName : "w-full "
          }        
          ` + (props.errors && props.touched ? " is-invalid" : "")
        }
      />
      {props.infoText && <span className="text-xs">{props.infoText}</span>}
      <ErrorMessage
        name={props.name}
        component="div"
        className="invalid-feedback"
      />
    </div>
  );
};

export default Input;
