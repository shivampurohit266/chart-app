import { socialIcons } from "@/utils/UtilsSvg";
import React from "react";
import EditDeleteBtn from "./EditDeleteBtn";
import { SubThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import ToastContext from "@/ToastContext";

const ThemesSubThemeChildrens = (props: any) => {
  const treeContents = props?.subThemeArr;

  const handleSubThemeInputClick = (val: any) => {
    if (props.inputChange.isThemeChanged === true) {
      props.handleThemeInput(val?.subthemeId);
    } else {
      if (props.inputChange.isSubThemeChanged === true) {
        props.setShowSubThemeWarning(true);
      } else {
        const inputChangeData = {
          index: val.subthemeId,
          id: val.subthemeId,
          isThemeChanged: props.inputChange.isThemeChanged,
          isSubThemeChanged: props.inputChange.isSubThemeChanged,
          themeName: props.inputChange?.themeName,
          subThemeName: val.subthemeName,
        };
        props?.setSubThemeName(val?.subthemeName);
        props?.setInputChange(inputChangeData);
        props?.setShowBtn(val.subthemeName);
        props?.setShowThemeBtn("");
      }
    }
  };

  const handleSubThemeInputChange = ({ e, val }: any) => {
    const value = e.target.value;
    props.setSubThemeName(value);
    if (val.subthemeName !== e.target.value) {
      const inputChangeData = {
        index: val.subthemeId,
        id: val.subthemeId,
        isThemeChanged: props.inputChange.isThemeChanged,
        isSubThemeChanged: true,
        themeName: props.inputChange?.themeName,
        subThemeName: props.inputChange?.subThemeName,
      };
      if (props.setInputChange) {
        props?.setInputChange(inputChangeData);
      }
    }
  };

  const handleDeleteEnvironemt = () => {
    const subthmArr = props.subThemeArrayAll.filter(function (el: SubThemeArr) {
      return el.subthemeName !== props?.showBtn;
    });
    props.setSubThemeArray(subthmArr);
    props?.setShowBtn("");
  };

  return (
    <div className="px-5 pt-5 border border-dashed child-nodes border-gray w-max">
      <div key={treeContents.id}>
        <div className={``}>
          {treeContents?.map((val: any, index: number) => {
            return (
              <div
                key={index}
                className={`mb-5 sub-child-node ${
                  treeContents.id === index ? "" : ""
                }`}
              >
                <div className="flex justify-center gap-3">
                  {socialIcons}
                  <input
                    type="text"
                    key={val?.subthemeName}
                    className="text-[#161616] border rounded p-2 border-white focus:outline-none border-2 focus:rounded focus:border-purple focus:outline-0"
                    placeholder={val?.subthemeName}
                    defaultValue={val?.subthemeName}
                    onChange={(e) => handleSubThemeInputChange({ e, val })}
                    onClick={() => {
                      handleSubThemeInputClick(val);
                    }}
                  />
                  {props?.showBtn === val?.subthemeName && (
                    <EditDeleteBtn
                      handleEdit={() => props.handleSubThemeInputSave()}
                      handleDelete={handleDeleteEnvironemt}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* );
      })} */}
      {/* {showWarning && (
        <CustomizeModal header="Warning" closeModal={handleSubThemeDiscard}>
          <WarnModalBody />
        </CustomizeModal>
      )} */}
    </div>
  );
};

export default ThemesSubThemeChildrens;
