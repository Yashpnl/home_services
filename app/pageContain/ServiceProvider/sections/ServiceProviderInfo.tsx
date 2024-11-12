import { Button } from "@/components/ui/button";

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
  console.log(schedule, "schedule");

  return (
    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] grid 2xl:grid-cols-3 gap-8 py-5 px-12">
      <div className="2xl:border-r pr-5 flex flex-col gap-2 text-[#565656]">
        <h1 className="font-semibold text-2xl">{providerName}</h1>
        <span>{providerField}</span>
        <span className="pt-2 font-semibold text-xl">Available</span>
        {Object.entries(schedule).map(([day, time]) => (
          <div key={day} className="pt-2">
            <span className="font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
            <div className="flex items-center gap-4">
              <span className="shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md p-2 w-full text-center">
                {time.startTime || "-"}
              </span>
              <span className="text-[#919191]">To</span>
              <span className="shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md p-2 w-full text-center">
                {time.endTime || "-"}
              </span>
            </div>
          </div>
        ))}
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
