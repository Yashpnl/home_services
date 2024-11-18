// @ts-nocheck

"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface ProviderInfoProps {
  handlePackges: () => void;
  provider: {
    providerName: string;
    providerField: string;
    bio: string;
    schedule: {
      [day: string]: {
        startTime: string | null;
        endTime: string | null;
      };
    };
  };
}


const ServiceProviderInfo = ({ handlePackges, provider }: ProviderInfoProps) => {

  const { providerName, providerField, schedule, bio } = provider;
  const [selectedDay, setSelectedDay] = useState("");

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] grid 2xl:grid-cols-3 gap-8 py-5 px-12">
      <div className="2xl:border-r pr-5 flex flex-col gap-2 text-[#565656]">
        <h1 className="font-semibold text-2xl">{providerName}</h1>
        <span>{providerField}</span>
        <span className="pt-2 font-semibold text-xl">Available</span>
        <div className="w-full">
          {/* Dropdown Button */}
          <div className="relative">
            <button
              className="px-4 py-2 rounded-md shadow-[0px_1.23px_4.94px_0px_#D4E0EB] w-full text-left flex items-center justify-between outline-none"
              onClick={() =>
                setSelectedDay(selectedDay ? "" : "open")
              }
            >
              {selectedDay || "Select a Day"}
              <RiArrowDropDownLine />
            </button>

            {/* Dropdown List */}
            {selectedDay === "open" && (
              <div className="absolute z-10 bg-white border rounded-md mt-2 w-full shadow-lg">
                {Object.keys(schedule).map((day) => (
                  <div
                    key={day}
                    className="cursor-pointer p-2 hover:bg-primary rounded-md hover:text-white"
                    onClick={() => handleDaySelect(day)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day Schedule */}
          {selectedDay && selectedDay !== "open" && (
            <div className="pt-4">
              <span className="font-medium">
                {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}:
              </span>
              <div className="flex items-center gap-4 pt-2">
                <span className="shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md p-2 w-full text-center">
                  {schedule[selectedDay]?.startTime || "-"}
                </span>
                <span className="text-[#919191]">To</span>
                <span className="shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md p-2 w-full text-center">
                  {schedule[selectedDay]?.endTime || "-"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-[#565656] flex flex-col gap-2">
        <span className="font-semibold text-xl">Bio</span>
        {bio}
      </div>
      <div className="flex items-center justify-center w-full">
        <Button
          className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-7 w-full"
          onClick={handlePackges}
        >
          Book
        </Button>
      </div>
    </div>
  );
};

export default ServiceProviderInfo;
