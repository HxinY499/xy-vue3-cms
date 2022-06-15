interface ISelectOption {
  label: string;
  value: any;
}

type ItemType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  [x: string]: any;
  name: any;
  field: string;
  type: ItemType;
  label: string;
  placeHolder?: string;
  rules?: any[];
  options?: ISelectOption[];
  formFieldProps?: any;
  defaultValue?: any;
  isHidden?: boolean;
  style?: any;
}

export interface IForm {
  title?: string;
  formFields?: IFormItem[];
  labelWidth?: string;
  fieldStyle: any;
  colLayout: any;
}
