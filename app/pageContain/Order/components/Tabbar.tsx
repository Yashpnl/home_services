"use client"
import { useState } from 'react';
import CurrentOrderSection from '../sections/CurrentOrderSection';
import HistorySection from '../sections/HistorySection';

const Tabbar = () => {

    const [activeTab, setActiveTab] = useState("CurrentOrder");
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className="w-[90%] mx-auto bg-white shadow-[0px_3.84px_15.35px_0px_#D4E0EB] flex flex-col">
                <div className='flex items-center text-center gap-24 p-5 px-16'>
                    <h2 className={`text-primary cursor-pointer ${activeTab ? "font-bold" : "font-normal"}`}
                        onClick={() => handleTabClick("CurrentOrder")}>
                        Current Order</h2>
                    <h2 className={`text-primary cursor-pointer ${activeTab ? "font-bold" : "font-normal"}`}
                        onClick={() => handleTabClick("History")}>
                        History</h2>
                </div>

                <div className="px-16 flex gap-20">
                    <div className={`w-24 h-1  ${activeTab === "CurrentOrder" ? "bg-secondary" : "bg-transparent"}`} />
                    <div className={`w-24 h-1  ${activeTab === "History" ? "bg-secondary" : "bg-transparent"}`} />
                </div>
            </div>

            {
                activeTab === "CurrentOrder" ?
                    <CurrentOrderSection />
                    :
                    <HistorySection />
            }
        </>
    )
}

export default Tabbar