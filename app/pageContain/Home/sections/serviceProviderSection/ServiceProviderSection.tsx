// @ts-nocheck

"use client"
import { useEffect, useState } from "react";
import ProviderCard from "./components/ProviderCard"
import { useGlobalContext } from "@/Context/GlobalContext";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Provider {
    id: number;
    image_url: string;
    service_provider_first_name: string;
    category_name: string;
    servicepricings: any;
    serviceimages: any;
    price: number | { price: number };
    rating: string;
}

const ServiceProviderSection = () => {

    const router = useRouter()
    const { results = [] } = useGlobalContext();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
    }, [token]);

    const [showAll, setShowAll] = useState(false);
    const [allProviders, setAllProviders] = useState<Provider[]>([]);

    const handleToggleViewAll = () => {
        setShowAll(!showAll);
    };

    const getAllProviders = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/servicepricing/search_services`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setAllProviders(Array.isArray(response?.data?.data) ? response.data?.data : []);
        } catch (error) {
            error instanceof Error ? error.message : 'An unknown error occurred';
        }
    };

    useEffect(() => {
        getAllProviders();
    }, [token]);

    const providersToShow = results.length > 0 ? results : allProviders;

    return (
        <section className="w-[90%] mx-auto my-10 sm:my-20">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Service Providers</h3>
                <button
                    className="text-xl text-primary"
                    onClick={() => router.push(`/service-provider`)}
                >
                    View all
                </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pt-5">
                {providersToShow?.length > 0 ? (
                    providersToShow?.map((services) => (
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
        </section >
    );
}

export default ServiceProviderSection;
