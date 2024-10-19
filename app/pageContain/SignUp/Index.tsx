import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { SiApple } from 'react-icons/si';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const SignUp = () => {
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
                    <span className="whitespace-nowrap text-[#A1A5B7]">Or with email</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

                <div className="flex flex-col gap-3 sm:gap-6 pt-8 sm:pt-10">
                    <Input type="email" placeholder="Email" className="py-4 text-black placeholder:font-medium placeholder:text-black" />
                    <Input type="password" placeholder="Password" className="py-4 text-black placeholder:font-medium placeholder:text-black" />
                </div>

                <div className="pt-5 sm:pt-11 flex items-center gap-2">
                    <input type="checkbox" className="custom-checkbox size-5" />
                    <p className='text-[#5E6278] text-[16px] font-medium'>
                        I Accept the <Link href={'/privacy'} className='text-[#3E97FF]'>
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                <Button className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-12 sm:mt-16 rounded-full py-4 sm:py-5">
                    Signup
                </Button>

                <p className='text-[#A1A5B7] text-[16px] font-medium pt-7 text-center'>
                    Already have an Account? <Link href={'/signin'} className='text-[#3E97FF]'>
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default SignUp