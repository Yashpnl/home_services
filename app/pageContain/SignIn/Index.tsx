"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/apiFetch';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { SiApple } from 'react-icons/si';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { useForm } from 'react-hook-form';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const onSubmit = async (data: SignInFormData) => {
        try {
            const response = await apiFetch('/auth/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
            console.log('Sign-in successful:', response);
        } catch (error) {
            console.error('Sign-in failed:', error);
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
                <h2 className="text-xl sm:text-3xl text-[#181C32] font-medium pt-10 xl:pt-16">Sign In</h2>

                <div className="flex flex-col sm:flex-row gap-3 items-center pt-8 xl:pt-14">
                    <button className="bg-white border-[#E1E3EA] border-2 flex items-center justify-center sm:justify-around gap-5 px-4 py-2 rounded-md min-w-full sm:min-w-[234px]">
                        <FcGoogle className="size-6" />
                        <span className="text-[#7E8299] text-sm sm:text-base">Sign in with Google</span>
                    </button>
                    <button className="bg-[#F9F9F9] border-[#E1E3EA] border-2 flex items-center justify-center sm:justify-around gap-5 px-4 py-2 rounded-md min-w-full sm:min-w-[234px]">
                        <SiApple className="size-6" />
                        <span className="text-[#7E8299] text-sm sm:text-base">Sign in with Apple</span>
                    </button>
                </div>

                <p className="flex items-center gap-1 pt-8 sm:pt-10">
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                    <span className="whitespace-nowrap text-[#A1A5B7]">Or with email</span>
                    <span className="w-[40%] h-[1px] bg-[#EFF2F5]" />
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-6 pt-8 sm:pt-10">
                    <div className="flex flex-col">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="py-4 text-black placeholder:font-medium placeholder:text-black"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-600 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <Input
                            type="password"
                            placeholder="Password"
                            className="py-4 text-black placeholder:font-medium placeholder:text-black"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Password must contain at least one letter and one number',
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-600 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="pt-5 sm:pt-11 flex items-center gap-2">
                        <input type="checkbox" className="custom-checkbox size-5" />
                        <p className='text-[#5E6278] text-[16px] font-medium'>
                            I Accept the <Link href={'/privacy'} className='text-[#3E97FF]'>
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    <Button type="submit" className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-12 sm:mt-16 rounded-full py-4 sm:py-5">
                        Login
                    </Button>
                </form>

                <p className='text-[#A1A5B7] text-[16px] font-medium pt-7 text-center'>
                    Not have an Account Yet? <Link href={'/signup'} className='text-[#3E97FF]'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignIn;
