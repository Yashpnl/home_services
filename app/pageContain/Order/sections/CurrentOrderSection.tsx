import OrderDetailsCard from '../components/OrderDetailsCard'


const CurrentOrder = [
    {
        serviceField: "Home Cleaning",
        paymentmethod: "COD",
        serviceprice:"2500",
        b_time: "11:30 AM", b_date: "23/10/2024", providername: "Emaily jani", totalamount: "2500"
    },
    {
        serviceField: "Home Cleaning",
        paymentmethod: "COD",
        b_time: "11:30 AM", b_date: "23/10/2024", providername: "Emaily jani", totalamount: "2500"
    },
    {
        serviceField: "Home Cleaning",
        paymentmethod: "COD",
        b_time: "11:30 AM", b_date: "23/10/2024", providername: "Emaily jani", totalamount: "2500"
    },
    {
        serviceField: "Home Cleaning",
        paymentmethod: "COD",
        b_time: "11:30 AM", b_date: "23/10/2024", providername: "Emaily jani", totalamount: "2500"
    },
]

const CurrentOrderSection = () => {
    return (
        <div className='sm:py-20 w-[90%] mx-auto grid xl:grid-cols-2 gap-5'>
            {CurrentOrder?.map((orderdata) => (
                <OrderDetailsCard
                    serviceField={orderdata?.serviceField}
                    paymentmethod={orderdata?.paymentmethod}
                    b_time={orderdata?.b_time}
                    b_date={orderdata?.b_date}
                    providername={orderdata?.providername}
                    totalamount={orderdata?.totalamount}
                />
            ))}
        </div>
    )
}

export default CurrentOrderSection