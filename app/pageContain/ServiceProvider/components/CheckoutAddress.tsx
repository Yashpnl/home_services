"use client"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface CheckoutAddressProps {
    setPaymentComponent: (value: boolean) => void;
}

interface FormData {
    house_number: string;
    street_number: string;
    Complete_address: string;
}

const CheckoutAddress: React.FC<CheckoutAddressProps> = ({ setPaymentComponent }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem("checkoutAddressData");
        if (savedData) {
            const parsedData: FormData = JSON.parse(savedData);
            setValue("house_number", parsedData.house_number);
            setValue("street_number", parsedData.street_number);
            setValue("Complete_address", parsedData.Complete_address);
        }
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem("checkoutAddressData", JSON.stringify(data));
        setPaymentComponent(true);
    };

    return (
        <div className="grid xl:grid-cols-2 gap-10">
            <div className="flex flex-col gap-5 sm:gap-10">
                <h1 className="font-semibold text-xl">Enter your location address</h1>
                <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] p-7 flex flex-col gap-5 h-fit">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col justify-center gap-5 w-full">
                            <div className='flex flex-col md:flex-row justify-between gap-3 sm:gap-5 w-full'>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="house_number" className="text-[#0C3469]">House number</label>
                                    <input
                                        type="number"
                                        {...register("house_number", {
                                            required: "House number is required",
                                            minLength: {
                                                value: 2,
                                                message: "House number must be at least 2 digits long"
                                            }
                                        })}
                                        className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                        style={{
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            borderColor: 'rgba(223, 223, 223, 1)',
                                        }}
                                        placeholder="Enter house number"
                                    />
                                    {errors.house_number && <p className="text-red-600">{errors.house_number.message}</p>}
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="street_number" className="text-[#0C3469]">Street number</label>
                                    <input
                                        type="number"
                                        {...register("street_number", {
                                            required: "Street number is required",
                                            minLength: {
                                                value: 2,
                                                message: "Street number must be at least 2 digits long"
                                            }
                                        })}
                                        className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                        style={{
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            borderColor: 'rgba(223, 223, 223, 1)',
                                        }}
                                        placeholder="Enter street number"
                                    />
                                    {errors.street_number && <p className="text-red-600">{errors.street_number.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Complete_address" className="text-[#0C3469]">Complete Address</label>
                                <input
                                    type="text"
                                    {...register("Complete_address", {
                                        required: "Complete address is required",
                                        minLength: {
                                            value: 10,
                                            message: "Complete address must be at least 10 characters long"
                                        }
                                    })}
                                    className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                    style={{
                                        backgroundColor: 'rgba(249, 247, 249, 1)',
                                        borderColor: 'rgba(223, 223, 223, 1)',
                                    }}
                                    placeholder="Enter Complete Address"
                                />
                                {errors.Complete_address && <p className="text-red-600">{errors.Complete_address.message}</p>}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="text-[#0C3469] text-base font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 my-7 w-full">
                            Next
                        </Button>
                    </form>
                </div>
            </div>
            <div />
        </div>
    );
}

export default CheckoutAddress;
