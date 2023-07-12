import React from "react";
import { useDropzone } from "react-dropzone";
import uploadImg from "../images/upload.png";
import Image from "next/image";
import downloadImage from "../images/download-img.png";

const DropFIle = (props: any) => {
  const maxSize = 2 * 1024 * 1024;
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });
  console.log(acceptedFiles[0]?.size, "setLogo", fileRejections[0]?.errors[0]);
  if (acceptedFiles?.length) {
    props.setLogo(acceptedFiles);
  }
  if (fileRejections[0]?.errors[0]) {
    props.setLogo(fileRejections[0]?.errors);
  }
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      {props.uploadImage === true && (
        <section className="flex items-center px-4 py-2 text-white transition rounded cursor-pointer btn btn-secondary hover:opacity-70 bg-charcoal w-max flexs">
          <div
            {...getRootProps({
              className: "dropzone flex items-center",
            })}
          >
            <input {...getInputProps()} />
            <p className="mb-1 mr-5 !text-white">Upload</p>
            <Image
              className="-rotate-180"
              src={downloadImage}
              alt="upload file"
            />
          </div>
          <aside>
            <ul>{files}</ul>
          </aside>
        </section>
      )}
      {props.uploadImage === false && (
        <section className="container p-3 mt-3 mb-16 border-2 border-dashed cursor-pointer border-gray">
          <div
            {...getRootProps({
              className: "dropzone flex items-center justify-center flex-col",
            })}
          >
            <input {...getInputProps()} />
            <h6 className="mb-1 text-sm text-purple">
              Drag and drop files here or upload
            </h6>
            <Image src={uploadImg} alt="upload file" />
          </div>
          <aside>
            <ul>{files}</ul>
            {fileRejections[0]?.errors[0] && (
              <li className="mt-2 text-danger">
                {fileRejections[0]?.errors[0].message}
              </li>
            )}
          </aside>
        </section>
      )}
    </>
  );
};

export default DropFIle;
