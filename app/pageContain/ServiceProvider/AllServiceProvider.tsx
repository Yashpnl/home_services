// @ts-nocheck

import Link from 'next/link'
import ProviderCard from '../Home/sections/serviceProviderSection/components/ProviderCard'

const AllServiceProvider = ({ ProvvidersData }) => {
    return (
        <>
            <div className="width-container mt-10">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pt-5">
                    {ProvvidersData?.length > 0 ? (
                        ProvvidersData?.map((services) => (
                            <Link href={`/service-provider/${services?.id}`}>
                                <ProviderCard
                                    key={services.id}
                                    providerImage={services?.serviceimages[0]?.image_url}
                                    providerName={services?.service_provider_first_name}
                                    providerField={services?.category_name}
                                    price={services?.servicepricings[0]?.price}
                                    rating={services?.rating}
                                />
                            </Link>
                        ))
                    ) : (
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <div
                                key={index}
                                className="h-[200px] px-10 rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] cursor-pointer bg-gray-200 animate-pulse"
                            />
                        ))
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default AllServiceProvider