import React from "react";
import { callIcon, manageUserBig } from "@/utils/UtilsSvg";

const WelcomeMsg = (props: any) => {
  return (
    <div className=" flex items-center ml-[auto] w-[calc(100%-240px)]  max-h-[calc(100vh-48px)] text-white bg-primaryBlack fixed right-0 overflow-y-auto h-full">
      <div className="flex flex-col w-3/4 m-auto">
        <div className="flex items-center justify-center flex-shrink-0 p-4 text-center rounded-t-md ">
          <span>
            <h2 className="text-3xl font-black leading-normal text-white leading-2 ">
              Welcome, [Name]!{" "}
            </h2>
            <h4 className="text-base font-bold">
              Embark on Your Impact Creation Journey!
            </h4>
          </span>
        </div>

        <div className="relative p-4 text-center">
          <p className="text-base ">
            It looks like you have a clean canvas here, ready to capture your
            data and transform it into impactful visualizations. <br />
            <br /> To get started, Click this navigation (Theme name) or here,
            to begin entering your functional data, in order to create
            meaningful visualization in the dashboard. <br />
            <br /> We are one ring away! Our team is here to assist you every
            step of the way. If you need any help, simply click on the phone
            icon here to request a callback from our dedicated support team.{" "}
            <br />
            <br /> Let&apos;s make your data come alive and drive impactful
            insights together!
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 px-16 pt-6 rounded-b-md">
          <div className="flex flex-col items-center justify-center w-2/4 p-6 border gap-y-4 border-purple">
            <div>{manageUserBig}</div>
            <div className="text-center">
              Click this navigation (Theme name) or here, to begin entering your
              functional data,{" "}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-2/4 p-6 border gap-y-4 border-purple">
            <div>{callIcon}</div>
            <div className="text-center">
              Click this navigation (Theme name) or here, to begin entering your
              functional data,{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMsg;
