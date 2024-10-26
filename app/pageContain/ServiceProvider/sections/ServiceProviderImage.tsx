import Image from "next/image";
import React from "react";
import serviceProviderImg from "@/assets/serviceProviderImg1.png";
const ServiceProviderImage = () => {
  return (
    <>
      <div className="row-span-2">
        <div className="bg-[#FEF7EE] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-[20px] min-h-[550px] flex items-end">

          <Image
            src={serviceProviderImg}
            alt=""
            width={309}
            height={424}
            quality={100}
            className="mx-auto object-contain "
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderImage;
