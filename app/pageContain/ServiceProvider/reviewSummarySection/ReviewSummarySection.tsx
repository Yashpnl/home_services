"use client"
import { Button } from "@/components/ui/button"
import axios from "axios";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ReviewSummarySection = () => {

    const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
    const token = storedData?.token;
    const router = useRouter()
    const storedProviderData = JSON.parse(localStorage.getItem("providerData") || "{}");
    const storedBookingData = JSON.parse(localStorage.getItem("bookingDetails") || "{}");
    const [product, setProduct] = useState<any[]>([]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartIten') || '[]');

        // Prepare the `product` array based on `cartItems`
        const formattedProduct = cartItems.map((item: any) => ({
            service_pricing_id: item.service_pricing_id,
            quantity: item.quantity,
            service_package: item.packageName
        }));

        // Set `product` array in state
        setProduct(formattedProduct);
    }, []);


    const bookingDate = storedBookingData?.booking_date
        ? new Date(storedBookingData.booking_date).toISOString().split("T")[0]
        : null;

    const checkoutAddressData = JSON.parse(localStorage.getItem("checkoutAddressData") || "{}");
    const addressString = `${checkoutAddressData.house_number}, ${checkoutAddressData.street_number}, ${checkoutAddressData.Complete_address}`;

    const createBooking = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/order`,
                {
                    "services_id": storedProviderData?.providerId,
                    "service_provider_id": storedProviderData?.serviceProviderId,
                    "house_number": checkoutAddressData?.house_number,
                    "street_number": checkoutAddressData?.street_number,
                    "address": checkoutAddressData?.Complete_address,
                    "booking_date": bookingDate,
                    "booking_hours": storedBookingData?.selectedServiceType,
                    "payment_method": "cash",
                    "data": [
                        {
                            "services_id": storedProviderData?.providerId,
                            "product": product
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                router.push("/")
            }
        } catch (error) {
            error instanceof Error ? error.message : 'An unknown error occurred';
        }
    }

    return (
        <>
            <div className="width-container flex flex-col gap-5 lg:flex-row items-center">
                <div className="rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit min-w-[340px] sm:min-w-[500px] w-full min-h-[300px]">
                    <div className="flex justify-between items-center w-full border-b pb-3">
                        <span className="md:text-2xl font-semibold">{storedProviderData?.providerName}</span>
                        <Image
                            src={storedProviderData?.providerImage}
                            alt={storedProviderData?.providerName}
                            width={100}
                            height={150}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full pt-5 gap-5">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[#919191] font-medium text-lg">Service Type</span>
                            <span className="text-[#565656] font-semibold text-lg">{storedProviderData?.providerCategory}</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[#919191] font-medium text-lg">Payment Method</span>
                            <span className="text-[#565656] font-semibold text-lg">{'COD'}</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit min-w-[340px] sm:min-w-[500px] w-full min-h-[300px]">
                    <div className="flex flex-col justify-between items-center w-full gap-3 border-b pb-5">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                            <span className="text-[#919191] font-medium text-lg">Address</span>
                            <span className="text-[#565656] font-semibold text-lg">{addressString}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                            <span className="text-[#919191] font-medium text-lg">Booking date</span>
                            <span className="text-[#565656] font-semibold text-lg">{bookingDate}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                            <span className="text-[#919191] font-medium text-lg">Booking Hours</span>
                            <span className="text-[#565656] font-semibold text-lg">{storedBookingData?.selectedServiceType}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pt-5">
                        <span className="text-[#919191] font-medium text-lg">Total</span>
                        <span className="text-[#565656] font-semibold text-lg">₹{storedBookingData?.totalPrice}</span>
                    </div>

                    <Button
                        onClick={createBooking}
                        className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 sm:px-20 mt-6 w-full">
                        Book
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ReviewSummarySection


// const [successComponent, setSuccessComponent] = useState(false);
//  {successComponent ?
//                 <>
//                     <div className="width-container flex flex-col gap-5 md:flex-row">
//                         <div className="rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-7 px-14 h-fit flex flex-col md:flex-row justify-between items-center gap-10">

//                             <div className="flex flex-col gap-5 items-center justify-center">
//                                 <div className="flex flex-col gap-3 items-center justify-center">
//                                     <svg width="77" height="76" viewBox="0 0 77 76" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//                                         <rect x="0.570312" y="0.620605" width="75.8132" height="74.5282" fill="url(#pattern0_419_1062)" />
//                                         <defs>
//                                             <pattern id="pattern0_419_1062" patternContentUnits="objectBoundingBox" width="1" height="1">
//                                                 <use xlinkHref="#image0_419_1062" transform="matrix(0.00542373 0 0 0.00551724 -0.101695 -0.12069)" />
//                                             </pattern>
//                                             <image id="image0_419_1062" width="225" height="225" xlinkHref="data:image/png;base64,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" />
//                                         </defs>
//                                     </svg>

//                                     <h3 className="font-bold text-xl text-[#0C3469]">
//                                         Payment successful
//                                     </h3>
//                                 </div>
//                                 <h3 className="font-semibold text-lg text-center text-black w-full md:w-[70%]">
//                                     Payment of Plumber service ₹2500 has paid successfully
//                                 </h3>
//                             </div>
//                             <div>
//                                 <Button
//                                     onClick={() => router.push('/')}
//                                     className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 sm:px-20 mt-6 w-full">
//                                     Home
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//                 : }