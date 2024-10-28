"use client"
import React, { useState } from "react";
import ServiceProviderImage from "./sections/ServiceProviderImage";
import ServiceProviderInfo from "./sections/ServiceProviderInfo";
import ServiceProviderReview from "./sections/ServiceProviderReview";
import ServiceProviderSection from "../Home/sections/serviceProviderSection/ServiceProviderSection";
import PackagesSection from "./sections/PackagesSection";

const ServiceProvider = () => {

  const [packages, setPackges] = useState(false)
  const handlePackges = () => {
    setPackges(true)
  }

  return (
    <>
      <div className="width-container">
        <div className="grid grid-cols-[35rem_1fr] gap-10 grid-rows-2">
          <ServiceProviderImage />
          <ServiceProviderInfo handlePackges={handlePackges} />
          <ServiceProviderReview />
        </div>
        <div className="grid grid-cols-[35rem_1fr] gap-10 pt-10">
          <div />
          {packages &&
            <PackagesSection />
          }
        </div>
      </div>
      <ServiceProviderSection />
    </>
  );
};

export default ServiceProvider;
