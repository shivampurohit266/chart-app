import { ReactNode } from "react";

export interface ModalInterface {
  isAsterisk?: boolean;
  ModalHeading: string;
  headingImageType?: string;
  para?: string;
  paraClass?: string;
  labelFirst?: string;
  labelSecond?: string;
  labelThird?: string;
  formClass?: string;
  modalWidth?: string;
  showSeparateBtn?: string;
  btnSecondText?: string;
  children?: ReactNode;
  modalFor?: string;
  closeVariableModal?: any;
  selectedItem?: any;
  setSelectedItem?: any;
  onYes?: () => void;
}
