'use client'
import { useState } from 'react';
import { SearchModal } from '@/components/features/search/search-modal';
import { ActionCard } from '@/components/features/itinerary/action-card';
import { EmptyState } from '@/components/features/itinerary/empty-state';
import { FlightCard } from '@/components/features/itinerary/flight-card';
import { HotelCard } from '@/components/features/itinerary/hotel-card';
import { ActivityCard } from '@/components/features/itinerary/activity-card';
import { useItineraryStore } from '@/store/itinerary-store';
import AirPlaneInFlight from '@/assets/icons/AirplaneInFlight.svg';
import Warehouse from '@/assets/icons/Warehouse.svg';
import RoadHorizon from '@/assets/icons/RoadHorizon.svg';

export default function SearchContainer() {
    const [activeModal, setActiveModal] = useState<'flight' | 'hotel' | 'activity' | null>(null);
    const items = useItineraryStore((state) => state.items);
    const removeItem = useItineraryStore((state) => state.removeItem);

    const flights = items.filter((item) => item.type === 'flight');
    const hotels = items.filter((item) => item.type === 'hotel');
    const activities = items.filter((item) => item.type === 'activity');

    return (
        <>
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <ActionCard
                    variant="dark"
                    title="Activities"
                    description="Build, personalize, and optimize your itineraries with our trip planner."
                    buttonText="Add Activities"
                    onClick={() => setActiveModal('activity')}
                />
                <ActionCard
                    variant="light"
                    title="Hotels"
                    description="Build, personalize, and optimize your itineraries with our trip planner."
                    buttonText="Add Hotels"
                    onClick={() => setActiveModal('hotel')}
                />
                <ActionCard
                    variant="blue"
                    title="Flights"
                    description="Build, personalize, and optimize your itineraries with our trip planner."
                    buttonText="Add Flights"
                    onClick={() => setActiveModal('flight')}
                />
            </div>

            {/* Trip itineraries */}
            <div className="flex flex-col gap-6 mt-6 mb-7">
                <div>
                    <h2 className="text-xl font-semibold text-black-primary">Trip Itineraries</h2>
                    <p className="text-black-secondary text-sm mt-0.5">Your trip itineraries are placed here</p>
                </div>

                {/* Flights Section */}
                <div className="space-y-6 bg-neutral-100 pt-4 pb-[52px] px-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <AirPlaneInFlight className="size-6 text-black-primary" />
                            <p className="text-lg text-black-primary font-semibold">Flights</p>
                        </div>
                        <button onClick={() => setActiveModal('flight')} className="h-[46px] bg-white py-3 px-6 text-primary-600 font-semibold text-sm rounded hover:bg-neutral-50">Add Flights</button>
                    </div>
                    {flights.length > 0 ? (
                        <div className="space-y-4">
                            {flights.map((item) => (
                                <FlightCard
                                    key={item.id}
                                    logo={item.logo}
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
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={AirPlaneInFlight}
                            title="No Request yet"
                            description="Go to the flights section to find the best flight tailored for you or create your own."
                        />
                    )}
                </div>

                {/* Hotels Section */}
                <div className="space-y-6 bg-neutral-900 pt-4 pb-[52px] px-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px] text-white">
                            <Warehouse className="size-6 text-white" />
                            <p className="text-lg font-semibold">Hotels</p>
                        </div>
                        <button onClick={() => setActiveModal('hotel')} className="h-[46px] bg-white py-3 px-6 text-black-primary font-semibold text-sm rounded hover:bg-neutral-50">Add Hotels</button>
                    </div>
                    {hotels.length > 0 ? (
                        <div className="space-y-4">
                            {hotels.map((item) => (
                                <HotelCard
                                    key={item.id}
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
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={Warehouse}
                            title="No Request yet"
                            description="Go to the hotels section to find the best hotel tailored for you or create your own."
                        />
                    )}
                </div>

                {/* Activities Section */}
                <div className="space-y-6 bg-[#0054E4] pt-4 pb-[52px] px-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px] text-white">
                            <RoadHorizon className="size-6 stroke-white" />
                            <p className="text-lg font-semibold">Activities</p>
                        </div>
                        <button onClick={() => setActiveModal('activity')} className="h-[46px] bg-white py-3 px-6 text-black-primary font-semibold text-sm rounded hover:bg-neutral-50">Add Activities</button>
                    </div>
                    {activities.length > 0 ? (
                        <div className="space-y-4">
                            {activities.map((item) => (
                                <ActivityCard
                                    key={item.id}
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
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={RoadHorizon}
                            title="No Request yet"
                            description="Go to the activities section to find the best activities tailored for you or create your own."
                        />
                    )}
                </div>
            </div>

            <SearchModal
                isOpen={!!activeModal}
                type={activeModal}
                onClose={() => setActiveModal(null)}
            />
        </>
    )
}