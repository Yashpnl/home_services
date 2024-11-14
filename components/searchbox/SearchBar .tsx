// @ts-nocheck

"use client";
import { useEffect, useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import { useGlobalContext } from '@/Context/GlobalContext';
import axios from 'axios';

const SearchBar = () => {

    const { setResults } = useGlobalContext();

    // const [filter, setFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token)
    }, [])

    // const toggleFilter = () => {
    //     setFilter(!filter);
    // };

    const handleSearch = async () => {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/servicepricing/search_services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                service_name: searchTerm,
            }),
        });
        const data = await response.json();
        setResults(data?.data);
    };

    return (
        <>
            <div className="relative w-full max-w-md">
                <div className="flex items-center bg-white shadow-[0px_2px_8px_0px_#D4E0EB] rounded-lg px-4 py-2">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search here.."
                        className="flex-grow text-gray-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <FaSlidersH
                        className="text-gray-400 ml-2 cursor-pointer"
                        onClick={toggleFilter}
                    /> */}
                    <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white rounded px-3 py-1">Search</button>
                </div>
                {/* {filter && (
                    <Modal onClose={toggleFilter} showModal={filter}>
                        <FilterBox onApplyFilter={setResults} />
                    </Modal>
                )} */}
            </div>
        </>
    );
};

export default SearchBar;
