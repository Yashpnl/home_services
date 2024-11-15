// @ts-nocheck

"use client";
import { useEffect, useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import { useGlobalContext } from '@/Context/GlobalContext';
import axios from 'axios';

const SearchBar = () => {
    const { setResults } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState('');
    const [searchType, setSearchType] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
    }, []);

    const handleSearch = async () => {
        try {
            const payload = {};

            if (searchType === 'Category') payload.category_name = searchTerm;
            if (searchType === 'Subcategory') payload.subcategory_name = searchTerm;
            if (searchType === 'Experience') payload.experience = searchTerm;
            if (searchType === 'Service Name') payload.service_name = searchTerm;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/servicepricing/search_services`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            setResults(response.data?.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const toggleDropdown = () => {
        if (searchType) {
            setSearchType(''); // Clear selection if close icon is clicked
        } else {
            setShowDropdown(!showDropdown); // Toggle dropdown if no selection
        }
    };
    const handleSelectType = (type) => {
        setSearchType(type);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="bg-white sm:shadow-[0px_2px_8px_0px_#D4E0EB] rounded-lg px-4 py-2 flex flex-col sm:flex-row gap-1 items-center">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="flex-grow bg-transparent focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className='flex gap-1 items-center'>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center ml-2 focus:outline-none text-black rounded-md p-2 justify-center gap-1"
                        >
                            {searchType}
                            {searchType ?
                                <MdClose />
                                :
                                <FaChevronDown />
                            }
                        </button>

                        {/* Custom Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <div
                                    onClick={() => handleSelectType("Category")}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary rounded-md hover:text-white"
                                >
                                    Category
                                </div>
                                <div
                                    onClick={() => handleSelectType("Subcategory")}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary rounded-md hover:text-white"
                                >
                                    Subcategory
                                </div>
                                <div
                                    onClick={() => handleSelectType("Experience")}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary rounded-md hover:text-white"
                                >
                                    Experience
                                </div>
                                <div
                                    onClick={() => handleSelectType("Service Name")}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary rounded-md hover:text-white"
                                >
                                    Service Name
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSearch}
                        className="text-black rounded-md p-2 ml-2"
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
