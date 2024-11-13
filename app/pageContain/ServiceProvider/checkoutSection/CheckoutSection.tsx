// @ts-nocheck

"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import cod from '@/assets/cod.png'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import CheckoutAddress from "../components/CheckoutAddress"

// type PaymentMethod = 'GPay' | 'PayPal' | 'CreditCard' | 'UPI';


const CheckoutSection = ({ serviceId }: { serviceId: number }) => {

    const router = useRouter()
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedServiceType, setSelectedServiceType] = useState<string>('ALL');
    const [paymentComponent, setPaymentComponent] = useState(false);
    const [checkoutAddress, setCheckoutAddress] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
    const token = storedData?.token;

    // const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    // const handleSelectMethod = (method: PaymentMethod) => {
    //     setSelectedMethod(method);
    // };

    const cartIten = JSON.parse(localStorage.getItem('cartIten') || '[]');

    useEffect(() => {
        const calculatedTotal = cartIten?.reduce((sum, pkg) => sum + (pkg?.totalPrice || 0), 0);
        setTotalPrice(calculatedTotal); 
    }, [cartIten]);

    function createDateAsUTC(date: any) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }

    const onSubmit = async (e) => {
        try {
            const bookingDate = createDateAsUTC(new Date(e));

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/select_time_list`, {
                "services_id": serviceId,
                "booking_date": createDateAsUTC(new Date(e))
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setAvailableTimes(response?.data);
            // Store all values in a single object in local storage
            const bookingDetails = {
                selectedServiceType,
                booking_date: bookingDate,
                totalPrice,
            };

            localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

        } catch (error) {
            error instanceof Error ? error.message : 'An unknown error occurred';
        }
    };


    const getTiming = (e) => {
        setDate(e)
        onSubmit(e)
    }

    return (
        <>
            <div className="width-container">
                {checkoutAddress ?
                    <>
                        <div className="grid xl:grid-cols-2 gap-10">
                            {paymentComponent ?
                                <div className="flex flex-col gap-7">
                                    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit min-h-[188px]">
                                        {cartIten && cartIten?.map((pkg) => (
                                            <div className="flex flex-col sm:flex-row gap-5 justify-between">
                                                <div className="flex flex-col gap-5 lg:w-[60%] w-full">
                                                    <span className="text-xl font-semibold">{pkg?.packageName}</span>
                                                    <div className="flex gap-5 items-center justify-between w-full">
                                                        <span className="text-xs">{pkg?.description}</span>
                                                        <span className="bg-[#D4E0EB] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md size-10 flex items-center justify-center text-lg font-semibold">{pkg?.quantity}</span>
                                                    </div>
                                                </div>
                                                <span className="text-lg md:text-2xl font-semibold text-primary lg:w-[20%] w-full flex justify-center items-center">₹ {pkg?.totalPrice}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit">
                                        <span className="text-xl font-semibold">Select Payment Method</span>
                                        <div
                                            className={`flex items-center justify-between px-5 py-3 my-7 rounded-md cursor-pointer bg-[#0054A526] border border-[#0054A5]`}
                                        >
                                            <span className="flex items-center gap-10">
                                                <Image
                                                    src={cod}
                                                    alt="cod"
                                                    width={44}
                                                    height={31}
                                                />
                                                COD</span>
                                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5146 2.27591C10.7119 2.04755 10.8194 1.74551 10.8143 1.43342C10.8092 1.12132 10.6919 0.823554 10.4872 0.602838C10.2825 0.382123 10.0063 0.255694 9.71686 0.250188C9.4274 0.244681 9.14726 0.360527 8.93546 0.573319L4.51093 5.3438L2.69345 3.38421C2.48164 3.17142 2.20151 3.05557 1.91205 3.06108C1.62259 3.06658 1.34641 3.19301 1.1417 3.41373C0.936994 3.63444 0.819734 3.93221 0.814627 4.2443C0.80952 4.55639 0.916964 4.85844 1.11433 5.0868L3.72137 7.89769C3.93086 8.12329 4.21484 8.25 4.51093 8.25C4.80702 8.25 5.091 8.12329 5.30049 7.89769L10.5146 2.27591Z" fill="#0054A5" />
                                            </svg>
                                        </div>
                                        {/* <div className="grid grid-cols-2 grid-rows-2 py-7 gap-5">
                                        {['GPay', 'PayPal', 'CreditCard', 'UPI'].map((method) => (
                                            <div
                                                key={method}
                                                className={`flex items-center justify-between px-5 py-3 rounded-md border border-[#0054A526] cursor-pointer ${selectedMethod === method ? 'bg-[#0054A526] border-[#0054A5]' : ''}`}
                                                onClick={() => handleSelectMethod(method as PaymentMethod)}
                                            >
                                                <span className="flex items-center gap-10">
                                                    <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                        <rect y="0.25" width="28" height="24" fill="url(#pattern0_416_610)" />
                                                        <defs>
                                                            <pattern id="pattern0_416_610" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                                <use xlinkHref="#image0_416_610" transform="matrix(0.0078125 0 0 0.00911458 0 -0.0104167)" />
                                                            </pattern>
                                                            <image id="image0_416_610" width="128" height="112" xlinkHref="data:image/png;base64,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" />
                                                        </defs>
                                                    </svg>
                                                    {method}</span>
                                                {selectedMethod === method ?
                                                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.5146 2.27591C10.7119 2.04755 10.8194 1.74551 10.8143 1.43342C10.8092 1.12132 10.6919 0.823554 10.4872 0.602838C10.2825 0.382123 10.0063 0.255694 9.71686 0.250188C9.4274 0.244681 9.14726 0.360527 8.93546 0.573319L4.51093 5.3438L2.69345 3.38421C2.48164 3.17142 2.20151 3.05557 1.91205 3.06108C1.62259 3.06658 1.34641 3.19301 1.1417 3.41373C0.936994 3.63444 0.819734 3.93221 0.814627 4.2443C0.80952 4.55639 0.916964 4.85844 1.11433 5.0868L3.72137 7.89769C3.93086 8.12329 4.21484 8.25 4.51093 8.25C4.80702 8.25 5.091 8.12329 5.30049 7.89769L10.5146 2.27591Z" fill="#0054A5" />
                                                    </svg>
                                                    :
                                                    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.70013 2.27591C9.89749 2.04755 10.0049 1.74551 9.99983 1.43342C9.99472 1.12132 9.87746 0.823554 9.67275 0.602838C9.46804 0.382123 9.19186 0.255694 8.9024 0.250188C8.61295 0.244681 8.33281 0.360527 8.121 0.573319L3.69648 5.3438L1.879 3.38421C1.66719 3.17142 1.38705 3.05557 1.09759 3.06108C0.808136 3.06658 0.53196 3.19301 0.327251 3.41373C0.122541 3.63444 0.00528122 3.93221 0.000174072 4.2443C-0.00493308 4.55639 0.102511 4.85844 0.299872 5.0868L2.90692 7.89769C3.11641 8.12329 3.40039 8.25 3.69648 8.25C3.99256 8.25 4.27654 8.12329 4.48604 7.89769L9.70013 2.27591Z" fill="#0054A5" fill-opacity="0.15" />
                                                    </svg>

                                                }
                                            </div>
                                        ))}
                                    </div>  */}
                                        <Button
                                            onClick={() => router.push('/service-provider/5/checkout/review-summary')}
                                            className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 sm:px-20 w-full my-10">
                                            Book
                                        </Button>
                                    </div>
                                </div> :
                                <CheckoutAddress setPaymentComponent={setPaymentComponent} />
                            }
                        </div >
                    </> :
                    <>
                        <div className="grid xl:grid-cols-2 gap-10">
                            <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] p-7 flex flex-col gap-5 h-fit">
                                <h1 className="font-semibold text-xl">Account</h1>
                                <span className="text-sm">To book the service, please login or sign up</span>
                                <Link href={'/signin '} className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full p-2 flex items-center justify-center">
                                    Login
                                </Link>
                            </div>

                            <div className="flex flex-col gap-7">
                                <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit min-h-[188px] flex flex-col gap-5">
                                    {cartIten && cartIten?.map((pkg) => (
                                        <div className="flex flex-col sm:flex-row gap-5 justify-between">
                                            <div className="flex flex-col gap-5 lg:w-[60%] w-full">
                                                <span className="text-xl font-semibold">{pkg?.packageName}</span>
                                                <div className="flex gap-5 items-center justify-between w-full">
                                                    <span className="text-xs">{pkg?.description}</span>
                                                    <span className="bg-[#D4E0EB] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md size-10 flex items-center justify-center text-lg font-semibold">{pkg?.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="text-lg md:text-2xl font-semibold text-primary lg:w-[20%] w-full flex justify-center items-center">₹ {pkg?.totalPrice}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-5 w-full">
                                            <h1 className="font-semibold text-xl">Select Date</h1>
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={getTiming}
                                                className="rounded-md w-full shadow-[0px_1.23px_4.94px_0px_#D4E0EB]"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            <h1 className="font-semibold text-xl">Select Hours</h1>
                                            <div className="overflow-auto w-full h-[300px]">
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {availableTimes.length > 0 ? (
                                                        availableTimes.map((timeSlot, index) => {
                                                            if (timeSlot.available) {
                                                                const startHour = parseInt(timeSlot.start_time.split(":")[0]);
                                                                const startMinutes = timeSlot.start_time.split(":")[1];
                                                                const endHour = parseInt(timeSlot.end_time.split(":")[0]);
                                                                const endMinutes = timeSlot.end_time.split(":")[1];

                                                                const formatTime = (hour, minutes) => {
                                                                    const period = hour >= 12 ? "PM" : "AM";
                                                                    const formattedHour = hour % 12 || 12; // Convert 0 and 12-hour times to 12 for AM/PM format
                                                                    return `${formattedHour}:${minutes} ${period}`;
                                                                };

                                                                const startTime = formatTime(startHour, startMinutes);
                                                                const endTime = formatTime(endHour, endMinutes);
                                                                return (
                                                                    <button
                                                                        key={index}
                                                                        className={`px-4 py-2 text-sm font-medium text-[#0054A5] rounded-lg ${selectedServiceType === timeSlot.start_time
                                                                            ? 'bg-[#0054A5] text-white'
                                                                            : 'shadow-[0px_1px_4px_0px_#D4E0EB] text-primary'
                                                                            }`}
                                                                        onClick={() => setSelectedServiceType(timeSlot?.start_time)}
                                                                    >
                                                                        {startTime} - {endTime}
                                                                    </button>
                                                                );
                                                            }
                                                            return null;
                                                        })
                                                    ) : (
                                                        <p>No working hours available for this day.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setCheckoutAddress(true)}
                                        className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 sm:px-20 w-full my-20">
                                        Book
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div >


        </>
    )
}

export default CheckoutSection