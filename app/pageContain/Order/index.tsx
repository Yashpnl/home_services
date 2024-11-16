"use client"
import Tabbar from "./components/Tabbar"
import { useState } from "react"
import CurrentOrderSection from "./sections/CurrentOrderSection"
import HistorySection from "./sections/HistorySection"

const Order = () => {

    const [activeTab, setActiveTab] = useState("Current Order");

    return (
        <>
            <Tabbar firstTab="Current Order" secondTab="History" activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Current Order" ?
                    <CurrentOrderSection />
                    :
                    <HistorySection />
            }
        </>
    )
}

export default Order