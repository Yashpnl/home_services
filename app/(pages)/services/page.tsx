// @ts-nocheck

import AllServices from "@/app/pageContain/AllServices"
import axios from "axios";
import { cookies } from "next/headers";

const getAllServices = async (token: string, service: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categorys/category_list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        // Destructure data from response
        const { data: categoryList } = response?.data || {};

        // Filter and reduce data in one step
        const categorizedServices = categoryList
            ?.filter(item => (service ? item.id.toString() === service.toString() : true))
            ?.reduce((acc, item) => {
                acc[item.category_name] = item.subcategorys || [];
                return acc;
            }, {});
        return categorizedServices || null
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return null
    }
};

const page = async ({ searchParams }) => {

    const token = cookies().get("homeservice_token")?.value
    const service = searchParams.service
    const services = await getAllServices(token, service)

    return (
        <>
            <div className="width-container text-sm sm:text-base" >
                <span className="border-b border-black text-black font-semibold">Service</span>
            </div>
            <AllServices services={services} />
        </>
    )
}

export default page