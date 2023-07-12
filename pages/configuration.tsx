/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import MainContent from "@/components/MainContent";
import ThemesSubthemes from "@/components/ThemesSubthemes";
import OperationalMultipleArray from "@/components/OperationalMultipleArray";
import KeyImpactMetrics from "@/components/KeyImpactMetrics";
import FormulaBuilder from "@/components/FormulaBuilder";
import Standards from "@/components/Standards";
import { getData } from "@/utils/Api";
import { logOut } from "@/utils/Auth";
import ToastContext from "@/ToastContext";
import { ToastType } from "@/utils/Constant";
import DataTemplate from "@/components/DataTemplate";
import RelatedChart from "@/components/RelatedChart";
import Head from "next/head";

const Configuration = () => {
  const token = localStorage.getItem("authToken");
  const { push } = useRouter();
  const Toast = useContext(ToastContext);
  const [step, setStep] = useState(1);
  const [stepDefault, setStepDefault] = useState(0);
  const [companyData, setCompanyData] = useState({});

  if (!token) {
    push("/");
  }

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompanyDetails = async () => {
    await getData("/company", token)
      .then(function (resp) {
        if (resp?.data?.data) {
          const company = resp?.data?.data;
          setCompanyData(company);
          if (step !== 3) {
            setStep(company.stepCompleted + 1);
            setStepDefault(company.stepCompleted + 1);
          }
        } else if (resp?.response?.data?.message === "Unauthorized") {
          Toast.showToast(ToastType.ERROR, "Unauthorized");
          push("/");
          logOut();
        }
      })
      .catch((err) => {
        console.log(err, "errrr");
      });
  };

  return (
    <>
      <Head>
        <title>Sustally - Configuration</title>
      </Head>
      <Layout stepCounter={stepDefault} currentStep={step} setStep={setStep}>
        <div className="configuration ml-[auto] w-[calc(100%-240px)] max-h-[calc(100vh-48px)] pt-4 pb-7 text-white px-5 bg-primaryBlack fixed right-0 overflow-y-auto h-full">
          {step === 1 && (
            <MainContent
              companyData={companyData}
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
            />
          )}
          {step === 2 && (
            <OperationalMultipleArray
              companyData={companyData}
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
              getCompanyDetails={getCompanyDetails}
            />
          )}
          {step === 3 && (
            <ThemesSubthemes
              companyData={companyData}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
              setStep={setStep}
              getCompanyDetails={getCompanyDetails}
            />
          )}
          {step === 4 && (
            <KeyImpactMetrics
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
              // getCompanyDetails={getCompanyDetails}
            />
          )}
          {step === 5 && (
            <FormulaBuilder
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
            />
          )}
          {step === 6 && (
            <Standards
              getCompanyDetails={getCompanyDetails}
              companyData={companyData}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
              setStep={setStep}
            />
          )}
          {step === 7 && (
            <DataTemplate
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
            />
          )}
          {step === 8 && (
            <RelatedChart
              setStep={setStep}
              setStepDefault={setStepDefault}
              stepDefault={stepDefault}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Configuration;
