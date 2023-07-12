import React, { useState } from "react";
const Toggler = (props: any) => {
  //   const [multiLocation, setMultiLocation] = useState("dark");
  //   const handleThemeColor = () => {
  //     if (multiLocation === "light") {
  //       setMultiLocation("dark");
  //       console.log(multiLocation, "it should become black");
  //     } else if (multiLocation === "dark") {
  //       setMultiLocation("light");
  //     }
  //   };
  return (
    <div
      onClick={props.handleOnClick}
      className={`w-16 h-8 rounded-2xl cursor-pointer shadow pt-0.5 mb-6 toggler ${
        props.multiLocation === true ? "bg-purple" : "bg-[#8d8d8d]"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full transition bg-white ${
          props.multiLocation === true ? "ml-[32px] " : "ml-[2px]"
        }`}
      />
    </div>
  );
};

export default Toggler;
