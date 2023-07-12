import React from 'react'
import UserContentRow from './UserContentRow'

const UserContentTable = () => {
    
  return (
    <>
    <div className="mb-0.5 bg-darkGray ">
      <div className="w-full text-sm text-left text-gray-700">
        <div className="text-base flex items-center  leading-5 text-[#a4a6a9] bg-graySecond">
        <div className="flex items-center justify-center w-10 h-full pl-4 graySecond">
            <input
              id={`checkbox-table-search`}
              type="checkbox"
              className="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded styled-checkbox focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor={`checkbox-table-search`}>
              {/* {props.labelContent} */}
            </label>
          </div>
          <div className="grid w-11/12 grid-cols-5 ml-3 h-14 bg-graySecond">
          
         
            <div className="flex items-center px-3 py-3">
              Name
            </div>
            <div className="flex items-center px-3 py-3">
              Email
            </div>
            <div className="flex items-center px-3 py-3">
              User type
            </div>
            <div className="flex items-center px-3 py-3">Department</div>
            <div className="flex items-center px-3 py-3">Recent Login</div>
          </div>
        </div>
        
      </div>
    </div>
    <UserContentRow />
    
    </>
    
  )
}

export default UserContentTable
