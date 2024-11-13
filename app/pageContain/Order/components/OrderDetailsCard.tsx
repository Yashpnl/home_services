
const OrderDetailsCard = ({ serviceField, paymentmethod, b_time, b_date, providername, totalamount, serviceprice }: { serviceField: string, paymentmethod: string, b_time: string, b_date: string, providername: string, totalamount: number, serviceprice?: number }) => {
    return (
        <>
            <div className="p-7 bg-white max-w-2xl rounded-lg shadow-[0px_3.84px_15.35px_0px_#D4E0EB] flex flex-col gap-5">
                <div className="w-full flex items-center justify-between">
                    <h4 className="font-bold text-lg">{serviceField}</h4>
                    {serviceprice &&
                        <h4 className="font-bold text-lg text-[#28C2A0]">₹ {serviceprice} Paid</h4>
                    }
                </div>

                <div className="flex items-center justify-between gap-5">
                    <div className="w-1/2 flex flex-col items-start border-r pr-5 gap-5">
                        <p className="w-full flex items-center justify-between">
                            Payment Method
                            <span className="text-[#0054A5] font-semibold">{paymentmethod}</span>
                        </p>
                        <p className="w-full flex items-center justify-between">
                            Booking time
                            <span className="font-semibold">{b_time}</span>
                        </p>
                    </div>
                    <div className="w-1/2 flex flex-col items-start gap-5">
                        <p className="w-full flex items-center justify-between">
                            Booking date
                            <span className="font-semibold">{b_date}</span>
                        </p>
                        <p className="w-full flex items-center justify-between">
                            Service Provider name
                            <span className="text-[#0054A5] underline font-semibold">{providername}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <p className="font-medium">Total Order Amout </p>
                    <p className="font-bold text-2xl text-primary">₹ {totalamount}</p>
                </div>
            </div>
        </>
    )
}

export default OrderDetailsCard