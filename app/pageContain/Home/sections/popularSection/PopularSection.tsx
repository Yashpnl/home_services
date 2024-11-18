// @ts-nocheck

"use client"
import { useEffect, useState } from "react";
import ServiceCard from "./components/ServiceCard"
import { useGlobalContext } from "@/Context/GlobalContext";
import axios from "axios";
import { useRouter } from "next/navigation";

type Service = {
    category_url: string;
    category_name: string;
};

const PopularSection = () => {

    const router = useRouter()
    const [showAll, setShowAll] = useState(false);
    const [allServices, setAllServices] = useState<Service[]>([]);
    const initialServicesToShow = 8;
    const { results } = useGlobalContext();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
    }, [token]);


    const getAllServices = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categorys/category_details`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            setAllServices(response?.data?.data)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        }
    };

    useEffect(() => {
        getAllServices();
    }, [results, token]);

    return (
        <>
            <section className="w-[90%] mx-auto mt-10 sm:mt-20">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Popular Services</h3>
                    <button
                        className="text-xl text-primary"
                        onClick={() => router.push(`/services`)}
                    >
                        View all
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
                    {allServices?.length > 0 ? (
                        allServices.map((service, index) => (
                            <ServiceCard
                                key={index}
                                serviceicon={service?.category_url}
                                servicename={service?.category_name}
                                onClick={() => router.push(`/services?service=${service?.id}`)}
                            />
                        ))
                    ) : (
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <div
                                key={index}
                                className="h-[200px] px-10 rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] cursor-pointer bg-gray-200 animate-pulse"
                            />
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default PopularSection;