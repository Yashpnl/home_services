'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { FiLoader } from 'react-icons/fi';
import { useGlobalContext } from '@/Context/GlobalContext';
import axios from 'axios';
import Cookies from "js-cookie";

const Otp = () => {

    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false)
    const { confirmationResult, setHomeserviceToken } = useGlobalContext();
    const [error, setError] = useState<string | null>(null);

    // Extract form data from session storage
    const [first_name, setFirstName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [country_code, setCountryCode] = useState<string | null>(null);
    const [phone_number, setPhoneNumber] = useState<string | null>(null);

    useEffect(() => {
        setFirstName(sessionStorage.getItem('first_name'));
        setEmail(sessionStorage.getItem('email'));
        setPassword(sessionStorage.getItem('password'));
        setCountryCode(sessionStorage.getItem('country_code'));
        setPhoneNumber(sessionStorage.getItem('phone_number'));
    }, []);

    const verifyOtp = async () => {

        if (confirmationResult) {
            setLoading(true)
            try {
                await confirmationResult.confirm(otp);
                await registerApi();
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error verifying OTP:", error);
                toast.error("Verification failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const registerApi = async () => {
        const formData = { first_name, email, password, phone_number, country_code };
        
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/customer_register`,
            formData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response?.data?.success) {
            toast.success("Registration successful")
            Cookies.set("homeservice_token", response?.data?.data?.token);
            const userData = {
                token: response?.data?.data?.token,
                username: response?.data?.data?.customer?.firstName,
                userId: response?.data?.data?.customer?.id
            };

            localStorage.setItem("homeservice_userData", JSON.stringify(userData));
            setHomeserviceToken(response?.data?.data?.token)
            router.push("/");
        } else {
            setError('Sign-up failed. Please try again.');
            toast.error('Sign-up failed. Please try again.');
        }
    }


    return (
        <main className="container w-full min-h-screen grid xl:grid-cols-2 lg:gap-28 place-content-center bg-white px-5 sm:px-10">
            <Image
                src={signin}
                alt="home services"
                className="hidden xl:block w-full h-full object-cover rounded-xl p-10"
                width={800}
                height={900}
                quality={100}
            />
            <div className="bg-white w-full mx-auto sm:w-[685px] lg:max-w-[685px] px-16 xl:px-24 py-10 xl:py-14 border-3 border-white flex flex-col rounded-2xl lg:my-16 shadow-[0px_1.27px_63.56px_0px_#00000026] backdrop-blur-[89.37px] min-h-screen sm:min-h-fit">
                <div className='xl:hidden flex items-center justify-center gap-5 pt-2'>
                    <Image src={logo} alt="home services" width={50} height={50} quality={100} />
                    <h2 className="text-xl sm:text-3xl text-[#181C32] font-semibold">Home Services</h2>
                </div>
                <h2 className="text-xl sm:text-3xl text-[#181C32] font-medium pt-10 xl:pt-16">Sign Up</h2>
                <p className="flex items-center gap-1 pt-8 sm:pt-10">
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                    <span className="whitespace-nowrap text-[#A1A5B7]">Enter your OTP to verify</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

                <div className='flex items-center justify-center py-10 w-full'>
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button
                    onClick={verifyOtp}
                    className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-4 rounded-full py-4 sm:py-5"
                    disabled={otp.length !== 6}
                >
                    {loading ? <FiLoader className='animate-spin size-10' /> : 'Verify OTP'}
                </Button>
            </div>
        </main>
    );
};

export default Otp;
