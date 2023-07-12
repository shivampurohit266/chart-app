import React, { useContext, useState } from "react";
import {
  alpha,
  deleteIconSvg,
  editIcon,
  plusIconSvg,
  searchIcon,
  closeIconSvg,
  arrowDown,
  arrowRight,
} from "@/utils/UtilsSvg";
import Modal from "./Modal/Modal";
import { deleteData } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";

const SearchBar = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [variableModal, setVariableModal] = useState(false);
  const [editVariableModal, setEditVariableModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [constantModal, setConstantModal] = useState(false);
  const [editConstantModal, setEditConstantModal] = useState(false);

  const handleVariableModal = () => {
    setVariableModal(!variableModal);
    props?.getData();
  };

  const handleEditVariableModal = () => {
    setEditVariableModal(!editVariableModal);
    props?.getData();
  };
  const handleDeleteButton = () => {
    setDeleteModal(!deleteModal);
  };

  const handleConstantModal = () => {
    setConstantModal(!constantModal);
    props?.getData();
  };
  const handleEditConstantModal = () => {
    setEditConstantModal(!editConstantModal);
    props?.getData();
  };

  const handleDeleteSelectedItem = () => {
    deleteData(
      `/company/${props?.searchFor}/${props?.selectedItem?._id}`,
      token
    )
      .then(function (resp) {
        const data = resp?.data;
        if (data?.status === "SUCCESS") {
          Toast.showToast(
            ToastType.SUCCESS,
            `The ${props?.searchFor} has been successfully deleted.`
          );
          setDeleteModal(!deleteModal);
          props?.getData();
          props.setSelectedItem("");
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleSearchInput = (input: string) => {
    props.setSearchData(input);
  };
  const handleSearchButton = () => {
    setShowSearchInput(true);
  };

  return (
    <>
      {showSearchInput ? (
        <div className="relative top-0 right-0 flex items-center justify-center w-full h-10 text-gray-600 border-b border-b-[#868686] grow ">
          <input
            className="min-h-10 px-5 pr-16 bg-transparent focus:outline-none h-[41px] text-base w-full"
            type="search"
            autoFocus
            name="search"
            onChange={(e: any) => handleSearchInput(e.target.value)}
          />
          <div
            onClick={() => {
              setShowSearchInput(false);
              props.setSearchData("");
            }}
            className="absolute top-0 right-0 mr-4 flex h-[inherit] items-center cursor-pointer"
          >
            {closeIconSvg}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-b-[#868686]">
          <div className="items-start px-2 py-2 font-medium text-whiteOpacity">
            <button
              onClick={() => props?.setShowConstant(!props?.showConstant)}
              className="mr-2"
            >
              {props.searchFor === "Variable" &&
                (!props?.showConstant ? arrowDown : arrowRight)}
              {props.searchFor === "Constant" &&
                (props?.showConstant ? arrowDown : arrowRight)}
            </button>
            {props.searchFor}
          </div>
          <div className="flex items-center">
            <div
              onClick={() => {
                handleSearchButton();
              }}
              className={`px-2 cursor-pointer`}
            >
              {searchIcon}
            </div>
            <div
              onClick={props.handleAlphaButton}
              className={`px-2 pt-2 cursor-pointer`}
            >
              {alpha}
            </div>
            <div
              className={`px-2 white-svg cursor-pointer`}
              onClick={() => {
                props.searchFor === "Constant"
                  ? handleConstantModal()
                  : handleVariableModal();
              }}
            >
              {plusIconSvg}
            </div>
            {props.selectedItem && (
              <>
                <div
                  className={`px-2 cursor-pointer ${props.editOption}`}
                  onClick={() => {
                    props.searchFor === "Constant"
                      ? handleEditConstantModal()
                      : handleEditVariableModal();
                  }}
                >
                  {editIcon}
                </div>
                <div
                  className={`px-2 cursor-pointer white-svg ${props.deleteOption}`}
                  onClick={handleDeleteButton}
                >
                  {deleteIconSvg}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {variableModal && (
        <Modal
          isAsterisk={true}
          modalFor="variable"
          ModalHeading={"Add Variable"}
          paraClass={"hidden"}
          modalWidth={"max-w-[250px] !w-full"}
          labelFirst={"Name of the variable"}
          labelSecond={"Unit of the variable"}
          closeVariableModal={handleVariableModal}
        />
      )}

      {editVariableModal && (
        <Modal
          isAsterisk={true}
          modalFor="variable"
          ModalHeading={"Edit Variable"}
          paraClass={"hidden"}
          modalWidth={"max-w-[250px] !w-full"}
          labelFirst={"Name of the variable"}
          labelSecond={"Unit of the variable"}
          closeVariableModal={handleEditVariableModal}
          selectedItem={props?.selectedItem}
          setSelectedItem={props?.setSelectedItem}
        />
      )}
      {constantModal && (
        <Modal
          isAsterisk={true}
          ModalHeading={"Add Constant"}
          paraClass={"hidden"}
          modalWidth={"max-w-[250px] !w-full"}
          labelFirst={"Name of the constant"}
          labelSecond={"Unit of the constant"}
          labelThird={"Value of the Constant"}
          closeVariableModal={handleConstantModal}
          modalFor="constants"
        />
      )}

      {editConstantModal && (
        <Modal
          isAsterisk={true}
          ModalHeading={"Edit Constant"}
          paraClass={"hidden"}
          modalWidth={"max-w-[250px] !w-full"}
          labelFirst={"Name of the constant"}
          labelSecond={"Unit of the variable"}
          labelThird={"Value of the Constant"}
          modalFor="constants"
          closeVariableModal={handleEditConstantModal}
          selectedItem={props?.selectedItem}
          setSelectedItem={props?.setSelectedItem}
        />
      )}

      {deleteModal && (
        <Modal
          ModalHeading={"Warning"}
          headingImageType={"warning"}
          paraClass={"show my-7"}
          modalWidth={"max-w-[646px]"}
          formClass={"hidden"}
          showSeparateBtn={"show"}
          btnSecondText={"Yes, Delete"}
          closeVariableModal={handleDeleteButton}
          onYes={handleDeleteSelectedItem}
        >
          By deleting the input{" "}
          {props.searchFor === "Constant" ? "constant" : "variable"} all of the
          associated data including metric formula calculation and import setup
          will be deleted. This action cannot be undone. Are you sure you want
          to proceed?
        </Modal>
      )}
    </>
  );
};

export default SearchBar;
