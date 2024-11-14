"use client";
import { ConfirmationResult } from 'firebase/auth';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

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
    userInfo: any;
    homeserviceToken: string | null;
    setHomeserviceToken: (value: string) => void;
    confirmationResult: ConfirmationResult | null;
    setConfirmationResult: React.Dispatch<React.SetStateAction<null | ConfirmationResult>>
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

    const [userInfo, setUserInfo] = useState<any>(null);
    const [homeserviceToken, setHomeserviceToken] = useState<string | null>(null);
    const [confirmationResult, setConfirmationResult] = useState<null | ConfirmationResult>(null);

    useEffect(() => {
        // const storedGoogleInfo = localStorage.getItem('google_home_services');
        const storedHomeserviceToken = JSON.parse(localStorage.getItem("homeservice_userData") || '{}');
        // if (storedGoogleInfo) {
        //     setUserInfo(JSON.parse(storedGoogleInfo));
        // }
        if (storedHomeserviceToken) {
            setHomeserviceToken(storedHomeserviceToken?.token);
        }
    }, []);

    return (
        <GlobalContext.Provider value={{ results, setResults, filters, setFilters, userInfo, homeserviceToken, setHomeserviceToken, confirmationResult, setConfirmationResult }}>
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
