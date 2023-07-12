import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  arrowDown,
  backArrowSvg,
  completedMark,
  configurationIcon,
  dashboardIcon,
  dottedCircleIcon,
  halfPurpleCircle,
  manageUser,
  settingIcon,
} from "@/utils/UtilsSvg";
import { configMenuOpt } from "../utils/utilsArray";
import ThemeSubThemeMenuOption from "./ThemeSubThemeMenuOption";

const Sidebar = (props: any) => {
  const [configMenu, setConfigMenu] = useState(false);
  const [settingoption, setSettingOption] = useState(false);

  const configRoute = useRouter();
  const handleConfigurationMenu = () => {
    setConfigMenu(!configMenu);
  };
  const handleSettingOption = () => {
    setSettingOption(!settingoption);
  };

  return (
    <div className="fixed z-10 h-[calc(100vh-48px)] p-4 overflow-y-auto shadow-xl w-60 bg-secondaryBlack sidebar">
      {configRoute.pathname !== "/configuration" && (
        <ul className="text-offWhite">
          <Link className="flex items-center" href="/dashboard">
            <li className="flex items-center py-5">
              {dashboardIcon}
              <span className="ml-4 text-sm"> Dashboard</span>
              {/* <span className="ml-24">{arrowDown}</span> */}
            </li>
          </Link>

          <ThemeSubThemeMenuOption />

          <li className="py-5">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleSettingOption}
            >
              {settingIcon}
              <span className="ml-3 text-sm">Settings</span>
            </div>
            {settingoption && (
              <ul className="mt-4 pl-7">
                <li onClick={handleConfigurationMenu}>
                  <Link
                    className="flex items-center mb-3"
                    href="/configuration"
                  >
                    {configurationIcon}
                    <span className="ml-3 text-sm">Configuration</span>
                  </Link>
                </li>
                <li onClick={handleConfigurationMenu}>
                  <Link className="flex items-center" href="/manage-users">
                    {manageUser}
                    <span className="ml-3 text-sm">Manage users</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}

      {configRoute.pathname === "/configuration" && (
        <div className="text-offWhite">
          <Link
            className="flex items-center pt-12 pb-7"
            href="/dashboard"
            onClick={handleConfigurationMenu}
          >
            {backArrowSvg}
            <span className="ml-6 text-sm">Back</span>
          </Link>
          <ul className="relative before:absolute before:w-1 before:h-full before:-left-4 before:bg-[#666] before:top-0 menu-items">
            {configMenuOpt.map((items) => {
              return (
                // stepCounter
                <li
                  onClick={() =>
                    props.stepCounter >= items.id
                      ? props.setStep(items.id)
                      : null
                  }
                  key={items.id}
                  className={`flex items-center  py-4 text-sm ${
                    props.stepCounter === items.id ||
                    props.stepCounter > items.id
                      ? "relative before:absolute cursor-pointer before:w-1 before:h-full before:-left-4 before:bg-purple before:top-0"
                      : ""
                  }
                  ${props.stepCounter === items.id ? "font-bold" : ""}
                  `}
                >
                  <div className="inline-block w-4 h-4 mr-5 text-sm ">
                    {props.currentStep === items.id
                      ? halfPurpleCircle
                      : props.stepCounter > items.id
                      ? completedMark
                      : dottedCircleIcon}
                  </div>
                  {items.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
