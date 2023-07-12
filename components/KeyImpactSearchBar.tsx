/* eslint-disable react-hooks/exhaustive-deps */
import { plusIconSvg, searchIcon } from "@/utils/UtilsSvg";
import { Form, Formik } from "formik";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import AddMetricModal from "./AddMetricModal";
import ThemeDropDown from "./ThemeDropDown";
import SubThemeDropDown from "./SubThemeDropDown";
import EditDeleteBtn from "./EditDeleteBtn";
import Modal from "./Modal/Modal";
import { deleteData } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";

// test the changed icon
import editIconPurple from "../images/editPurple.svg";
import deleteIconPurple from "../images/deletePurple.svg";

const KeyImpactSearchBar = (props: any) => {
  const {
    selectedTheme,
    selectedSubTheme,
    setSelectedTheme,
    setSelectedSubTheme,
  } = props;
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);
  const [KIMSuggestionData, setKIMSuggestionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const handleMatrixModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (KIMSuggestionData && KIMSuggestionData.length) {
      props?.setKIMSuggestionSearch(KIMSuggestionData);
    } else {
      props?.setKIMSuggestionSearch([]);
    }
  }, [KIMSuggestionData]);
  useEffect(() => {
    setSearch("");
    handleKimSearch("");
  }, [props?.KIMSuggestion]);

  const newArray = props?.KIMSuggestion?.filter(function (el: any) {
    return el.selected === true;
  });

  const handleKimSearch = (searchKIM: string) => {
    setSearch(searchKIM);
    const newArr: any = [...props?.KIMSuggestion];
    const kimArray = newArr?.filter((kim: any) => {
      if (searchKIM) {
        return kim?.metric?.toLowerCase().includes(searchKIM?.toLowerCase());
      } else {
        return kim;
      }
    });
    setKIMSuggestionData(kimArray);
  };

  const handleMatrixClose = () => {
    setShowModal(false);
    props.getKIMSuggestion();
  };

  const handleEditKim = () => {
    handleMatrixModal();
  };
  const handleDeleteKim = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const handleDeleteYes = async () => {
    await deleteData(`/company/kim/${newArray[0]?.kimId}`, token)
      .then(function (resp) {
        const kimData = resp?.data;
        if (kimData) {
          Toast.showToast(ToastType.SUCCESS, kimData?.message);
          setDeleteModal(false);
          props.getKIMSuggestion();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
        setDeleteModal(false);
      });
  };
  return (
    <div className="key-impact-search relative flex top-0 z-[6] bg-darkGray max-h-11 h-full sticky">
      <div className="relative top-0 right-0 text-gray-600 w-max grow h-max">
        <input
          className="px-5 pr-16 bg-transparent border-b border-b-[#868686] focus:outline-none h-[44px] text-base w-full"
          type="search"
          name="search"
          placeholder="Search"
          autoFocus
          defaultValue={search}
          key={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleKimSearch(e.target.value);
          }}
        />
        <button type="submit" className="absolute top-0 bottom-0 right-0 mr-4">
          {searchIcon}
        </button>
      </div>

      <Formik
        initialValues={{ environmental: "", Subthemes: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue }) => (
          <div className="flex grow">
            {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
            <ThemeDropDown
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              setSelectedSubTheme={setSelectedSubTheme}
              selectHeight={"h-11"}
            />
            <SubThemeDropDown
              selectedTheme={selectedTheme}
              selectedSubTheme={selectedSubTheme}
              setSelectedSubTheme={setSelectedSubTheme}
              selectHeight={"h-11"}
            />
          </div>
        )}
      </Formik>
      {newArray?.length ? (
        <div className="border-b border-b-gray bg-darkGray mt-[2px] ">
          <div className="px-3 py-1 w-[136px] bg-purple rounded mb-1 mr-1 h-10">
            <EditDeleteBtn
              handleEdit={handleEditKim}
              handleDelete={handleDeleteKim}
              editIcon={editIconPurple}
              deleteIcon={deleteIconPurple}
              bgColor="!bg-white"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center border-b border-b-gray bg-darkGray">
          <button
            type="submit"
            className="flex items-center px-3 py-2 my-1 mr-1 text-white transition rounded bg-purple btn btn-secondary hover:opacity-70 plus-icon-white add-metric-btn"
            onClick={handleMatrixModal}
          >
            Add metric
            <span className="ml-6"> {plusIconSvg}</span>
          </button>
        </div>
      )}

      {showModal && (
        <AddMetricModal
          selectedTheme={selectedTheme}
          selectedSubTheme={selectedSubTheme}
          KIMSuggestion={props.KIMSuggestion}
          setKIMSuggestion={props.setKIMSuggestion}
          closeModal={handleMatrixClose}
          kimId={newArray[0]?.kimId}
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
          closeVariableModal={handleCloseDeleteModal}
          onYes={handleDeleteYes}
        >
          Are you sure want to delete this KIM?
        </Modal>
      )}
    </div>
  );
};

export default KeyImpactSearchBar;
