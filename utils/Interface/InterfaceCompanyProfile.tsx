import { FormikErrors, FormikTouched } from "formik";

export interface InputInterface {
  isAsterisk?: boolean;
  value?: string | number | undefined;
  errors?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  label: string | undefined;
  placeholder: string;
  name: string;
  type: string;
  htmlFor: string;
  infoText?: string | undefined;
  parentClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  modalFor?: string;
}
