/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ThemesSubthemesTree from "./ThemesSubthemesTree";
import Button from "./Button";

const ThemesSubthemes = (props: any) => {
  useEffect(() => {
    props?.getCompanyDetails();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <p className="text-xl font-medium">
        {/* Configure Themes & SubThemes by selecting the relevant node. */}
        Construct Your Framework: Structure your Impact Framework into Themes &
        Sub Themes
      </p>
      <p className="text-sm font-normal">
        Organize your impact framework by creating up to 6 themes and up to 6
        sub-themes under each theme.
      </p>

      <ThemesSubthemesTree
        getCompanyDetails={props?.getCompanyDetails}
        setStep={props.setStep}
        companyData={props.companyData}
        setStepDefault={props?.setStepDefault}
        stepDefault={props?.stepDefault}
      />
    </div>
  );
};

export default ThemesSubthemes;
