// @ts-nocheck

"use client";
import Image from "next/image";
import { useState } from "react";

interface ServiceImage {
  image_url: string;
}

interface ServiceProviderImageProps {
  serviceimages: ServiceImage[];
}

const ServiceProviderImage: React.FC<ServiceProviderImageProps> = ({ serviceimages }) => {

  const [selectedImg, setSelectedImg] = useState(serviceimages[0]?.image_url || "");
  const [showAllImages, setShowAllImages] = useState(false);

  const imagesToShow = showAllImages ? serviceimages : serviceimages.slice(0, 4);

  return (
    <div className="row-span-2 w-full">
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-5">
          {imagesToShow?.map((img, index) => (
            <div
              key={index}
              className={`${
                img.image_url === selectedImg
                  ? "border-2 rounded-[10px] border-primary size-16 flex justify-center items-center p-1"
                  : ""
              }`}
            >
              <Image
                src={img.image_url}
                alt={`Service image ${index + 1}`}
                width={100}
                height={100}
                onClick={() => setSelectedImg(img.image_url)}
                className="cursor-pointer rounded-[10px] size-16 object-contain"
              />
            </div>
          ))}
          {serviceimages.length > 4 && (
            <span
              onClick={() => setShowAllImages(!showAllImages)}
              className="text-[#0054A5] font-medium underline text-xs cursor-pointer"
            >
              {showAllImages ? "View Less" : "View More"}
            </span>
          )}
        </div>
        <div className="bg-[#FEF7EE] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-[20px] min-h-[550px] flex items-end w-full">
          {selectedImg && (
            <Image
              src={selectedImg}
              alt="Selected service provider"
              width={309}
              height={424}
              quality={100}
              className="mx-auto object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderImage;
