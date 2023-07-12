export interface SelectDropDownInterface {
  errors?: string | undefined;
  touched?: boolean | undefined;
  as?: string;
  name: string;
  options: string[];
  selectLabel?: string;
  selectClasses?: string | undefined;
  selectParentClasses?: string | undefined;
  selectLabelClasses?: string | undefined;
}
