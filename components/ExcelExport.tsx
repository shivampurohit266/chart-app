import React from "react";
import FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import Image from "next/image";
import downloadImage from "../images/download-img.png"
const ExcelExport = (props:any) => {
 
  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
   const fileExtension = ".xlsx";



  const exportToExcel = async () => {
  const ws = XLSX.utils.json_to_sheet (props.excelData);
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }; 
  const excelBuffer= XLSX.write(wb, {bookType: 'xlsx', type: 'array' });
   const data = new Blob ([excelBuffer], { type: fileType });
    FileSaver.saveAs (data, props.fileName + fileExtension); }

return(
  <>
    <div>
    <button className="flex items-center px-4 py-2 text-white transition rounded btn btn-secondary hover:opacity-70 bg-charcoal"  
     onClick={(e) => exportToExcel()}
      >Download
      <Image className="ml-5" src={downloadImage} alt=""/>
      </button>
    </div>
  </>
)
}

export default ExcelExport
