import * as Yup from "yup";

export const companyProfileValidation = Yup.object().shape({
  companyName: Yup.string().required("Please enter a valid entity name"),
  address: Yup.string().required("Please enter a valid entity address"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .length(6)
    .matches(/^[0-9]{6}/)
    .required("Postal/Zip code is required"),
  country: Yup.string().required("Country name is required"),
  gstNumber: Yup.string(),
});
