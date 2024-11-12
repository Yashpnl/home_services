import CheckoutSection from "@/app/pageContain/ServiceProvider/checkoutSection/CheckoutSection"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"

const page = ({ params }: { params: { serviceProvider: string } }) => {
    const serviceId = params?.serviceProvider

    return (
        <>
            <Header />
            <CheckoutSection serviceId={serviceId} />
            <Footer />
        </>
    )
}

export default page