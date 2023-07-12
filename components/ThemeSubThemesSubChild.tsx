import React, { useContext, useState } from "react";

import ThemesSubThemeChildrens from "./ThemesSubThemeChildrens";
import { plusIcon, socialIcons } from "@/utils/UtilsSvg";
import {
  SubThemeArr,
  ThemeArr,
  TreeInput,
} from "@/utils/Interface/InterfaceTreeInput";
import EditDeleteBtn from "./EditDeleteBtn";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import Button from "./Button";
import CustomizeModal from "./CustomizeModal";

const ThemeSubThemesSubChild = (props: TreeInput) => {
  const Toast = useContext(ToastContext);

  const handleThemeInputClick = (id: any) => {
    if (props.inputChange.isSubThemeChanged === true) {
      props.setShowSubThemeWarning(true);
    } else {
      const isValueChanged =
        props?.inputChange.id !== id &&
        props?.inputChange.isThemeChanged === true;

      if (isValueChanged) {
        props.setShowThemeWarning(true);
      } else {
        const inputChangeData = {
          index: props?.inputChange.index,
          id: props?.inputChange.id,
          isThemeChanged: props?.inputChange.isThemeChanged,
          isSubThemeChanged: props?.inputChange.isSubThemeChanged,
          themeName: props?.defaultValue,
          subThemeName: props?.inputChange.subThemeName,
        };
        if (props.setInputChange) {
          props?.setInputChange(inputChangeData);
        }
      }
      props.setShowThemeBtn(props.themeId);
      props?.setShowSubThemeBtn("");
    }
  };

  const handleThemeInputChange = (e: any) => {
    if (props?.defaultValue !== e.target.value) {
      const inputChangeData = {
        index: props?.index,
        id: props.themeId,
        isThemeChanged: true,
        isSubThemeChanged: props.inputChange.isSubThemeChanged,
        themeName: props.inputChange?.themeName,
        subThemeName: props.inputChange?.subThemeName,
      };
      if (props.setInputChange) {
        props?.setInputChange(inputChangeData);
      }
    }
    props.setThemeName(e.target.value);
  };

  const handleDeleteTheme = () => {
    const subthmArr = props.subThemeArrayAll.filter(function (el: SubThemeArr) {
      return el.themeId != props.themeId;
    });
    const themeArr = props.themeArrAll.filter(function (el: ThemeArr) {
      return el.themeId != props.themeId;
    });
    props.setThemeArray(themeArr);
    props.setSubThemeArray(subthmArr);
  };

  const handleThemePlusClick = () => {
    if (props.inputChange.isThemeChanged === true) {
      props.setShowThemeWarning(true);
    } else if (props.inputChange.isSubThemeChanged === true) {
      props.setShowSubThemeWarning(true);
    } else {
      const id = `dfs${Math.random()}fdff${Math.random()}`;
      const subTheme: SubThemeArr = {
        themeId: props.themeId,
        subthemeName: `New sub-theme ${props?.subThemeArrChilde?.length + 1}`,
        metricId: [],
        subthemeId: id,
        id: "",
      };
      if (props?.subThemeArrChilde?.length < 6) {
        props.setSubThemeArray([...props.subThemeArrayAll, subTheme]);
      } else {
        Toast.showToast(
          ToastType.ERROR,
          "Error:Maximum of 6 subthemes for each theme can be added"
        );
      }
      props.setShowThemeBtn("");
    }
  };
  const handleSubThemeInputSave = () => {
    if (props.subThemeName) {
      const newSubThemes = props.subThemeArrayAll.map(
        (subTheme: SubThemeArr) => {
          if (
            subTheme.subthemeName === props?.showSubThemeBtn &&
            subTheme.subthemeId === props.inputChange.id
          ) {
            return { ...subTheme, subthemeName: props.subThemeName };
          }
          return subTheme;
        }
      );
      props.setSubThemeArray(newSubThemes);
      props.setSubThemeName("");
    } else {
      const newSubThemes = props.subThemeArrayAll.map(
        (subTheme: SubThemeArr) => {
          if (
            subTheme.subthemeName === props?.showSubThemeBtn &&
            subTheme.subthemeId === props.inputChange.id
          ) {
            return { ...subTheme, subthemeName: subTheme.subthemeName + " " };
          }
          return subTheme;
        }
      );
      props.setSubThemeArray(newSubThemes);
      if (
        props.subThemeName.length === 0 &&
        props.inputChange.isSubThemeChanged
      ) {
        Toast.showToast(ToastType.ERROR, "SubTheme name can't be empty");
      }
    }

    props.setInputChange({
      index: "",
      id: "",
      isThemeChanged: false,
      isSubThemeChanged: false,
      themeName: "",
      subThemeName: "",
    });
    props?.setShowSubThemeBtn("");
    props.setShowSubThemeWarning(false);
  };

  const handleSubThemeDiscard = () => {
    const newSubThemes = props.subThemeArrayAll.map((subTheme: SubThemeArr) => {
      if (
        subTheme.subthemeName === props?.showSubThemeBtn &&
        subTheme.subthemeId === props.inputChange.id
      ) {
        return {
          ...subTheme,
          subthemeName: props.inputChange.subThemeName + " ",
        };
      }
      return subTheme;
    });
    props.setSubThemeArray(newSubThemes);
    props.setSubThemeName("");
    props.setInputChange({
      index: "",
      id: "",
      isThemeChanged: false,
      isSubThemeChanged: false,
      themeName: "",
      subThemeName: "",
    });
    props?.setShowSubThemeBtn("");
    props.setShowSubThemeWarning(false);
  };

  const SubThemeWarningModal = (props: any) => {
    return (
      <>
        <h1 className="mb-3">Do you want to discard the changes</h1>
        <div className="flex justify-end gap-4 form-group">
          <Button
            type={"button"}
            classProperty={"bg-[#414141]"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Discard"}
            changeStep={() => {
              handleSubThemeDiscard();
            }}
          />
          <Button
            type={"button"}
            classProperty={"bg-purple"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Save"}
            changeStep={() => handleSubThemeInputSave()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`flex justify-center ${
            props.showThemeBtn ? "relative" : ""
          }`}
        >
          <div className="relative flex sub-child-parent">
            <div className="flex gap-3">
              {socialIcons}
              <input
                type={props.type}
                className="text-[#161616] border rounded p-2 border-white focus:outline-none border-2 focus:rounded focus:border-purple focus:outline-0"
                defaultValue={props?.defaultValue}
                key={props?.defaultValue}
                onChange={(e) => {
                  handleThemeInputChange(e);
                }}
                onClick={() => {
                  handleThemeInputClick(props?.themeId);
                }}
              />
            </div>
            {props?.themeId === props.showThemeBtn && (
              <div
                onClick={handleThemePlusClick}
                className="absolute w-8 h-8 bg-red z-[5] bg-purple hover:opacity-70 transition rounded-full bottom-[-46px] left-[60.2%] flex justify-center cursor-pointer items-center pl-[1px]"
              >
                {plusIcon}
              </div>
            )}
          </div>
          {props?.themeId === props.showThemeBtn && (
            <EditDeleteBtn
              className="mt-5"
              handleEdit={props.handleSaveThemeInput}
              handleDelete={handleDeleteTheme}
            />
          )}
        </div>

        <ThemesSubThemeChildrens
          setShowThemeBtn={props?.setShowThemeBtn}
          showBtn={props?.showSubThemeBtn}
          setShowBtn={props?.setShowSubThemeBtn}
          themeId={props.themeId}
          subThemeArrayAll={props.subThemeArrayAll}
          subThemeArr={props.subThemeArrChilde}
          setSubThemeArray={props.setSubThemeArray}
          handleThemeInput={handleThemeInputClick}
          inputChange={props.inputChange}
          setInputChange={props.setInputChange}
          handleSubThemeInputSave={handleSubThemeInputSave}
          setSubThemeName={props.setSubThemeName}
          setShowSubThemeWarning={props.setShowSubThemeWarning}
        />
      </div>

      {props.showSubThemeWarning && (
        <CustomizeModal header="Warning" closeModal={handleSubThemeDiscard}>
          <SubThemeWarningModal />
        </CustomizeModal>
      )}
    </>
  );
};

export default ThemeSubThemesSubChild;
