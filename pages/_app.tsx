import ToastContext from "@/ToastContext";
import "@/styles/globals.css";
import { ToastType } from "@/utils/Constant";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string | null>("");
  const [featuredImage, setfeaturedImage] = useState<any>();
  const [attachment, setattachment] = useState<any>();

  const showToast = (type: string, message: string) => {
    if (type === ToastType.INFO) {
      toast.info(message);
    }
    if (type === ToastType.SUCCESS) {
      toast(message);
    }
    if (type === ToastType.WARN) {
      toast.warn(message);
    }
    if (type === ToastType.ERROR) {
      toast.error(message);
    }
  };

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (initialRenderComplete) {
    const decidedThemeColor = localStorage.getItem("themeColor");
    if (themeColor !== localStorage.getItem("themeColor")) {
      setThemeColor(decidedThemeColor);
    }
  }

  if (!initialRenderComplete) return <></>;
  return (
    <div className={`theme-color ${themeColor} ${roboto.variable} font-sans`}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeColor == "light" ? "light" : "dark"}
      />
      <ToastContext.Provider
        value={{
          showToast: showToast,
        }}
      >
        <Component {...pageProps} />
      </ToastContext.Provider>
    </div>
  );
}
