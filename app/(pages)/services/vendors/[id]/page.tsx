// @ts-nocheck

import ServiceVendor from "@/app/pageContain/AllServices/Vendors";
import axios from "axios";
import { cookies } from "next/headers";

const getFilterVendors = async (token, Id) => {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/servicepricing/search_services`,
            {},
            { headers }
        );

        const filterVendorsData = response?.data?.data?.filter(subcategory => subcategory?.subcategory_id?.toString() === Id.toString())
        return filterVendorsData || null

    } catch (error) {
        console.error("Error fetching provider:", error);
        return null
    }
}

const page = async ({ params }) => {

    const token = cookies().get("homeservice_token")?.value
    const Id = params.id
    const vendors = await getFilterVendors(token, Id)

    return (
        <>
            <div className="width-container" >
                Service  &gt; <span className="border-b border-black text-black font-semibold"> Vendor</span>
            </div>
            <ServiceVendor vendors={vendors} />
        </>
    )
}

export default page