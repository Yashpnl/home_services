"use client"
import { useState } from "react";
import ServiceProviderImage from "./sections/ServiceProviderImage";
import ServiceProviderInfo from "./sections/ServiceProviderInfo";
import ServiceProviderReview from "./sections/ServiceProviderReview";
import PackagesSection from "./sections/PackagesSection";

interface Provider {
  id: number;
  image_url: string;
  serviceimages: string;
  service_provider_first_name: string;
  category_name: string;
  servicepricings: number;
  workingtimes: any;
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
            startTime: provider?.workingtimes[0]?.start_time,
            endTime: provider?.workingtimes[0]?.end_time,
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
      </div>
    </>
  );
};

export default ServiceProvider;
