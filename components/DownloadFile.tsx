import React, { useState } from 'react'
import DropFIle from './DropFIle'
import ExcelExport from './ExcelExport'
import uploadImage from "../images/upload-img.png"
import Image from 'next/image'
import downloadImage from "../images/download-img.png"

const DownloadFile = () => {
  const ExcelExportData =
  [{
  "First Name": "Test 1",
  "Last Name": "Test A",
  "Employee code":"001", 
  "Mobile No":"1234567890",
  "DOB": "01-01-1995", 
  "Address": "Address 1",
  },

  { "First Name": "Test 2" ,
  "Last Name":"Test B",
  "Employee code":"002",
  "Mobile No":"8787987898",
  "DOB": "02-02-2000", 
  "Address": "Address 2",
  },

  { "First Name" : "Test 3",
  "Last Name":"Test C",
  "Employee code":"003",
  "Mobile No":"5467678987", 
  "DOB": "03-03-1997",
  "Address": "Address 3",}
  ]
  const [uploadImage , setUploadImage] = useState(true)

  return (
    <div className="grow">   
     <div className="mb-16">
     <p className="mb-5 text-sm font-normal"> Download System configuration in an excel template</p>     
      <ExcelExport excelData={ExcelExportData} fileName={"Excel Export"} />
     </div>

     <div>
       <p className="mb-4 text-sm font-normal">Configure input template</p>     
       <div>
        <p className="text-sm text-[#8D8D8D] mb-2">Upload files</p>
        <p className="pb-4 text-[#8D8D8D] text-xs">Max file size is 500kb. Supported file types are .xsl</p>
       </div>
       <DropFIle className="cursor-pointer" uploadImage={uploadImage}/>
     </div>
    </div>
  )
}

export default DownloadFile
