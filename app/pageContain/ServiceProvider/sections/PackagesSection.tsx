import { Button } from "@/components/ui/button"

const PackagesSection = ({ packageName, description, price }: { packageName: string, description: string, price: string }) => {
    return (
        <>
            <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-12">
                <h1 className="font-semibold text-2xl">Packages</h1>

                <div className="grid 2xl:grid-cols-2 gap-5 pt-7">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5 max-w-fit px-6 py-4 border border-[#0000001A] rounded-md">
                            <span className="font-medium">
                                {packageName || "silver package"}
                            </span>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-xs">{description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, optio!'}</span>
                                <span>stars</span>
                            </div>
                            <span className="text-lg">₹ {price || '2000 '}</span>
                        </div>
                    </div>


                    <div className="flex flex-col gap-7 p-7 rounded-xl shadow-[0px_1.23px_4.94px_0px_#D4E0EB]">
                        <h2>Cart</h2>
                        <div className="flex flex-col gap-5">
                            <span className="font-medium">
                                {packageName || "silver package"}
                            </span>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-xs">{description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, optio!'}</span>
                                <span>stars</span>
                            </div>
                            <span className="text-lg">₹ {price || '2000 '}</span>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Button className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-7 sm:px-20" 
                            >
                                View Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackagesSection