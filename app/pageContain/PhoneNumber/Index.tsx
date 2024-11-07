'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { FiLoader } from 'react-icons/fi';
import { useGlobalContext } from '@/Context/GlobalContext';
import Cookies from "js-cookie";

interface UserData {
    token: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: UserData;
}

const PhoneNumber = () => {

    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { setConfirmationResult } = useGlobalContext();

    // Extract form data from session storage
    const first_name = sessionStorage.getItem('first_name')
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')

    const extractPhoneDetails = (fullPhoneNumber: string) => {
        const countryCode = fullPhoneNumber.substring(0, fullPhoneNumber.length - 10);
        const phoneNumber = fullPhoneNumber.substring(fullPhoneNumber.length - 10);

        return { country_code: countryCode, phone_number: phoneNumber };
    };

    const handleVerify = async () => {
        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setError(null);
        const { country_code, phone_number } = extractPhoneDetails(phone);
        const formData = { first_name, email, password, phone_number, country_code };

        try {
            setLoading(true)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/customer_register`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data?.success) {
                localStorage.setItem("homeservice_token", response?.data?.data?.token);
                Cookies.set("homeservice_token", response?.data?.data?.token);

                if (phone_number) {
                    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", { size: "invisible" });
                    const confirmationResult = await signInWithPhoneNumber(auth, `+${country_code}` + phone_number, recaptcha);
                    setConfirmationResult(confirmationResult);
                    router.push('/otp');
                }
            } else {
                setError('Sign-up failed. Please try again.');
            }
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
            setError('An error occurred. Please try again.');
        }
    };



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

            <div
                className="bg-white w-full mx-auto lg:max-w-[685px] px-16 xl:px-24 py-10 xl:py-14 border-3 border-white flex flex-col rounded-2xl lg:my-16 shadow-lg"
                style={{ boxShadow: '0px 1.27px 63.56px 0px #00000026', backdropFilter: 'blur(89.37px)' }}
            >
                <div className="xl:hidden flex items-center justify-center gap-5 pt-2">
                    <Image src={logo} alt="home services" width={50} height={50} quality={100} />
                    <h2 className="text-xl sm:text-3xl text-[#181C32] font-semibold">Home Services</h2>
                </div>

                <h2 className="text-xl sm:text-3xl text-[#181C32] font-medium pt-10 xl:pt-16">Sign Up</h2>

                <p className="flex items-center gap-1 pt-8 sm:pt-10">
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                    <span className="whitespace-nowrap text-[#A1A5B7]">Enter your Phone Number to verify</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

                {/* Phone input field */}
                <div className="pt-8 sm:pt-10">
                    <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={setPhone}
                        inputStyle={{
                            width: '100%',
                            borderRadius: '7px',
                            padding: '25px 0px 25px 48px',
                            border: '1px solid rgba(223, 223, 223, 1)',
                            outline: 'none',
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                        placeholder="Enter your phone number"
                        isValid={(value) => /^[0-9]{10,14}$/.test(value)}
                    />
                </div>
                {error && <p className="text-red-600 text-sm pt-2">{error}</p>}

                <Button
                    className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-12 sm:mt-28 rounded-full py-4 sm:py-5"
                    onClick={handleVerify}
                >
                    {loading ? <FiLoader className='animate-spin size-10' /> : 'Verify'}
                </Button>
            </div>
            <div id="recaptcha"></div>
        </main>
    );
};

export default PhoneNumber;
