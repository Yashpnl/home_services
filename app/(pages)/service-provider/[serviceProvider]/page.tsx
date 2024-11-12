import ServiceProvider from "@/app/pageContain/ServiceProvider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import { cookies } from 'next/headers';

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

const page = async ({ params }: { params: { serviceProvider: string } }) => {
  
  const token = cookies().get("homeservice_token")?.value;
  
  if (!token) {
    console.error("Token not found");
    return <p>Unauthorized</p>;
  }
  
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
    
    const filteredProvider = response.data.data.find(provider => provider.id === Number(params.serviceProvider));
    
    console.log(filteredProvider,"paramsparamsparams");
    if (!filteredProvider) {
      console.log("Provider not found for ID:", params.serviceProvider);
      return <p>Provider not found</p>;
    }

    return (
      <>
        <Header />
        <ServiceProvider provider={filteredProvider} providerId={params.serviceProvider} />
        <Footer />
      </>
    );

  } catch (error) {
    console.error("Error fetching provider:", error);
    return <p>Failed to load provider data</p>;
  }
};

export default page;
