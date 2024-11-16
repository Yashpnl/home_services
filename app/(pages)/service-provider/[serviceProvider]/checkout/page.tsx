// @ts-nocheck

import CheckoutSection from "@/app/pageContain/ServiceProvider/checkoutSection/CheckoutSection"

const page = ({ params }: { params: { serviceProvider: string } }) => {

    const serviceId = params?.serviceProvider

    return (
        <>
            <div className="width-container" >
                ServiceProvider  &gt; <span className="border-b border-black text-black font-semibold"> Checkout</span>
            </div>
            <CheckoutSection serviceId={serviceId} />
        </>
    )
}

export default page