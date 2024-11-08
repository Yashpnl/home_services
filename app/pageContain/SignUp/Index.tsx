'use client';
import Image from 'next/image';
import signin from '@/assets/auth.png';
import logo from '@/app/favicon.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface SignUpFormData {
    first_name: string;
    email: string;
    password: string;
}

const SignUp = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignUpFormData>();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedFirstName = sessionStorage.getItem('first_name') || '';
        const savedEmail = sessionStorage.getItem('email') || '';
        const savedPassword = sessionStorage.getItem('password') || '';
        setValue('first_name', savedFirstName);
        setValue('email', savedEmail);
        setValue('password', savedPassword);
    }, [setValue]);

    // Store input values in sessionStorage
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        sessionStorage.setItem(e.target.name, e.target.value);
    };

    const onSubmit = () => {
        setLoading(true)
        router.push(`/phonenumber`);
        setLoading(false)
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
                className="bg-white w-full mx-auto sm:w-[685px] lg:max-w-[685px] px-16 xl:px-24 py-10 xl:py-14 border-3 border-white flex flex-col rounded-2xl lg:my-16 shadow-[0px_1.27px_63.56px_0px_#00000026] backdrop-blur-[89.37px] min-h-screen sm:min-h-fit">
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

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-6 pt-8 sm:pt-10">
                    <div className="flex flex-col">
                        <Input
                            type="text"
                            placeholder="First Name"
                            className="py-4 text-black placeholder:font-medium placeholder:text-black"
                            {...register('first_name', {
                                required: 'first_name is required',
                                minLength: {
                                    value: 2,
                                    message: 'First Name is at least 2 characters long',
                                },
                            })}
                            onChange={handleInputChange}  // Track changes for session storage
                        />
                        {errors.first_name && (
                            <span className="text-red-600 text-sm">{errors.first_name.message}</span>
                        )}
                    </div>
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
                            onChange={handleInputChange}  // Track changes for session storage
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
                            onChange={handleInputChange}  // Track changes for session storage
                        />
                        {errors.password && (
                            <span className="text-red-600 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="pt-5 sm:pt-11 flex items-center gap-2">
                    </div>

                    <Button type="submit" className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-3 sm:mt-16 rounded-full py-4 sm:py-5">
                        {loading ? <FiLoader className='animate-spin size-10' /> : 'Sign Up'}
                    </Button>
                </form>

                <p className='text-[#A1A5B7] text-[16px] font-medium pt-7 text-center'>
                    Already have an Account? <Link href={'/signin'} className='text-[#3E97FF]'>
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignUp;