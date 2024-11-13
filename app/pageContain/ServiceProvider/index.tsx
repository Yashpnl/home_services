// @ts-nocheck

"use client"
import { useEffect, useState } from "react";
import ServiceProviderImage from "./sections/ServiceProviderImage";
import ServiceProviderInfo from "./sections/ServiceProviderInfo";
import ServiceProviderReview from "./sections/ServiceProviderReview";
import PackagesSection from "./sections/PackagesSection";

interface Provider {
  id: number;
  image_url: string;
  banner_url: string;
  serviceimages: string;
  service_provider_first_name: string;
  category_name: string;
  servicepricings: number;
  working_time: any;
  price: number;
  rating: string;
  description: string;
  total_order: string;
  experience: string;
  c_name: string;
  review: string;
  date: string;
  c_photo: string;
  star: string;
}

const ServiceProvider = ({ provider, providerId }: { provider: Provider, providerId: string }) => {

  const providerData = {
    providerId: provider?.id,
    serviceProviderId: provider?.service_provider_id,
    providerImage: provider?.banner_url,
    providerName: provider?.service_provider_first_name,
    providerCategory: provider?.category_name,
  };

  useEffect(() => {
    localStorage.setItem("providerData", JSON.stringify(providerData));
  }, [])


  const [packages, setPackges] = useState(false);

  const handlePackges = () => {
    setPackges(true);
  };
  const workingTime = provider.working_time;

  // Transform `working_time` to an object with day-wise schedule
  const scheduleByDay = workingTime.reduce((acc: any, dayData: any) => {
    const day = dayData.days;
    const { start_time, end_time } = dayData.date[0] || {};
    acc[day] = { startTime: start_time, endTime: end_time };
    return acc;
  }, {});


  return (
    <>
      <div className="width-container">
        <div className="grid lg:grid-cols-[35rem_1fr] gap-10 grid-rows-[auto,auto]">
          <ServiceProviderImage serviceimages={provider.serviceimages} />
          <ServiceProviderInfo
            handlePackges={handlePackges}
            provider={{
              providerName: provider.service_provider_first_name,
              providerField: provider.category_name,
              schedule: scheduleByDay,
              bio: provider.description
            }}
          />
          <ServiceProviderReview
            rating={provider.rating}
            orders={provider.total_order}
            experience={provider.experience}
            c_name={provider.c_name}
            review={provider.review}
            date={provider.date}
            star={provider.star}
            c_photo={provider.c_photo}
          />
        </div>
        <div className="grid lg:grid-cols-[35rem_1fr] gap-10 pt-10">
          <div />
          {packages && <PackagesSection providerId={providerId} servicepricings={provider.servicepricings} />}
        </div>
      </div>
    </>
  );
};

export default ServiceProvider;
