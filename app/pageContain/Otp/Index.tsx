'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'; // Regex for validation
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'; // Assuming these are custom components for OTP input
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Otp = () => {

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        const timer: NodeJS.Timeout | false = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [countdown]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.match(REGEXP_ONLY_DIGITS_AND_CHARS)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
                nextInput?.focus();
            }
        }
    };

    const handleVerify = () => {
        const otpValue = otp.join('');
        console.log('OTP Entered:', otpValue);
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
                className="bg-white w-full mx-auto lg:max-w-[685px] px-16 xl:px-24 py-10 xl:py-14 border-3 border-white flex flex-col rounded-2xl lg:my-16 shadow-lg relative"
                style={{ boxShadow: '0px 1.27px 63.56px 0px #00000026', backdropFilter: 'blur(89.37px)' }}
            >
                <div className='xl:hidden flex items-center justify-center gap-5 pt-2'>
                    <Image
                        src={logo}
                        alt="home services"
                        width={50}
                        height={50}
                        quality={100}
                    />
                    <h2 className=" text-xl sm:text-3xl text-[#181C32] font-semibold">Home Services</h2>
                </div>
                <h2 className="text-xl sm:text-3xl text-[#181C32] font-medium pt-10 xl:pt-16">Sign Up</h2>

                <p className="flex items-center gap-1 pt-8 sm:pt-10">
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                    <span className="whitespace-nowrap text-[#A1A5B7]">Enter your OTP to verify</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

                <div className="flex items-center justify-center pt-8 sm:pt-10">
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            {otp.map((value: string, index: number) => (
                                <InputOTPSlot
                                    key={index}
                                    id={`otp-${index}`}
                                    value={value}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="otp-input"
                                    maxLength={1}
                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS.source} 
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
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
                            onClick={() => setCountdown(60)}
                        >
                            Send again
                        </Link>
                    </p>
                </div>

                <p className='text-[#A1A5B7] text-[16px] font-medium pt-7 text-center absolute bottom-7 left-1/3'>
                    Already have an Account?{' '}
                    <Link href={'/signin'} className='text-[#3E97FF]'>
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Otp;
