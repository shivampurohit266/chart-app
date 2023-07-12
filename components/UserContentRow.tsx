import React, { useState } from "react";

const UserContentRow = () => {
  const [rowFocus , setRowFocus] = useState(false)

  const handleClick=()=>{
    console.log("??????????")
    setRowFocus(true)

  }

  
  return (
    <>
      <button onClick={handleClick} className="border-b border-[#868686] w-full focus:ring-2 focus:outline-none focus:border-none focus:ring-purple-300 md:mr-0 dark:bg-purple-600  dark:focus:ring-purple-800 flex items-center  leading-[20px] text-[#a4a6a9] bg-secondaryBlack">
      <div className="flex items-center justify-center w-10 h-full pl-4 secondaryBlack">
            <input
              id={`checkbox-table-search`}
              type="checkbox"
             
             
              className="w-4 h-5 text-blue-600 border-gray-300 rounded bg-secondaryBlack-100 styled-checkbox focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor={`checkbox-table-search`}>
            </label>
          </div>
        <div className="grid w-11/12 grid-cols-5 ml-3 text-sm text-white h-14 bg-secondaryBlack">
          <div className="flex items-center px-3 py-3">Vikram</div>
          <div className="flex items-center px-3 py-3">vikram@gmail.com</div>
          <div className="flex items-center px-3 py-3">Admin</div>
          <div className="flex items-center px-3 py-3">HR</div>
          <div className="flex items-center px-3 py-3">Feb 20, 2023 14:10</div>
        </div>
      </button>

      
      
      
    </>
  );
};

export default UserContentRow;
