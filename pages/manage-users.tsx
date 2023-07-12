import Layout from "@/components/Layout";
import React, { useState } from "react";
import plusIcon from "./../images/plus-icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchIcon } from "../utils/UtilsSvg";
import UserContentTable from "@/components/UserContentTable";
import AddUser from "@/components/AddUser";
import UserContentRow from "@/components/UserContentRow";


const ManageUsers = () => {
  const [addUser, setAddUser] = useState(false);
  const token = localStorage.getItem("authToken");
  const { push } = useRouter();
  if (!token) {
    push("/");
  }
  const handleAddUser = () => {
    setAddUser(!addUser);
    console.log("??????????");
  };
  return (
    <div>
      <Layout>
        <div className="ml-[auto] w-[calc(100%-240px)] max-h-[calc(100vh-48px)] pt-4 pb-7 text-white px-5 bg-primaryBlack fixed right-0 overflow-y-auto h-full">
          <h2 className="mt-2 font-semibold">Manage users</h2>

          <nav className="left-0 z-20 w-full h-12 mt-12 shadow-md matrix-row bg-secondaryBlack dark:bg-gray-900 ">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-2 mx-auto mb-1">
              <input className="self-center w-5/6 h-10 px-2 bg-secondaryBlack font-semiBold text-medium whitespace-nowrap dark:text-white focus:outline-none" />

              <button type="submit" className="w-8 h-10 bg-secondaryBlack">
                {searchIcon}
              </button>

              {/* <div className="flex md:order-2"> */}
              <button
                onClick={handleAddUser}
                type="button"
                className="rounded-md h-10  flex items-center justify-between px-4 py-2.5 mr-3 text-sm font-medium text-center text-white rounded-sm bg-purple   md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add user
                <span className="pl-2.5">
                  {" "}
                  <Image src={plusIcon} alt="" />
                </span>
              </button>
              {/* </div> */}
            </div>
          </nav>
          <UserContentTable />
        </div>
      </Layout>
      {addUser && <AddUser/>}
     
    </div>
  );
};

export default ManageUsers;
