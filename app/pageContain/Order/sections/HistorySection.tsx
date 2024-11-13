import OrderDetailsCard from "../components/OrderDetailsCard"
import axios from 'axios';
import { useEffect, useState } from 'react';

export type Root = {
    id: number
    customer_id: number
    noti_status: string
    house_number: string
    street_number: string
    address: string
    services_id: number
    service_provider_id: number
    booking_date: string
    booking_hours: string
    payment_method: string
    order_status: string
    grand_amount: number
    created_at: string
    customer_name: string
    service_name: string
    service_provider_name: string
    email: string
    order_items: OrderItem[]
}

export type OrderItem = {
    id: number
    order_id: number
    customer_id: number
    services_id: number
    service_pricing_id: number
    service_provider_id: number
    quantity: number
    price: number
    total: number
    date: string
    created_at: string
    updated_at: string
    service_package: string
}

const HistorySection = () => {

    const [historyData, setHistoryData] = useState<Root[]>([]);

    const fetchOrderHistory = async () => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        const token = storedData?.token;

        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/order_history`, { headers });
                setHistoryData(res?.data?.data)
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        } else {
            console.log('No token found in localStorage.');
        }
    };

    useEffect(() => {
        fetchOrderHistory()
    })

    return (
        <div className='sm:py-20 w-[90%] mx-auto grid xl:grid-cols-2 gap-5'>
            {historyData?.map((orderdata) => (
                <OrderDetailsCard
                    serviceField={orderdata?.service_name}
                    paymentmethod={orderdata?.payment_method}
                    b_time={orderdata?.booking_hours}
                    b_date={orderdata?.booking_date}
                    providername={orderdata?.service_provider_name}
                    totalamount={orderdata?.grand_amount}
                    serviceprice={orderdata?.grand_amount}
                />
            ))}
        </div>
    )
}

export default HistorySection