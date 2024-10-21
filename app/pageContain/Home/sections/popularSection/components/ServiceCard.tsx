import { ReactNode } from "react"

const ServiceCard = ({ serviceicon, servicename }: { serviceicon: ReactNode, servicename: string }) => {
    return (
        <div className=" flex items-center justify-between flex-col min-h-[200px] h-[200px] px-10 rounded-sm"
            style={{ boxShadow: '0px 1.23px 4.94px 0px #D4E0EB' }}>
            <span className="pt-8">{serviceicon}</span>
            <p className="pb-4">{servicename}</p>
        </div >
    )
}

export default ServiceCard