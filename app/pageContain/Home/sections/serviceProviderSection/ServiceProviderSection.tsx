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
    const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
    const token = storedData?.token;

    const [showAll, setShowAll] = useState(false);
    const [allProviders, setAllProviders] = useState<Provider[]>([]);
    const initialServicesToShow = 5;

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
    }, []);

    const providersToShow = results.length > 0 ? results : allProviders;

    return (
        <section className="w-[90%] mx-auto my-20">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Service Providers</h3>
                <button
                    className="text-xl text-primary"
                    onClick={handleToggleViewAll}
                >
                    {providersToShow?.length >= initialServicesToShow ?
                        `${showAll ? 'View less' : 'View all'}` : ''
                    }
                </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pt-5">
                {providersToShow?.slice(0, showAll ? providersToShow.length : initialServicesToShow)?.map((services) => (
                    <ProviderCard
                        key={services.id}
                        providerImage={services?.serviceimages[0]?.image_url}
                        providerName={services?.service_provider_first_name}
                        providerField={services?.category_name}
                        price={services?.servicepricings[0]?.price}
                        rating={services?.rating}
                        onClick={() => router.push(`/service-provider/${services?.id}`)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ServiceProviderSection;
