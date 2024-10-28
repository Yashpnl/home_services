'use client'
import Image from "next/image"
import { useState } from "react";
import ratingImage from "@/assets/rating.png";
import ordersImage from "@/assets/orders.png";
import experienceImage from "@/assets/experince.png";

const ServiceProviderReview = ({ rating, orders, experience, c_name, review, date, star, c_photo }: { rating: string, orders: string, experience: string, c_name: string, review: string, date: string, star: string, c_photo: string }) => {

  const [showAll, setShowAll] = useState(false);
  const initialServicesToShow = 4;

  const handleToggleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] w-full p-3">

        {/* <span className="text-[#0054A5] font-medium underline w-full flex items-center justify-end"
          onClick={handleToggleViewAll}>
          {data?.length >= initialServicesToShow ?
            `${showAll ? 'See less' : 'See more'}` : ''
          }
        </span> */}
        <span className="text-[#0054A5] font-medium underline w-full flex items-center justify-end">See more</span>

        <div className="flex flex-col 2xl:flex-row w-full gap-4 pb-3 px-12">
          <div className="2xl:border-r flex flex-col gap-2 text-[#565656] w-full 2xl:w-[31%]">
            <div className="flex items-center gap-5 border-b border-b-[#0000001A] py-4">
              <Image src={ratingImage} alt="rating" className="size-9" />
              <div>
                <span className="pt-2 font-semibold text-xl">{rating}</span>
                <span>Rating</span>
              </div>
            </div>
            <div className="flex items-center gap-5 border-b border-b-[#0000001A] py-4">
              <Image src={ordersImage} alt="rating" className="size-9" />
              <div>
                <span className="pt-2 font-semibold text-xl">{orders}</span>
                <span>Completed </span>
              </div>
            </div>
            <div className="flex items-center gap-5 py-4">
              <Image src={experienceImage} alt="rating" className="size-9" />
              <div>
                <span className="pt-2 font-semibold text-xl">{experience}</span>
                <span>Experience </span>
              </div>
            </div>
          </div>
          <div className="text-[#565656] w-full 2xl:w-[69%]">
            <span className="font-semibold text-xl">Review </span>
            <div className="grid 2xl:grid-cols-2 gap-2">
              <div className="flex flex-col gap-5 max-w-[350px] p-3">
                <div className="flex items-center justify-between  w-full">
                  <div className="flex items-center gap-2">
                    <Image
                      src={c_photo}
                      alt={c_name}
                      width={20}
                      height={20}
                      className="size-6 rounded-sm"
                    />
                    <span className="font-medium text-sm">
                      {c_name || "Josh peter"}
                    </span>
                    <span>stars</span>
                  </div>
                  <span>{date || '12/12/2024'}</span>
                </div>
                {review || "lorem loremloremloremlorem"}
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ServiceProviderReview