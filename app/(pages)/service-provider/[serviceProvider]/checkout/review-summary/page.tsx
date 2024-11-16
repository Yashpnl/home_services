import ReviewSummarySection from "@/app/pageContain/ServiceProvider/reviewSummarySection/ReviewSummarySection"

const page = () => {
    return (
        <>
            <div className="width-container text-sm sm:text-base" >
                ServiceProvider  &gt; Checkout &gt; <span className="border-b border-black text-black font-semibold">Review Summary</span>
            </div>
            <ReviewSummarySection />
        </>
    )
}

export default page