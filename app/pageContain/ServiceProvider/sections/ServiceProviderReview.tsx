'use client';
import Image from 'next/image';
import { useState } from 'react';
import ratingImage from '@/assets/rating.png';
import ordersImage from '@/assets/orders.png';
import experienceImage from '@/assets/experince.png';
import userprofile from '@/assets/userprofile.png'

const ServiceProviderReview = ({
  rating,
  orders,
  experience,
  c_name,
  review,
  date,
  star,
  c_photo,
}) => {

  const [showAll, setShowAll] = useState(false);
  const initialServicesToShow = 4;

  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const handleToggleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] w-full p-3 h-fit">
      {/* Show toggle for more reviews */}
      <span
        className="text-[#0054A5] font-medium underline w-full flex items-center justify-end cursor-pointer"
        onClick={handleToggleViewAll}
      >
        {showAll ? 'See less' : 'See more'}
      </span>


      <div className="flex flex-col 2xl:flex-row w-full gap-4 pb-3 px-9">
        <div className="2xl:border-r flex flex-col gap-2 text-[#565656] w-full 2xl:w-[31%]">
          {/* Rating */}
          <div className="flex items-center gap-5 border-b border-b-[#0000001A] py-4">
            <Image src={ratingImage} alt="rating" className="size-9" />
            <div className='flex flex-col gap-1'>
              <span className="pt-2 font-semibold text-xl">{rating}</span>
              <span>Rating</span>
            </div>
          </div>
          {/* Orders Completed */}
          <div className="flex items-center gap-5 border-b border-b-[#0000001A] py-4">
            <Image src={ordersImage} alt="orders" className="size-9" />
            <div className='flex flex-col gap-1'>
              <span className="pt-2 font-semibold text-xl">{orders} Orders</span>
              <span>Completed</span>
            </div>
          </div>
          {/* Experience */}
          <div className="flex items-center gap-5 py-4">
            <Image src={experienceImage} alt="experience" className="size-9" />
            <div className='flex flex-col gap-1'>
              <span className="pt-2 font-semibold text-xl">{experience} Years</span>
              <span>Experience</span>
            </div>
          </div>
        </div>
        <div className="text-[#565656] w-full 2xl:w-[69%]">
          <span className="font-semibold text-xl">Review</span>
          <div className="grid 2xl:grid-cols-2 gap-2">
            <div className="flex flex-col gap-5 max-w-[350px] p-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={c_photo || userprofile}
                    alt={c_name}
                    width={20}
                    height={20}
                    className="size-8 rounded-full border p-1"
                  />
                  <span className="font-medium text-sm">
                    {c_name}
                  </span>
                  <span className="flex gap-1 items-center">
                    {[...Array(maxStars)].map((_, index) => {
                      if (index < fullStars) {
                        return (
                          <svg
                            key={index}
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="#0054A5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.52229 0.481453C5.66748 0.0116138 6.33252 0.0116141 6.47771 0.481453L7.30752 3.16676C7.37226 3.37626 7.56595 3.51914 7.78523 3.51914H10.5219C11.0001 3.51914 11.2054 4.12613 10.8254 4.41647L8.56895 6.14023C8.40244 6.26743 8.3329 6.48498 8.39477 6.68518L9.24635 9.44096C9.39008 9.90607 8.85195 10.2814 8.46511 9.98591L6.30353 8.33461C6.12433 8.19771 5.87567 8.19771 5.69647 8.33461L3.53489 9.98591C3.14805 10.2814 2.60992 9.90607 2.75365 9.44096L3.60523 6.68518C3.6671 6.48498 3.59757 6.26744 3.43105 6.14023L1.17462 4.41647C0.79456 4.12613 0.999881 3.51914 1.47815 3.51914H4.21477C4.43405 3.51914 4.62774 3.37626 4.69248 3.16676L5.52229 0.481453Z" />
                          </svg>
                        );
                      } else if (index === fullStars && halfStar) {
                        return (
                          <svg
                            key={index}
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="#0054A5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.52229 0.481453C5.66748 0.0116138 6.33252 0.0116141 6.47771 0.481453L7.30752 3.16676C7.37226 3.37626 7.56595 3.51914 7.78523 3.51914H10.5219C11.0001 3.51914 11.2054 4.12613 10.8254 4.41647L8.56895 6.14023C8.40244 6.26743 8.3329 6.48498 8.39477 6.68518L9.24635 9.44096C9.39008 9.90607 8.85195 10.2814 8.46511 9.98591L6.30353 8.33461C6.12433 8.19771 5.87567 8.19771 5.69647 8.33461L3.53489 9.98591C3.14805 10.2814 2.60992 9.90607 2.75365 9.44096L3.60523 6.68518C3.6671 6.48498 3.59757 6.26744 3.43105 6.14023L1.17462 4.41647C0.79456 4.12613 0.999881 3.51914 1.47815 3.51914H4.21477C4.43405 3.51914 4.62774 3.37626 4.69248 3.16676L5.52229 0.481453Z" fill="url(#half-gradient)" />
                            <defs>
                              <linearGradient id="half-gradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="50%" stopColor="#0054A5" />
                                <stop offset="50%" stopColor="none" />
                              </linearGradient>
                            </defs>
                          </svg>
                        );
                      } else {
                        return (
                          <svg
                            key={index}
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="#ddd"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.52229 0.481453C5.66748 0.0116138 6.33252 0.0116141 6.47771 0.481453L7.30752 3.16676C7.37226 3.37626 7.56595 3.51914 7.78523 3.51914H10.5219C11.0001 3.51914 11.2054 4.12613 10.8254 4.41647L8.56895 6.14023C8.40244 6.26743 8.3329 6.48498 8.39477 6.68518L9.24635 9.44096C9.39008 9.90607 8.85195 10.2814 8.46511 9.98591L6.30353 8.33461C6.12433 8.19771 5.87567 8.19771 5.69647 8.33461L3.53489 9.98591C3.14805 10.2814 2.60992 9.90607 2.75365 9.44096L3.60523 6.68518C3.6671 6.48498 3.59757 6.26744 3.43105 6.14023L1.17462 4.41647C0.79456 4.12613 0.999881 3.51914 1.47815 3.51914H4.21477C4.43405 3.51914 4.62774 3.37626 4.69248 3.16676L5.52229 0.481453Z" />
                          </svg>
                        );
                      }
                    })}
                  </span>
                </div>
                <span className="text-sm">{date}</span>
              </div>
              <p className="text-sm">{review}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderReview;
