"use client"
import Header from "@/components/header/Header"
import Tabbar from "../Order/components/Tabbar"
import Footer from "@/components/footer/Footer"
import { useState } from "react";
import ProfileSection from "./section/ProfileSection";

const Profile = () => {

    const [activeTab, setActiveTab] = useState("Profile Setting");

    return (
        <>
            <Header />
            <Tabbar firstTab='Profile Setting' activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Profile Setting" &&
                <ProfileSection />
            }
            <Footer />
        </>
    )
}

export default Profile