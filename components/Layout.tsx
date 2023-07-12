import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = (props: any) => {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar stepCounter={props.stepCounter} currentStep={props.currentStep} setStep={props.setStep} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
