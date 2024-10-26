import React from "react";

const ServiceProviderInfo = () => {
    return (
        <>
            <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] flex gap-8 p-5">
                <div className="border-r pr-5">
                    <h1>Lita Logan</h1>
                    <span>Plumber</span>
                    <span>Available</span>
                    <div>
                        <span>7:00AM</span>
                        <span>To</span>
                        <span>10:00PM</span>
                    </div>
                </div>
                <div>Bio</div>
            </div>
        </>
    );
};

export default ServiceProviderInfo;
