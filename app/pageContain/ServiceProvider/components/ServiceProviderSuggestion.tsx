// @ts-nocheck

"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import ProviderCard from "../../Home/sections/serviceProviderSection/components/ProviderCard";

const ServiceProviderSuggestion = () => {

    const [token, setToken] = useState(null);
    const [serviceProviderList, setServiceProviderList] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
        getAllServiceProviders()
    }, [token]);

    const getAllServiceProviders = async () => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/servicepricing/services_list`,
                { headers }
            );
            setServiceProviderList(response?.data?.data);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return null
        }
    };

    return (
        <div className="width-container mt-10">
            <h1 className="font-semibold text-2xl">Service Provider Suggestion </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pt-5">
                {serviceProviderList?.length > 0 ? (
                    serviceProviderList?.slice(0, 5)?.map((services) => (
                        <ProviderCard
                            key={services.id}
                            providerImage={services?.serviceimages[0]?.image_url}
                            providerName={services?.service_provider_first_name}
                            providerField={services?.category_name}
                            price={services?.servicepricings[0]?.price}
                            rating={services?.rating}
                            onClick={() => router.push(`/service-provider/${services?.id}`)}
                        />
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
    )
}

export default ServiceProviderSuggestion