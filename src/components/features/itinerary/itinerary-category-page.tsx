'use client';

import { useItineraryStore } from '@/store/itinerary-store';
import { EmptyState } from '@/components/features/itinerary/empty-state';
import { FlightCard } from '@/components/features/itinerary/flight-card';
import { HotelCard } from '@/components/features/itinerary/hotel-card';
import { ActivityCard } from '@/components/features/itinerary/activity-card';
import { SearchModal } from '@/components/features/search/search-modal';
import { useState } from 'react';
import AirPlaneInFlight from '@/assets/icons/AirplaneInFlight.svg';
import Warehouse from '@/assets/icons/Warehouse.svg';
import RoadHorizon from '@/assets/icons/RoadHorizon.svg';

interface ItineraryCategoryPageProps {
    type: 'flight' | 'hotel' | 'activity';
    title: string;
    description: string;
}

export function ItineraryCategoryPage({ type, title, description }: ItineraryCategoryPageProps) {
    const items = useItineraryStore((state) => state.items).filter((item) => item.type === type);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const icons = {
        flight: AirPlaneInFlight,
        hotel: Warehouse,
        activity: RoadHorizon
    };

    const Icon = icons[type];

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-white">
            <div>
                <h2 className="text-xl font-semibold text-black-primary">{title}</h2>
                <p className="text-black-secondary text-sm mt-0.5">{description}</p>
            </div>

            <div className="space-y-6 bg-neutral-50 p-6 rounded-lg min-h-[500px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                        <Icon className="size-6 text-black-primary" />
                        <p className="text-lg text-black-primary font-semibold">{title}</p>
                    </div>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="h-[46px] bg-white border border-neutral-200 py-3 px-6 text-primary-600 font-semibold text-sm hover:bg-neutral-50 rounded"
                    >
                        Add {title}
                    </button>
                </div>

                {items.length === 0 ? (
                    <EmptyState
                        icon={Icon}
                        title="No Items Added"
                        description={`You haven't added any ${type}s to your itinerary yet.`}
                    />
                ) : (
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.id}>
                                {type === 'flight' && (
                                    <FlightCard
                                        airline={item.title}
                                        flightNumber={item.details?.flightNumber || 'N/A'}
                                        classType={item.details?.classType || 'Economy'}
                                        departureTime={item.details?.departureTime || '00:00'}
                                        departureDate={item.date || 'TBD'}
                                        departureCode={item.details?.departureCode || 'DEP'}
                                        arrivalTime={item.details?.arrivalTime || '00:00'}
                                        arrivalDate={item.details?.arrivalDate || item.date}
                                        arrivalCode={item.details?.arrivalCode || 'ARR'}
                                        duration={item.details?.duration || '-'}
                                        price={item.price}
                                    />
                                )}
                                {type === 'hotel' && (
                                    <HotelCard
                                        name={item.title}
                                        address={item.details?.address || 'Address'}
                                        rating={item.details?.rating || 0}
                                        reviews={item.details?.reviews || 0}
                                        roomType={item.details?.roomType || 'Standard'}
                                        checkIn={item.date || 'TBD'}
                                        checkOut={item.details?.checkOut || 'TBD'}
                                        price={item.price}
                                        totalPrice={item.details?.totalPrice || item.price}
                                        nights={item.details?.nights || 1}
                                        guests={item.details?.guests || 1}
                                        images={item.details?.images || []}
                                    />
                                )}
                                {type === 'activity' && (
                                    <ActivityCard
                                        name={item.title}
                                        description={item.details?.description || ''}
                                        location={item.details?.location || ''}
                                        rating={item.details?.rating || 0}
                                        reviews={item.details?.reviews || 0}
                                        duration={item.details?.duration || ''}
                                        price={item.price}
                                        date={item.date || 'TBD'}
                                        time={item.details?.time || '00:00'}
                                        images={item.details?.images || []}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <SearchModal
                isOpen={isSearchOpen}
                type={type}
                onClose={() => setIsSearchOpen(false)}
            />
        </div>
    );
}
