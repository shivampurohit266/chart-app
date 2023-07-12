import Link from "next/link";
import React from "react";

const breadCrumbsItems = ["Environment", "Energy"];
const BreadCrumbs = (props: any) => {
  return (
    <div className="flex">
      <Link href="/dashboard">
        <div className="mb-4 text-sm capitalize text-purple">
          Home
          <span className="text-white"> &nbsp;/ &nbsp; </span>
        </div>
      </Link>
      <div className="mb-4 text-sm capitalize text-purple">
        {props?.subThemeName[0]?.themeName}
        <span className="text-white"> &nbsp;/ &nbsp; </span>
      </div>
      <div className="mb-4 text-sm capitalize text-purple">
        {props?.subThemeName[0]?.subthemeName}
        {/* <span className="text-white"> &nbsp;/ &nbsp; </span> */}
      </div>
      {/* {breadCrumbsItems.map((items: any, index: number) => {
        return (
          <div key={index} className="mb-4 text-sm capitalize text-purple">
            {items}
            <span className="text-white"> &nbsp;/ &nbsp; </span>
          </div>
        );
      })} */}
    </div>
  );
};

export default BreadCrumbs;
