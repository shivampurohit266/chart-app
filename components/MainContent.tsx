import React from "react";
import CompanyProfile from "./CompanyProfile";

const MainContent = (props: any) => {
  return (
    <>
      <p className="mb-4 text-xl font-medium">
        {/* Please provide the following information to help us better understand
        your company */}
        Crafting Your Solution: Tell us about your business to get tailored
        suggestions
      </p>
      <CompanyProfile
        companyData={props?.companyData}
        setStep={props?.setStep}
        setStepDefault={props?.setStepDefault}
        getCompanyDetails={props?.getCompanyDetails}
      />
    </>
  );
};

export default MainContent;
