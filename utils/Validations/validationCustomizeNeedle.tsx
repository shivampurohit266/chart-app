import * as Yup from "yup";

export const validationCustomizeNeedle = Yup.object().shape({
    chartLabel: Yup.string().required("Please enter chart name"),
    bad: Yup.string().required("Please enter bad value"),
    average: Yup.string().required("Please enter avrage value"),
    good: Yup.string().required("Please enter good value"),
});