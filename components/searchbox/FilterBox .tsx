"use client";
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useGlobalContext } from '@/Context/GlobalContext';

const FilterBox = () => {
    
    const { setFilters, setResults } = useGlobalContext();

    const [selectedServiceType, setSelectedServiceType] = useState<string>('ALL');
    const [selectedExperience, setSelectedExperience] = useState<string>('ALL');
    const [rating, setRating] = useState<[number, number]>([0, 5]);
    const [pricing, setPricing] = useState<[number, number]>([250, 5000]);
    const [token, setToken] = useState('');

    const serviceTypes = ['ALL', 'plumbing', 'repairs', 'emergency', 'installations'];
    const experienceLevels = ['ALL', 'A year', '2 year', '3 year', '4 year', '5+ year', '10+ year'];
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        setToken(storedData?.token);
    }, []);

    const handleApplyFilter = async () => {
        // Update global filter state
        setFilters({
            selectedServiceType,
            selectedExperience,
            rating,
            pricing,
        });

        const response = await fetch('https://homeservices.bestflutterteam.com/api/servicepricing/search_services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subcategory_name: selectedServiceType === 'ALL' ? undefined : selectedServiceType,
                experience: selectedExperience === 'ALL' ? undefined : selectedExperience.replace(' year', ''),
                from_price: pricing[0],
                to_price: pricing[1],
                rating: rating,
            }),
        });
        
        const data = await response.json();
        // Update global results state
        setResults(data?.data || []);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
            <h2 className="text-md font-semibold text-[#565656] mb-2">Service Type</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {serviceTypes.map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 text-sm rounded-lg ${selectedServiceType === type ? 'bg-primary text-white' : 'shadow-[0px_1px_4px_0px_#D4E0EB] text-primary'}`}
                        onClick={() => setSelectedServiceType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <h2 className="text-md font-semibold text-[#565656] mb-2">Experience Level</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {experienceLevels.map((level) => (
                    <button
                        key={level}
                        className={`px-4 py-2 text-sm rounded-lg ${selectedExperience === level ? 'bg-primary text-white' : 'shadow-[0px_1px_4px_0px_#D4E0EB] text-primary'}`}
                        onClick={() => setSelectedExperience(level)}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <h2 className="text-md font-semibold text-[#565656] mb-2">Rating</h2>
            <div className="flex items-center flex-col mb-4">
                <div className="flex items-center justify-between mb-1 w-full">
                    <span className='flex items-center gap-2'>{rating[0]}</span>
                    <span className='flex items-center gap-2'>{rating[1]}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={rating[0]}
                    onChange={(e) => setRating([+e.target.value, rating[1]])}
                    className="w-full mx-2 custom-range"
                />
            </div>

            <h2 className="text-md font-semibold text-[#565656] mb-2">Pricing</h2>
            <div className="flex items-center flex-col mb-4">
                <div className="flex items-center justify-between mb-1 w-full">
                    <span className='text-primary'>₹{pricing[0]}</span>
                    <span className='text-primary'>₹{pricing[1]}</span>
                </div>
                <input
                    type="range"
                    min="250"
                    max="5000"
                    step="50"
                    value={pricing[0]}
                    onChange={(e) => setPricing([+e.target.value, pricing[1]])}
                    className="w-full mx-2 custom-range"
                />
            </div>

            <Button
                onClick={handleApplyFilter}
                className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] mt-4 rounded-full py-4 sm:py-7 w-full">
                Apply Filter
            </Button>
        </div>
    );
};

export default FilterBox;
