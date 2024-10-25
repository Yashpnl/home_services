const Tabbar = ({ firstTab, secondTab, activeTab, setActiveTab }: { firstTab: string, secondTab?: string | undefined, activeTab: any, setActiveTab: any }) => {

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="w-[90%] mx-auto bg-white shadow-[0px_3.84px_15.35px_0px_#D4E0EB] flex flex-col">
                <div className='flex items-center text-center justify-around sm:justify-start sm:gap-5 sm:px-16'>
                    <h2 className={`text-primary cursor-pointer sm:text-xl flex flex-col  items-center justify-center ${activeTab === firstTab ? "font-bold" : "font-normal"}`}
                        onClick={() => handleTabClick(firstTab)}>
                        <span className="pt-5">{firstTab}</span>


                        {activeTab === firstTab ? (
                            <svg className="w-1/2 sm:w-full h-[35px]" viewBox="0 0 221 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M182.246 35H35.6114L1.52588e-05 0H221L182.246 35Z" fill="url(#paint0_linear_219_4895)" fill-opacity="0.29" />
                                <path d="M182.246 35H35.611C35.611 32.2386 37.8496 30 40.611 30H177.246C180.008 30 182.246 32.2386 182.246 35Z" fill="#F9AA58" />
                                <defs>
                                    <linearGradient id="paint0_linear_219_4895" x1="111.024" y1="35" x2="111.024" y2="-9.17431e-07" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F9AA58" />
                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : <span className="w-1/2 sm:w-[221px] h-[35px]" />}
                    </h2>
                    <h2 className={`text-primary cursor-pointer sm:text-xl flex flex-col  items-center justify-center ${activeTab === secondTab ? "font-bold" : "font-normal"}`}
                        onClick={() => handleTabClick(secondTab)}>
                        <span className="pt-5">{secondTab}</span>

                        {activeTab === secondTab ? (
                            <svg className="w-1/2 sm:w-full h-[35px]" viewBox="0 0 221 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M182.246 35H35.6114L1.52588e-05 0H221L182.246 35Z" fill="url(#paint0_linear_219_4895)" fill-opacity="0.29" />
                                <path d="M182.246 35H35.611C35.611 32.2386 37.8496 30 40.611 30H177.246C180.008 30 182.246 32.2386 182.246 35Z" fill="#F9AA58" />
                                <defs>
                                    <linearGradient id="paint0_linear_219_4895" x1="111.024" y1="35" x2="111.024" y2="-9.17431e-07" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F9AA58" />
                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : <span className="w-1/2 sm:w-[221px] h-[35px]" />}
                    </h2>
                </div>
            </div>
        </>
    )
}

export default Tabbar;
