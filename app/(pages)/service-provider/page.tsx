import ServiceProvider from "@/app/pageContain/ServiceProvider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <ServiceProvider />
      <Footer />
    </>
  );
};

export default page;
