import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../images/Logo mark White 1.png";
import ThemeSubThemesSubChild from "./ThemeSubThemesSubChild";
import { REACT_API_BASE_URL, getData, postDataWithToken } from "@/utils/Api";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import { SubThemeArr, ThemeArr } from "@/utils/Interface/InterfaceTreeInput";
import Button from "./Button";
import { plusIcon } from "@/utils/UtilsSvg";
import CustomizeModal from "./CustomizeModal";

const ThemesSubthemesTree = (props: any) => {
  const token = localStorage.getItem("authToken");
  const Toast = useContext(ToastContext);

  const [themeArray, setThemeArray] = useState<ThemeArr[]>([]);
  const [subThemeArray, setSubThemeArray] = useState<SubThemeArr[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [saveLoader, setSaveLoader] = useState(true);
  const [showThemeBtn, setShowThemeBtn] = useState<string>("");
  const [showSubThemeBtn, setShowSubThemeBtn] = useState<string>("");
  const [themeName, setThemeName] = useState<string>("");
  const [subThemeName, setSubThemeName] = useState<string>("");
  const [showThemeWarning, setShowThemeWarning] = useState(false);
  const [showSubThemeWarning, setShowSubThemeWarning] =
    useState<boolean>(false);
  const [inputChange, setInputChange] = useState<any>({
    index: "",
    id: "",
    isThemeChanged: false,
    isSubThemeChanged: false,
    themeName: "",
    subThemeName: "",
  });

  const companyData = props.companyData;
  useEffect(() => {
    getCompanyThemesSubthemes();
  }, []);

  const getCompanyThemesSubthemes = async () => {
    await getData("/company/theme/subtheme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData?.companyTheme?.themes?.length) {
          setThemeArray(themeSubthemeData?.companyTheme?.themes);
          setSubThemeArray(themeSubthemeData?.companySubtheme?.subthemes);
          setShowLoader(false);
          setSaveLoader(false);
        } else {
          getCompanyThemes();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const getCompanyThemes = async () => {
    await getData("/theme/getTheme", token)
      .then(function (resp) {
        const themeSubthemeData = resp?.data?.data;
        if (themeSubthemeData) {
          setThemeArray(themeSubthemeData.themesArr);
          setSubThemeArray(themeSubthemeData.subthemesArr);
          setShowLoader(false);
          setSaveLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  const handleRow = () => {
    if (inputChange.isThemeChanged === true) {
      setShowThemeWarning(true);
    } else if (inputChange.isSubThemeChanged === true) {
      setShowSubThemeWarning(true);
    } else {
      const id = `dfs${Math.random()}fdff${Math.random()}`;
      const addTheme: ThemeArr = {
        themeName: `New theme ${themeArray?.length + 1}`,
        themeId: id,
        id: "",
      };
      if (themeArray?.length < 6) {
        setThemeArray([...themeArray, addTheme]);
      } else {
        Toast.showToast(
          ToastType.ERROR,
          "Error:Maximum of 6 themes can be added"
        );
      }
    }
  };

  const handlePrevStep = () => {
    if (inputChange.isThemeChanged === true) {
      setShowThemeWarning(true);
    } else if (inputChange.isSubThemeChanged === true) {
      setShowSubThemeWarning(true);
    } else {
      props.setStep(2);
    }
  };

  const handleNextStep = () => {
    if (inputChange.isThemeChanged === true) {
      setShowThemeWarning(true);
    } else if (inputChange.isSubThemeChanged === true) {
      setShowSubThemeWarning(true);
    } else {
      setSaveLoader(true);
      const newThemeArr = themeArray.map((data) => {
        const subThemeData = subThemeArray
          .filter((el) => el.themeId === data.themeId)
          .map((el) => ({
            subthemeName: el.subthemeName,
            themeName: data.themeName,
            metricId: el.metricId,
            themeId: el.themeId,
          }));
        const metricIds = subThemeData.flatMap((el) => el.metricId);
        return {
          themeName: data.themeName,
          themeId: data.themeId,
          metricId: metricIds.length ? metricIds : [],
        };
      });

      const newSubThemeArr = subThemeArray.map((el) => ({
        subthemeName: el.subthemeName,
        subthemeId: el.subthemeId,
        themeId: el.themeId,
        themeName: themeArray.find((data) => data.themeId === el.themeId)
          ?.themeName,
        metricId: el.metricId,
      }));

      const data = {
        themes: newThemeArr,
        subthemes: newSubThemeArr,
      };

      postDataWithToken("/company/addThemeSubtheme", data, token)
        .then(function (response) {
          if (response.data.data) {
            Toast.showToast(ToastType.SUCCESS, response?.data?.message);
            setSaveLoader(false);
            props.setStep(4);
            if (props?.stepDefault < 4) {
              props?.setStepDefault(4);
            }
          }
        })
        .catch((err) => {
          setSaveLoader(false);
          console.log(err);
        });
    }
  };

  const handleSaveThemeInput = () => {
    if (themeName.length > 0) {
      const newThemes = themeArray.map((theme: any) => {
        if (theme.themeId === inputChange.id) {
          return { ...theme, themeName: themeName };
        }
        return theme;
      });
      setThemeArray(newThemes);
    } else {
      const newThemes = themeArray.map((theme: any) => {
        if (theme.themeId === inputChange.id) {
          return { ...theme, themeName: theme.themeName + " " };
        }
        return theme;
      });
      setThemeArray(newThemes);
      if (themeName.length === 0 && inputChange.isThemeChanged) {
        Toast.showToast(ToastType.ERROR, "Theme name can't be empty");
      }
    }
    setInputChange({
      index: "",
      id: "",
      isThemeChanged: false,
      isSubThemeChanged: false,
      themeName: "",
      subThemeName: "",
    });
    setShowThemeBtn("");
    setShowThemeWarning(false);
  };

  const handleDiscardButton = () => {
    const newThemes = themeArray.map((theme: any) => {
      if (theme.themeId === inputChange.id) {
        return {
          ...theme,
          themeName: inputChange.themeName + " ",
        };
      }
      return theme;
    });
    setThemeArray(newThemes);
    setInputChange({
      index: "",
      id: "",
      themeId: "",
      subThemeId: "",
      isThemeChanged: false,
      isSubThemeChange: false,
      themeName: "",
      subThemeName: "",
    });
    setShowThemeBtn("");
    setShowThemeWarning(false);
  };
  const WarnModalBody = (props: any) => {
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
            changeStep={handleDiscardButton}
          />
          <Button
            type={"button"}
            classProperty={"bg-purple"}
            imageClass="ml-2"
            marginProperty="mb-0"
            text={"Save"}
            changeStep={() => handleSaveThemeInput()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start third-screen grow">
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex items-center justify-center parent-node">
            <div className="flex items-center justify-center me-px bg-secondaryBlack w-11 h-11 ">
              {companyData?.logo ? (
                <Image
                  width={100}
                  height={100}
                  alt=""
                  className="object-cover rounded-full w-7 h-7"
                  src={
                    companyData.logo &&
                    `${REACT_API_BASE_URL}/uploads/${companyData?.logo}`
                  }
                />
              ) : (
                <Image src={logo} alt="logo" />
              )}
            </div>
            <div className="ms-px p-2.5 bg-secondaryBlack pr-12">
              <span>Impact framework</span>
            </div>
          </div>
          <div className="absolute -right-10 flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer bg-purple hover:opacity-70 pl-[2px]">
            <span onClick={handleRow}>{plusIcon}</span>
          </div>
        </div>
        {showLoader ? (
          <div className="flex gap-6 mt-11 sub-child-div ">
            <h1>Please wait loading...</h1>
          </div>
        ) : (
          <div className="flex gap-6 mt-11 sub-child-div ">
            {themeArray &&
              themeArray.length &&
              themeArray.map((data: any, index: number) => {
                const subthmArr = subThemeArray.filter(function (
                  el: SubThemeArr
                ) {
                  return el?.themeId == data?.themeId;
                });
                return (
                  <ThemeSubThemesSubChild
                    key={`index-${index}`}
                    index={index}
                    type={"text"}
                    setInputChange={setInputChange}
                    inputChange={inputChange}
                    placeholder={data?.themeName}
                    defaultValue={data?.themeName}
                    themeId={data?.themeId}
                    themeName={themeName}
                    setThemeName={setThemeName}
                    subThemeName={subThemeName}
                    setSubThemeName={setSubThemeName}
                    themeArrAll={themeArray}
                    subThemeArrChilde={subthmArr}
                    subThemeArrayAll={subThemeArray}
                    setSubThemeArray={setSubThemeArray}
                    setThemeArray={setThemeArray}
                    showThemeBtn={showThemeBtn}
                    setShowThemeBtn={setShowThemeBtn}
                    showSubThemeBtn={showSubThemeBtn}
                    setShowSubThemeBtn={setShowSubThemeBtn}
                    handleSaveThemeInput={handleSaveThemeInput}
                    handleDiscardButton={handleDiscardButton}
                    setShowThemeWarning={setShowThemeWarning}
                    showSubThemeWarning={showSubThemeWarning}
                    setShowSubThemeWarning={setShowSubThemeWarning}
                  />
                );
              })}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4 pb-7 form-group">
        <Button
          type={"reset"}
          classProperty={"bg-charcoal"}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={"Previous"}
          changeStep={handlePrevStep}
          value={"previous"}
        />

        <Button
          type={"submit"}
          classProperty={"bg-purple"}
          imageClass="ml-2"
          marginProperty="mb-0"
          text={showLoader || saveLoader ? "Wait..." : "Save & Continue"}
          changeStep={showLoader || saveLoader ? () => {} : handleNextStep}
        />
      </div>
      {showThemeWarning && (
        <CustomizeModal header="Warning" closeModal={handleDiscardButton}>
          <WarnModalBody />
        </CustomizeModal>
      )}
    </>
  );
};

export default ThemesSubthemesTree;
