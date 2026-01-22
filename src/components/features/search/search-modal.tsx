'use client';

import { useState, SVGProps } from 'react';
import SearchForm from './search-form';
import SearchResults from './search-results';
import XIcon from '@/assets/icons/X.svg';
import { searchFlights, searchHotels, searchActivities, SearchParams } from '@/services/api';
import { toast } from 'sonner';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'flight' | 'hotel' | 'activity' | null;
}

export function SearchModal({ isOpen, onClose, type }: SearchModalProps) {
    if (!isOpen || !type) return null;

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (data: any) => {
        // Validation Logic
        if (type === 'flight') {
            if (!data.from || !data.to) {
                toast.error("Please ensure 'From' and 'To' locations are selected.");
                return;
            }
        } else if (type === 'hotel' || type === 'activity') {
            if (!data.location) {
                toast.error("Please ensure a location is selected.");
                return;
            }
        }

        setLoading(true);
        setResults([]);
        try {
            let response: any[] = [];

            const params: SearchParams = {
                ...data,
                type
            };

            if (type === 'flight') {
                response = await searchFlights(params);
            } else if (type === 'hotel') {
                response = await searchHotels(params);
            } else if (type === 'activity') {
                response = await searchActivities(params);
            }

            setResults(response);
            if (response.length === 0) {
                toast.info(`No ${type}s found for your search criteria.`);
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to search ${type}s. Please try again.`);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    const titles = {
        flight: 'Flights',
        hotel: 'Hotels',
        activity: 'Activities'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h2 className="text-2xl font-bold font-poppins text-black-primary">
                        {type ? `Search ${titles[type]}` : 'Search'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <XIcon className="size-6 stroke-white text-white" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
                    <SearchForm type={type} onSearch={handleSearch} loading={loading} />

                    <div className="mt-8">
                        <SearchResults type={type} results={results} loading={loading} onClose={onClose} hasSearched={hasSearched} />
                    </div>
                </div>

            </div>
        </div>
    );
}
