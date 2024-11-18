"use client"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import { useGlobalContext } from "@/Context/GlobalContext"
import { ReactNode } from "react"

const LayoutHandler = ({ children }: { children: ReactNode }) => {
   
   const {homeserviceToken} = useGlobalContext()
    return (
        <>
            {homeserviceToken ?
                <div className="h-screen flex flex-col">
                    <Header />
                    <div className="flex-grow">
                        {children}
                    </div>
                    <Footer />
                </div>
                :
                <>
                    {children}
                </>
            }
        </>
    )
}

export default LayoutHandler