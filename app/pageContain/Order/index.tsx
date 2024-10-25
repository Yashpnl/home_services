"use client"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import Tabbar from "./components/Tabbar"
import { useState } from "react"
import CurrentOrderSection from "./sections/CurrentOrderSection"
import HistorySection from "./sections/HistorySection"

const Order = () => {

    const [activeTab, setActiveTab] = useState("Current Order");

    return (
        <>
            <Header />
            <Tabbar firstTab="Current Order" secondTab="History" activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Current Order" ?
                    <CurrentOrderSection />
                    :
                    <HistorySection />
            }
            <Footer />
        </>
    )
}

export default Order