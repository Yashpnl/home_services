import Image from "next/image"

const ServiceCard = ({ serviceicon, servicename, onClick }: { serviceicon: string, servicename: string, onClick?: () => void }) => {
    return (
        <div className="flex items-center justify-between flex-col gap-1 min-h-[200px] h-[200px] px-10 rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] cursor-pointer"
            onClick={onClick}>
            <Image
                src={serviceicon}
                alt={servicename}
                width={100}
                height={100}
                className="pt-8"
            />
            <p className="pb-4">{servicename}</p>
        </div >
    )
}

export default ServiceCard