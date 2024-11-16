// @ts-nocheck

import Link from "next/link";
import ProviderCard from "../../Home/sections/serviceProviderSection/components/ProviderCard";

const ServiceVendor = ({ vendors }) => {

  return (
    <>
      <section className="w-[90%] mx-auto mt-10">
        {vendors?.length > 0 ? vendors?.map((services) => (
          <Link href={`/service-provider/${services?.id}`}>
            <ProviderCard
              key={services.id}
              providerImage={services?.serviceimages[0]?.image_url}
              providerName={services?.service_provider_first_name}
              providerField={services?.service_name}
              price={services?.servicepricings[0]?.price}
              rating={services?.rating}
            />
          </Link>
        ))
          :
          <div className="flex items-center justify-center w-full h-full sm:text-xl">
            No Service Found
          </div>
          // <div className="bg-gray-300 animate-pulse rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] w-[250px] h-[250px] p-3 cursor-pointer" />
        }
      </section>
    </>
  )
}

export default ServiceVendor