enum ButtonTypes {
  "button",
  "submit",
  "reset",
  undefined,
}
export interface ButtonInterface {
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  iconName?: "right" | "left" | "cross";
  marginProperty?: string;
  classProperty?: string;
  imageSrc?: string | undefined;
  imageClass: string;
  text: string;
  eventforBtn?: string | undefined;
  value?: string;
  changeStep?: () => void;
}
