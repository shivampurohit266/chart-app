export interface MatrxiTableRowInterface {
  labelContent: string;
  selected: boolean | undefined;
  metricName: string;
  metricUnit: string;
  metricType: string;
  metricMultiLocation: string;
  metricMultiProduct: string;
  inputValue: number;
  changeKIMCheck: (e: any, kim: any) => void;
}
