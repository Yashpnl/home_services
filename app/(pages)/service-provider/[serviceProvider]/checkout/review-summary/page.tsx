import ReviewSummarySection from "@/app/pageContain/ServiceProvider/reviewSummarySection/ReviewSummarySection"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"

const page = () => {
    return (
        <>
            <div className="h-screen flex flex-col">
                <Header />
                <div className="flex-grow">
                    <ReviewSummarySection />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default page