import DataCollectionTabs from "@/components/DataCollectionTabs";
import Layout from "@/components/Layout";
import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const DataCollection = () => {
  const token = localStorage.getItem("authToken");
  const { push } = useRouter();
  if (!token) {
    push("/");
  }
  return (
    <>
      <Head>
        <title>Unleash the Power of Data: Every input matters...</title>
      </Head>
      <div>
        <Layout>
          <DataCollectionTabs />
        </Layout>
      </div>
    </>
  );
};

export default DataCollection;
