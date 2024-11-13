"use client";
import { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import { useGlobalContext } from '@/Context/GlobalContext';

const SearchBar = () => {

    const { setResults } = useGlobalContext();

    // const [filter, setFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // const toggleFilter = () => {
    //     setFilter(!filter);
    // };

    const handleSearch = async () => {
        const response = await fetch('https://homeservices.bestflutterteam.com/api/servicepricing/search_services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("homeservice_token")}`
            },
            body: JSON.stringify({
                service_name: searchTerm,
            }),
        });
        const data = await response.json();
        console.log(data, "data");

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
