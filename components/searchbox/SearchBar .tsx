"use client"
import { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import FilterBox from './FilterBox ';

const SearchBar = () => {

    const toggleFilter = () => {
        setFilter(!filter);
    };

    const [filter, setFilter] = useState(false)

    return (
        <>
            <div className="relative w-full max-w-md">
                <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search here.."
                        className="flex-grow text-gray-700 focus:outline-none"
                    />
                    <FaSlidersH
                        className="text-gray-400 ml-2 cursor-pointer"
                        onClick={toggleFilter}
                    />
                </div>
                {filter && (
                    <FilterBox />
                )}
            </div>
        </>
    );
};

export default SearchBar;
