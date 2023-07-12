import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../images/chart-logo.png";
import logoDark from "../images/chart-logo-black.png";
import lightMode from "../images/light-mode.png";
import avtar from "../images/avtar.png";
import { logOut } from "@/utils/Auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const { push } = useRouter();
  // if (themeColor !== localStorage.getItem("themeColor")) {
  //   setThemeColor(decidedThemeColor);
  // }
  const selectedThemeColor = localStorage.getItem("themeColor");
  const [themeColor, setThemeColor] = useState(selectedThemeColor);
  const [profile, setProfile] = useState(false);
  const handleThemeMode = () => {
    if (themeColor === "light") {
      setThemeColor("dark");
      localStorage.setItem("themeColor", "dark");
    } else if (themeColor === "dark") {
      setThemeColor("light");
      localStorage.setItem("themeColor", "light");
    }
  };
  return (
    <div
      className={`navbar sticky top-0 left-0 z-20 flex items-center justify-between w-full h-auto px-12 py-1 bg-darkGray shadow-md`}
    >
      <div className="logo">
        <Link href="#">
          {themeColor === "dark" ? (
            <Image src={logo} alt="" />
          ) : (
            <Image height="40" src={logoDark} alt="" />
          )}
        </Link>
      </div>
      <div className="flex items-center">
        <Link className="h-4 pr-4" href="#">
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.7751 12.75C4.79176 11.55 4.92926 10.675 5.1876 10.125C5.44593 9.575 5.93343 8.975 6.6501 8.325C7.3501 7.69167 7.8876 7.10417 8.2626 6.5625C8.6376 6.02083 8.8251 5.44167 8.8251 4.825C8.8251 4.075 8.5751 3.45 8.0751 2.95C7.5751 2.45 6.8751 2.2 5.9751 2.2C5.10843 2.2 4.44176 2.44583 3.9751 2.9375C3.50843 3.42917 3.16676 3.94167 2.9501 4.475L0.850098 3.55C1.21676 2.56667 1.8376 1.72917 2.7126 1.0375C3.5876 0.345833 4.6751 0 5.9751 0C7.64176 0 8.9251 0.4625 9.8251 1.3875C10.7251 2.3125 11.1751 3.425 11.1751 4.725C11.1751 5.525 11.0043 6.25 10.6626 6.9C10.3209 7.55 9.7751 8.23333 9.0251 8.95C8.20843 9.73333 7.71676 10.3333 7.5501 10.75C7.38343 11.1667 7.29176 11.8333 7.2751 12.75H4.7751ZM5.9751 19C5.49176 19 5.07926 18.8292 4.7376 18.4875C4.39593 18.1458 4.2251 17.7333 4.2251 17.25C4.2251 16.7667 4.39593 16.3542 4.7376 16.0125C5.07926 15.6708 5.49176 15.5 5.9751 15.5C6.45843 15.5 6.87093 15.6708 7.2126 16.0125C7.55426 16.3542 7.7251 16.7667 7.7251 17.25C7.7251 17.7333 7.55426 18.1458 7.2126 18.4875C6.87093 18.8292 6.45843 19 5.9751 19Z"
              fill="white"
            />
          </svg>
        </Link>
        <Link className="h-6 pr-4" href="#" onClick={handleThemeMode}>
          <Image src={lightMode} alt="" />
        </Link>
        <Link onClick={() => setProfile(!profile)} className="h-6" href="#">
          <Image src={avtar} alt="" />
        </Link>
        {profile && (
          <div>
            <button
              className="ml-4 text-sm bg-white rounded py-[1px] px-2.5"
              onClick={() => {
                logOut();
                push("/");
              }}
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
