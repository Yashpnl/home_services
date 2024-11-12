"use client"
import { useState } from "react";
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
    providerImage: provider?.banner_url,
    providerName: provider?.service_provider_first_name,
    providerCategory: provider?.category_name,
  };

  localStorage.setItem("providerData", JSON.stringify(providerData));


  const [packages, setPackges] = useState(false);

  const handlePackges = () => {
    setPackges(true);
  };

  return (
    <>
      <div className="width-container">
        <div className="grid grid-cols-[35rem_1fr] gap-10 grid-rows-2">
          <ServiceProviderImage serviceimages={provider.serviceimages} />
          <ServiceProviderInfo handlePackges={handlePackges} provider={{
            providerName: provider.service_provider_first_name,
            providerField: provider.category_name,
            startTime: provider?.working_time[0]?.date?.start_time,
            endTime: provider?.working_time[0]?.end_time,
            bio: provider?.description
          }} />
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
        <div className="grid grid-cols-[35rem_1fr] gap-10 pt-10">
          <div />
          {packages && <PackagesSection providerId={providerId} servicepricings={provider.servicepricings} />}
        </div>
        <pre>{JSON.stringify(provider, null, 2)}</pre>
      </div>
    </>
  );
};

export default ServiceProvider;
