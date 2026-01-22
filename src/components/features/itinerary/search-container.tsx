'use client'
import { useState } from 'react';
import { SearchModal } from '@/components/features/search/search-modal';
import { ActionCard } from '@/components/features/itinerary/action-card';
import { EmptyState } from '@/components/features/itinerary/empty-state';
import AirPlaneInFlight from '@/assets/icons/AirplaneInFlight.svg';
import Warehouse from '@/assets/icons/Warehouse.svg';
import RoadHorizon from '@/assets/icons/RoadHorizon.svg';

export default function SearchContainer() {
    const [activeModal, setActiveModal] = useState<'flight' | 'hotel' | 'activity' | null>(null);
    return (
        <>
            {/* Action Cards */}
            <div className="grid grid-cols-3 gap-6 mt-6">
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
                <div className="space-y-6 bg-neutral-300 pt-4 pb-[52px] px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <AirPlaneInFlight className="size-6 text-black-primary" />
                            <p className="text-lg text-black-primary font-semibold">Flights</p>
                        </div>
                        <button onClick={() => setActiveModal('flight')} className="h-[46px] bg-white py-3 px-6 text-primary-600 font-semibold text-sm">Add Flights</button>
                    </div>
                    <EmptyState
                        icon={AirPlaneInFlight}
                        title="No Request yet"
                        description="Go to the flights section to find the best flight tailored for you or create your own."
                    />
                </div>
                <div className="space-y-6 bg-neutral-900 pt-4 pb-[52px] px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px] text-white">
                            <Warehouse className="size-6 text-white" />
                            <p className="text-lg font-semibold">Hotels</p>
                        </div>
                        <button onClick={() => setActiveModal('hotel')} className="h-[46px] bg-white py-3 px-6 text-black-primary font-semibold text-sm">Add Hotels</button>
                    </div>
                    <EmptyState
                        icon={Warehouse}
                        title="No Request yet"
                        description="Go to the hotels section to find the best hotel tailored for you or create your own."
                    />
                </div>
                <div className="space-y-6 bg-[#0054E4] pt-4 pb-[52px] px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px] text-white">
                            <RoadHorizon className="size-6 stroke-white" />
                            <p className="text-lg font-semibold">Activities</p>
                        </div>
                        <button onClick={() => setActiveModal('activity')} className="h-[46px] bg-white py-3 px-6 text-black-primary font-semibold text-sm">Add Activities</button>
                    </div>
                    <EmptyState
                        icon={RoadHorizon}
                        title="No Request yet"
                        description="Go to the activities section to find the best activities tailored for you or create your own."
                    />
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