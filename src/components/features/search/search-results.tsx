'use client';

import { FlightSearchCard } from './flight-search-card';
import { HotelSearchCard } from './hotel-search-card';
import { ActivitySearchCard } from './activity-search-card';
import { useItineraryStore } from '@/store/itinerary-store';

interface SearchResultsProps {
    type: 'flight' | 'hotel' | 'activity';
    results: any[];
    loading: boolean;
    onClose: () => void;
}

export function SearchResults({ type, results, loading, onClose }: SearchResultsProps) {
    const addItem = useItineraryStore((state) => state.addItem);

    const handleAdd = (item: any) => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            type,
            title: type === 'flight' ? item.airline : item.name,
            price: item.price,
            date: item.date || item.departureDate,
            details: item
        });
        onClose();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-black-secondary">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
                <p>Finding the best for you...</p>
            </div>
        );
    }

    if (results.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black-primary mb-4">Results</h3>
            <div className="grid gap-4">
                {type === 'flight' && results.map((item) => (
                    <FlightSearchCard
                        key={item.id}
                        airline={item.airline}
                        flightNumber={item.flightNumber}
                        classType={item.classType}
                        departureTime={item.departureTime}
                        departureDate={item.departureDate}
                        departureCode={item.departureCode}
                        arrivalTime={item.arrivalTime}
                        arrivalDate={item.arrivalDate}
                        arrivalCode={item.arrivalCode}
                        duration={item.duration}
                        price={item.price}
                        onAdd={() => handleAdd(item)}
                    />
                ))}

                {type === 'hotel' && results.map((item) => (
                    <HotelSearchCard
                        key={item.id}
                        name={item.name}
                        address={item.address}
                        rating={item.rating}
                        reviews={item.reviews}
                        price={item.price}
                        images={item.images}
                        onAdd={() => handleAdd(item)}
                    />
                ))}

                {type === 'activity' && results.map((item) => (
                    <ActivitySearchCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        location={item.location}
                        rating={item.rating}
                        reviews={item.reviews}
                        duration={item.duration}
                        price={item.price}
                        images={item.images}
                        onAdd={() => handleAdd(item)}
                    />
                ))}
            </div>
        </div>
    );
}
