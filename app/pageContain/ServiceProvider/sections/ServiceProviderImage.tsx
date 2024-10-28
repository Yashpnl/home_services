"use client";
import Image from "next/image";
import React, { useState } from "react";
import serviceProviderImg1 from "@/assets/serviceProviderImg1.png";
import serviceProviderImg2 from "@/assets/serviceProviderImg2.png";

import serviceProviderImg3 from "@/assets/serviceProviderImg3.png";

import serviceProviderImg4 from "@/assets/serviceProviderImg4.png";

import serviceProviderImg5 from "@/assets/serviceProviderImg5.png";
import { useRouter } from "next/navigation";

const ServiceProviderImage = () => {

  const router=useRouter();

  const serviceProviderImg = [
    serviceProviderImg1,
    serviceProviderImg2,
    serviceProviderImg3,
    serviceProviderImg4,
    serviceProviderImg5,
  ];

  const [selectedImg, setSelectedImg] = useState(serviceProviderImg[0]);

  console.log(selectedImg)

  router.push(`?image=${selectedImg}`)

  return (
    <>
      <div className="row-span-2 w-full">
        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-5">
            {serviceProviderImg?.map((img, index) => (
              <div
                key={index}
                className={`${
                  serviceProviderImg[index] === selectedImg
                    ? "border-2 rounded-[10px] border-blue-500 h-24 w-24 flex justify-center items-center p-1"
                    : " "
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  width={100}
                  height={100}
                  onClick={() => setSelectedImg(serviceProviderImg[index])}
                  className={`cursor-pointer rounded-[10px]  h-24 w-24  object-contain `}
                />
              </div>
            ))}
          </div>
          <div className="bg-[#FEF7EE] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-[20px] min-h-[550px] flex items-end w-full">
            <Image
              src={selectedImg}
              alt=""
              width={309}
              height={424}
              quality={100}
              className="mx-auto object-contain "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderImage;
