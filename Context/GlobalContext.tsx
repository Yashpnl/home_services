"use client";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type ServiceProvider = {
    id: number;
    image_url: string;
    service_provider_first_name: string;
    category_name: string;
    servicepricings: {
        price: number;
    };
    rating: number;
};

// Define the type for filters
type FilterState = {
    selectedServiceType: string;
    selectedExperience: string;
    rating: [number, number];
    pricing: [number, number];
};

// Define the context type
type ContextType = {
    results: ServiceProvider[];
    setResults: Dispatch<SetStateAction<ServiceProvider[]>>;
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
}

// Create the context
const GlobalContext = createContext<ContextType | null>(null);

// Create a provider component
const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResults] = useState<ServiceProvider[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        selectedServiceType: 'ALL',
        selectedExperience: 'ALL',
        rating: [0, 5],
        pricing: [250, 5000],
    });

    return (
        <GlobalContext.Provider value={{ results, setResults, filters, setFilters }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

// Custom hook for using the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
