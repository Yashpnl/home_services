// @ts-nocheck

"use client"
import Link from "next/link"
import ServiceCard from "../Home/sections/popularSection/components/ServiceCard"

const AllServices = ({ services }) => {

    return (
        <>
            <section className="w-[90%] mx-auto">
                {services && Object.keys(services).map(category => {
                    const subServices = services[category]
                    return (
                        <>
                            <h2 className="font-semibold text-xl pt-5">{category}</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-5 pt-5">
                                {subServices.map(item => {
                                    return (
                                        <>
                                            <Link href={`/services/vendors/${item.id}`}>
                                                <ServiceCard
                                                    key={`service_${item.id}`}
                                                    serviceicon={item?.subcategory_url}
                                                    servicename={item?.subcategory_name}
                                                />
                                            </Link>
                                        </>
                                    )
                                })}
                            </div >
                        </>
                    )
                })}

            </section>


        </>
    )
}

export default AllServices
