import { Button } from "@/components/ui/button"
import Link from "next/link"

const CheckoutSection = () => {
    return (
        <>
            <div className="width-container">
                <div className="grid grid-cols-[35rem_1fr] gap-10">
                    <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] p-7 flex flex-col gap-5">
                        <h1 className="font-semibold text-xl">Account</h1>
                        <span className="text-sm">To book the service, please login or sign up</span>
                        <Link href={'/signup'} className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full p-3 flex items-center justify-center">
                            Login
                        </Link>
                    </div>

                    <div className="grid grid-rows-2 gap-7">
                        <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit">
                            <div className="flex gap-5 justify-between">
                                <div className="flex flex-col lg:w-[70%] w-full">
                                    <span className="font-medium">{'pkg.name'}</span>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xs">{'pkg.description'}</span>
                                        <span className="text-lg font-semibold">{'quantities[index]'}</span>
                                    </div>
                                </div>
                                <span className="text-lg font-semibold text-primary lg:w-[20%] w-full">₹ {'pkg.price'}</span>
                            </div>
                        </div>

                        <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-7 h-fit">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-5">
                                    <h1 className="font-semibold text-xl">Select Date</h1>
                                    calendar
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h1 className="font-semibold text-xl">Select Hours</h1>
                                    calendar
                                </div>
                            </div>
                            <Button className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-7 sm:px-20 w-full mt-10">
                                Book
                            </Button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default CheckoutSection