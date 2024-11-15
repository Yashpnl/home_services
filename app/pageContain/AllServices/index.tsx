// @ts-nocheck

"use client"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ServiceCard from "../Home/sections/popularSection/components/ServiceCard"

const AllServices = () => {

    const router = useRouter()
    const searchparams = useSearchParams()
    const id = searchparams?.get('service')
    const [token, setToken] = useState(null);
    const [filterServiceData, setFilterServiceData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
    }, [token]);


    const getAllServices = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categorys/category_list`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setCategoryData(response.data.data);
            console.log(response.data.data, "response.data.data");

            const filterServices = response.data.data.find(subcategorys => subcategorys?.id === Number(id));
            setFilterServiceData(filterServices)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        }
    };

    useEffect(() => {
        getAllServices();
    }, [token, id]);

    return (
        <>
            <section className="w-[90%] mx-auto">
                {filterServiceData ?  
                <>
                 <h2 className="font-semibold text-xl pt-5">{filterServiceData?.category_name}</h2>
                 <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
                   {filterServiceData?.subcategorys?.map((service, index) => (
                                    <ServiceCard
                                        key={index}
                                        serviceicon={service?.subcategory_url}
                                        servicename={service?.subcategory_name}
                                        onClick={() => router.push(`/service-provider/${service?.id}`)}
                                        />
                                    ))}
                                    </div>
                 </>          
                            
                :
                <>
                {categoryData?.map((subcategory) => (
                    <>
                        <h2 className="font-semibold text-xl pt-5">{subcategory?.category_name}</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
                            {subcategory?.subcategorys?.map((detailSubcategory, index) => (
                                <ServiceCard
                                    key={index}
                                    serviceicon={detailSubcategory?.subcategory_url}
                                    servicename={detailSubcategory?.subcategory_name}
                                // onClick={() => router.push(`/service-provider/${detailSubcategory?.id}`)}
                                />
                            ))}
                        </div >
                    </>
                ))
                }
                </>
                }
            </section>

           
        </>
    )
}

export default AllServices


{/* {filterServiceData?.subcategorys?.length > 0 ? (
                                filterServiceData?.subcategorys?.map((service, index) => (
                                    <ServiceCard
                                        key={index}
                                        serviceicon={service?.subcategory_url}
                                        servicename={service?.subcategory_name}
                                        onClick={() => router.push(`/service-provider/${service?.id}`)}
                                    />
                                ))
                            ) : (
                                [1, 2, 3, 4, 5].map((_, index) => (
                                    <div
                                        key={index}
                                        className="min-h-[200px] h-[200px] px-10 rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] cursor-pointer bg-gray-200 animate-pulse"
                                    />
                                ))
                            )} */}


                            // <>
                            // //     <h2 className="font-semibold text-xl">{filterServiceData?.category_name}</h2>
                            // //     <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
        
                            // //         {categoryData?.map((category, index) => (
                            //             <ServiceCard
                            //                 key={index}
                            //                 serviceicon={category?.category_url}
                            //                 servicename={category?.category_name}
                            //                 onClick={() => router.push(`/services?service=${category?.id}`)}
                            //             />
                            //         ))}
                            //     </div>
                            // </>