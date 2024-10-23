'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/apiFetch';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface ApiResponse {
    success: number;
    message?: string;
}

const Otp = () => {

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(60);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter()

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(prev => prev - 1), 1000);
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [countdown]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.match(REGEXP_ONLY_DIGITS_AND_CHARS) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
                nextInput?.focus();
            } else if (value === '' && index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
                prevInput?.focus();
            }
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        try {
            const response = await apiFetch('/users/verify_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp: otpValue,
                }),
            }) as ApiResponse;

            if (response?.success === 200) {
                toast.success('Verification Successful');
                router.push('/');
            } else {
                toast.error(response?.message?.otp || 'OTP verification failed.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(`Error verifying OTP: ${errorMessage}`);
        }
    };

    const resendOtp = async () => {
        try {
            const response = await apiFetch('/users/send_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            }) as Response

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success('Resend OTP Response:', data);

            setOtp(Array(6).fill(''));
            setCountdown(60);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(`Error resending OTP: ${errorMessage}`);
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
            <div className="bg-white w-full mx-auto lg:max-w-[685px] px-16 xl:px-24 py-10 xl:py-14 border-3 border-white flex flex-col rounded-2xl lg:my-16 shadow-lg">
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
                <div className="flex items-center justify-center pt-8 sm:pt-10">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            maxLength={1}
                            className="mx-1 w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <Button
                    onClick={handleVerify}
                    className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-12 sm:mt-16 rounded-full py-4 sm:py-5"
                >
                    Verify
                </Button>
                <div className="pt-5 sm:pt-11 flex items-center justify-center gap-2">
                    <span className='rounded-full border border-[#0054A5] px-1'>{countdown}</span>
                    <p className='text-[#5E6278] text-[16px] font-medium'>
                        Did not receive the code?{' '}
                        <Link
                            href={'#'}
                            className={`text-[#3E97FF] ${countdown > 0 ? 'pointer-events-none opacity-50' : ''}`}
                            onClick={() => {
                                if (countdown === 0) {
                                    resendOtp(); // Call resend OTP function
                                }
                            }}
                        >
                            Send again
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Otp;
