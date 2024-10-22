'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';

const PhoneNumber = () => {

    const [phone, setPhone] = useState(''); // State to store the phone number
    const router = useRouter();

    const handleVerify = () => {
        if (phone) {
            console.log('Phone number:', phone);
            router.push('/otp');
        } else {
            alert("Please enter a valid phone number.");
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
                    <h2 className="text-xl sm:text-3xl text-[#181C32] font-semibold">Home Services</h2>
                </div>
                <h2 className="text-xl sm:text-3xl text-[#181C32] font-medium pt-10 xl:pt-16">Sign Up</h2>

                <p className="flex items-center gap-1 pt-8 sm:pt-10">
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                    <span className="whitespace-nowrap text-[#A1A5B7]">Enter your Phone Number to verify</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

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
                        isValid={(value, country) => {
                            return /^[0-9]{10,14}$/.test(value); 
                        }}
                    />
                </div>

                <Button
                    className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-12 sm:mt-28 rounded-full py-4 sm:py-5"
                    onClick={handleVerify}
                >
                    Verify
                </Button>

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

export default PhoneNumber;
