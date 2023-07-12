import { arrowLeft, downloadSvg } from "@/utils/UtilsSvg";
import { useState } from "react";
import BasicAccess from "./BasicAccess";


const AddUser = () => {

  const [basicAccess , setBasicAccess] = useState(false)

  const handleAccess=()=>{
    setBasicAccess(!basicAccess)
  }

  return (
    <>
      <div className="ml-[auto] w-[calc(100%-240px)] overflow-x-hidden max-h-[calc(100vh-44px)] pt-4 pb-7 text-white px-5 bg-primaryBlack fixed right-0 overflow-y-auto h-full">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <button>{arrowLeft}</button>
            <h2 className="ml-2 font-semibold ">Add User</h2>
          </div>
          <div className="flex items-center">
            <button className="h-10 px-4 py-2.5 text-white my-1.5 mr-1.5 btn btn-secondary flex items-center hover:opacity-70 transition rounded bg-charcoal">
              cancel
            </button>
            <button className="h-10 px-4 py-2.5 mr-3 text-sm font-medium text-center text-white rounded bg-purple hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </div>
        <div className="w-5/6 mt-10 h-5/6">
          <h3 className="pl-4 font-light leading-8 border-b-2 border-charcoal">
            User Details
          </h3>

          <div className="flex">
            <div className="w-1/3 mt-10 mr-7">
              <label className="block text-sm font-medium leading-6 text-gray">
                Name of the user
              </label>
              <div className="relative mt-2 shadow-sm ">
                <input
                  type="text"
                  name="price"
                  className="block w-full  border-b-2 border-charcoal py-1.5 pl-4  text-gray-900  placeholder:text-gray-400 focus:ring-1 placeholder:text-xs   sm:text-sm sm:leading-6 bg-secondaryBlack"
                  placeholder="Input name of the user"
                />
              </div>
            </div>
            <div className="w-1/3 mt-10">
              <label className="block text-sm font-medium leading-6 text-gray">
                Department
              </label>
              <div className="relative mt-2 shadow-sm ">
                <input
                  type="text"
                  name="price"
                  className="block w-full  border-b-2 border-charcoal py-1.5 pl-4  text-gray-900  placeholder:text-gray-400 placeholder:text-xs focus:ring-1  sm:text-sm sm:leading-6 bg-secondaryBlack"
                  placeholder="Input department the user work"
                />
              </div>
            </div>
          </div>
          <div className="w-5/12 mt-10">
            <label className="block text-sm font-medium leading-6 text-gray">
              Email ID of the user
            </label>
            <div className="relative mt-2 shadow-sm ">
              <input
                type="text"
                name="price"
                className="block w-full  border-b-2 border-charcoal py-1.5 pl-4  text-gray-900  placeholder:text-gray-400 placeholder:text-xs focus:ring-1  sm:text-sm sm:leading-6 bg-secondaryBlack"
                placeholder="Input Email id for which invite will be sent"
              />
            </div>
            <div
              className="absolute w-full text-xs text-neutral-500 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary"
              data-te-input-helper-ref
            >
              Email ID would be the user name for the user
            </div>
            <div className="mt-10">
              <p className="mb-2 text-sm font-extralight text-neutral-500 " >User type</p>
              <div className="flex items-center mb-1">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm font-thin text-gray-100 dark:text-gray-600">
                  Standard
                </label>
              </div>
              <div className="flex items-center mb-1">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm font-thin text-gray-100 dark:text-gray-600">
                  Admin
                </label>
              </div>
              <div className="flex items-center mb-1">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 "
                />
                <label className="ml-2 text-sm font-thin dark:text-gray ">
                  Super Admin
                </label>
              </div>
            </div>
            
          </div>
          <div className="flex justify-between w-full mt-8">
              <p className="text-xs text-gray">Expand/Collapse all the below fields</p>
              <div className="flex">
              <button className="flex items-center justify-between px-3 py-1 mr-2 text-sm border w-28 border-charcoal">Extract all {downloadSvg}</button>
                <button className="flex items-center justify-between px-3 py-1 mr-2 text-sm border w-28 border-charcoal">Collapse all {downloadSvg}</button>
                
              </div>

            </div>
            
        </div>
        <div className="leading-4 border-b-2 border-charcoal">
              <button onClick={handleAccess} className="flex items-center justify-between w-24 mb-2 text-sm font-bold">{downloadSvg} Basic access</button>
            </div>
            
            {basicAccess && <BasicAccess/>  }
        
      </div>
    </>
  );
};

export default AddUser;
