import Image from "next/image"
import { ReactNode } from "react";

interface ProviderCardProps {
    providerImage: string;
    providerName: string;
    providerField: string;
    price: ReactNode;  
    rating: string | number;
    onClick?: () => void; 
}

const ProviderCard: React.FC<ProviderCardProps> = ({
    providerImage,
    providerName,
    providerField,
    price,
    rating,
    onClick,
}) => {

    return (
        <div className="flex items-center justify-center flex-col gap-3 rounded-lg shadow-[0px_1.23px_4.94px_0px_#D4E0EB] sm:w-[250px] p-3 cursor-pointer h-full w-full" 
            onClick={onClick}>
            <Image
                src={providerImage}
                alt={providerField}
                className="object-cover w-[230px] h-[100px] rounded-lg"
                width={100}
                height={100}
            />
            <p className="flex items-center gap-1 text-left w-full">
                <span className="border-r border-r-primary text-xl pr-5">{providerName}</span>
                <span className="text-xs font-medium pl-5">{providerField}</span>
            </p>
            <p className="flex items-center justify-between w-full">
                <span className="text-primary font-bold text-2xl">{price}</span>
                <span className="flex items-center gap-1">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.71337 0.427543C7.80049 0.14564 8.19951 0.14564 8.28663 0.427544L9.82321 5.40003C9.86205 5.52573 9.97827 5.61146 10.1098 5.61146H15.1131C15.4001 5.61146 15.5233 5.97565 15.2952 6.14985L11.222 9.26151C11.1221 9.33783 11.0804 9.46836 11.1175 9.58848L12.6672 14.6032C12.7534 14.8823 12.4305 15.1075 12.1984 14.9302L8.18212 11.862C8.0746 11.7799 7.9254 11.7799 7.81788 11.862L3.80159 14.9302C3.56948 15.1075 3.2466 14.8823 3.33284 14.6032L4.88249 9.58848C4.91961 9.46836 4.87789 9.33783 4.77798 9.26151L0.704771 6.14985C0.476736 5.97565 0.599929 5.61146 0.886889 5.61146H5.89016C6.02173 5.61146 6.13795 5.52573 6.17679 5.40003L7.71337 0.427543Z" fill="#0054A5" />
                    </svg>
                    {rating}
                </span>
            </p>
        </div >
    )
}

export default ProviderCard