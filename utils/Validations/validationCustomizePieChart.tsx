import * as Yup from "yup";

export const validationCustomizePieChart = Yup.object().shape({
    chartLabel: Yup.string().required("Please enter chart name"),
    innerChartNameOne: Yup.string().required("Please enter name"),
    innerChartNameSecond: Yup.string().required("Please enter name"),
    outerChartNameOne: Yup.string().required("Please enter name"),
    outerChartNameSecond: Yup.string().required("Please enter name"),
});