"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ProfileSection = () => {

    const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [state, setState] = useState('')  // For (Used PhoneNumber Library)PhoneNumber Input Field 
    const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
    const token = storedData?.token;
    const userId = storedData?.userId;

    const onSubmit = async (data) => {
        try {
            const requestBody = {
                id: userId,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_number: data.phone_number,
                date_of_birth: data.date_of_birth,
            };
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/update_profile`, requestBody, { headers });

            if (res?.data?.success) {
                toast.success(res?.data?.message || "Profile updated successfully!");
            } else {
                toast.error(res?.data?.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("An error occurred while updating the profile.");
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleEditImage = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className='md:py-20 w-[90%] mx-auto'>
            <div className=" bg-white rounded-lg shadow-[0px_3.84px_15.35px_0px_#D4E0EB] flex flex-col gap-5 w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='p-5 flex flex-col md:flex-row items-center justify-between gap-4'>
                        {/* profile photo */}
                        <div className='flex flex-col items-center justify-center sm:items-start w-full md:w-[10%]'>
                            <div className='relative w-32 h-32'>
                                <img
                                    src={selectedImage || '/fallback.jpg'}
                                    alt='User Profile'
                                    className='w-32 h-32 rounded-full object-cover border-3 border-white'
                                />
                                <button
                                    type="button"
                                    onClick={handleEditImage}
                                    className='absolute bottom-0 right-0 p-3 rounded-full bg-primary'
                                >
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.7059 3.06551L13.3529 5.66266M8.94118 15.1855H16M1.88235 11.7227L1 15.1855L4.52941 14.3198L14.7524 4.28964C15.0832 3.96495 15.269 3.52463 15.269 3.06551C15.269 2.6064 15.0832 2.16608 14.7524 1.84139L14.6006 1.69249C14.2697 1.36789 13.8209 1.18555 13.3529 1.18555C12.885 1.18555 12.4362 1.36789 12.1053 1.69249L1.88235 11.7227Z" stroke="white" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <input
                                type='file'
                                id='fileInput'
                                className='hidden'
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-3 w-full md:w-[60%]">
                            <div className='flex flex-col md:flex-row gap-3 sm:gap-5 xl:gap-20'>
                                <div className="w-full md:w-1/2 flex flex-col gap-2">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        {...register("first_name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters long"
                                            }
                                        })}
                                        className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                        style={{
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            borderColor: 'rgba(223, 223, 223, 1)',
                                        }}
                                        placeholder="Enter your name"
                                    />
                                    {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col gap-2">
                                    <label htmlFor="date_of_birth">Date of Birth</label>
                                    <input
                                        type="date"
                                        {...register("date_of_birth", {
                                            required: "dob is required",
                                            minLength: {
                                                value: 2,
                                                message: "dob must be at least 2 characters long"
                                            }
                                        })}
                                        className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                        style={{
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            borderColor: 'rgba(223, 223, 223, 1)',
                                        }}
                                        placeholder="Enter your city"
                                    />
                                    {errors.date_of_birth && <p className="text-red-600">{errors.date_of_birth.message}</p>}
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-3 sm:gap-5 xl:gap-20'>

                                <div className="w-full md:w-1/2 flex flex-col gap-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Enter a valid email"
                                            }
                                        })}
                                        className="w-full rounded-2xl px-4 py-3 border border-opacity-5 outline-none"
                                        style={{
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            borderColor: 'rgba(223, 223, 223, 1)',
                                        }}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                                </div>
                                {/* Phone Number Input with Country Code */}
                                <div className="w-full md:w-1/2 flex flex-col gap-2">
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <PhoneInput
                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '20px',
                                            padding: "25px 0px 25px 48px",
                                            border: '1px solid rgba(223, 223, 223, 1)',
                                            backgroundColor: 'rgba(249, 247, 249, 1)',
                                            outline: 'none'
                                        }}
                                        buttonStyle={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                        }}
                                        placeholder="Enter your phone number"
                                        country={'in'}
                                        value={state}
                                        onChange={(e) => {
                                            setState(e);
                                            setValue('phone_number', e);
                                            clearErrors('phone_number');
                                        }}
                                    />
                                    <input
                                        type="hidden"
                                        {...register('phone_number')}
                                    />

                                    {errors.phone_number && (
                                        <p className="text-red-500 text-left px-1">{errors.phone_number.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <span className='flex items-center justify-center w-full md:w-[20%]'>
                            <Button className="text-[#0C3469] text-base font-bold bg-[#F9AA58] rounded-full py-4 sm:py-6 w-full">
                                Save
                            </Button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileSection