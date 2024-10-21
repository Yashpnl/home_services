"use client"
import { useState } from 'react';

const FilterBox = () => {

    const [selectedServiceType, setSelectedServiceType] = useState<string>('ALL');
    const [selectedExperience, setSelectedExperience] = useState<string>('ALL');
    const [rating, setRating] = useState<[number, number]>([0, 5]);
    const [pricing, setPricing] = useState<[number, number]>([250, 5000]);

    const serviceTypes = ['ALL', 'wiring', 'repairs', 'emergency', 'installations'];
    const experienceLevels = ['ALL', 'A year', '2 year', '3 year', '4 year', '5+ year', '10+ year'];

    const handleApplyFilter = () => {
        console.log({ selectedServiceType, selectedExperience, rating, pricing });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md absolute top-12 left-0">
            <h2 className="text-xl font-semibold mb-4">Service Type</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {serviceTypes.map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 text-sm rounded-full border ${selectedServiceType === type ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                        onClick={() => setSelectedServiceType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Experience Level</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {experienceLevels.map((level) => (
                    <button
                        key={level}
                        className={`px-4 py-2 text-sm rounded-full border ${selectedExperience === level ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                        onClick={() => setSelectedExperience(level)}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Rating</h2>
            <div className="flex items-center justify-between mb-4">
                <span>{rating[0]}</span>
                <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={rating[0]}
                    onChange={(e) => setRating([+e.target.value, rating[1]])}
                    className="w-full mx-2"
                />
                <span>{rating[1]}</span>
            </div>

            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="flex items-center justify-between mb-4">
                <span>₹{pricing[0]}</span>
                <input
                    type="range"
                    min="250"
                    max="5000"
                    step="50"
                    value={pricing[0]}
                    onChange={(e) => setPricing([+e.target.value, pricing[1]])}
                    className="w-full mx-2"
                />
                <span>₹{pricing[1]}</span>
            </div>

            <button
                onClick={handleApplyFilter}
                className="bg-orange-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-orange-600"
            >
                Apply Filter
            </button>
        </div>
    );
};

export default FilterBox;
