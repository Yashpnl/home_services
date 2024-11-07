"use client"
import { useEffect, useState } from "react";
import ServiceCard from "./components/ServiceCard"
import { apiFetch } from "@/lib/apiFetch";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/Context/GlobalContext";

const PopularSection = () => {

    const [showAll, setShowAll] = useState(false);
    const [allServices, setAllServices] = useState([]);
    const initialServicesToShow = 8;
    const { results } = useGlobalContext();

    const handleToggleViewAll = () => {
        setShowAll(!showAll);
    };

    const getAllServices = async () => {
        try {
            const response = await apiFetch('/categorys/category_details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("homeservice_token")}`
                },
            });

            setAllServices(response?.data)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        }
    };

    useEffect(() => {
        getAllServices();
    }, [results]);

    return (
        <>
            {results?.length > 0 ? '' :
                <section className="w-[90%] mx-auto mt-20">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Popular Services</h3>
                        <button
                            className="text-xl text-primary"
                            onClick={handleToggleViewAll}
                        >
                            {allServices?.length >= initialServicesToShow ?
                                `${showAll ? 'View less' : 'View all'}` : ''
                            }
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
                        {allServices?.slice(0, showAll ? allServices.length : initialServicesToShow).map((services, serviceskey) => (
                            <ServiceCard
                                key={serviceskey}
                                serviceicon={services?.category_url}
                                servicename={services?.category_name}
                            />
                        ))}
                    </div>
                </section>
            }
        </>
    );
};

export default PopularSection;