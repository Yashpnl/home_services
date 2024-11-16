"use client"
import Tabbar from "../Order/components/Tabbar"
import { useState } from "react";
import ProfileSection from "./section/ProfileSection";

const Profile = () => {

    const [activeTab, setActiveTab] = useState("Profile Setting");

    return (
        <>
            <Tabbar firstTab='Profile Setting' activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Profile Setting" &&
                <ProfileSection />
            }
        </>
    )
}

export default Profile