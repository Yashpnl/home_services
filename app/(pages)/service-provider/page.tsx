import AllServiceProvider from "@/app/pageContain/ServiceProvider/AllServiceProvider"
import axios from "axios";
import { cookies } from "next/headers";

interface Provider {
    id: number;
    image_url: string;
    service_provider_first_name: string;
    category_name: string;
    servicepricings: number;
    price: number;
    rating: string;
}

interface ApiResponse {
    data: Provider[];
}

const getAllServiceProviders = async (token: string | undefined) => {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.post<ApiResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/servicepricing/search_services`,
            {},
            { headers }
        );
        const ProvvidersData = response?.data?.data
        return ProvvidersData || null
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return null
    }
};

const page = async () => {

    const token = cookies().get("homeservice_token")?.value
    const ProvvidersData = await getAllServiceProviders(token)

    return (
        <>
            <div className="width-container text-sm sm:text-base" >
                <span className="border-b border-black text-black font-semibold">Service Providers</span>
            </div>
            <AllServiceProvider ProvvidersData={ProvvidersData} />
        </>
    )
}

export default page