import SuitecaseRolling from '@/assets/icons/SuitcaseRolling.svg';
import AirplaneTakeOff from '@/assets/icons/AirplaneTakeoff.svg';
import Usb from '@/assets/icons/Usb.svg';
import AirplaneLanding from '@/assets/icons/AirplaneLanding.svg';
import FilmSlate from '@/assets/icons/FilmSlate.svg';
import ForkKnife from '@/assets/icons/ForkKnife.svg';
import X from '@/assets/icons/X.svg';
import Image from 'next/image';

interface FlightCardProps {
    airline: string;
    flightNumber: string;
    classType: string;
    departureTime: string;
    departureDate: string;
    departureCode: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalCode: string;
    duration: string;
    price: number;
}

export function FlightCard({
    airline,
    flightNumber,
    classType,
    departureTime,
    departureDate,
    departureCode,
    arrivalTime,
    arrivalDate,
    arrivalCode,
    duration,
    price
}: FlightCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 relative flex gap-0">
            {/* Main Content */}
            <div className="flex-1 p-6 pr-20">
                {/* Header - Airline Info & Route */}
                <div className="flex justify-between items-center mb-8 gap-6">
                    <div className="flex items-center gap-3 shrink-0">
                        <Image src="/american_airlines_symbol.svg" width={24} height={24} alt={airline} />
                        <div>
                            <h3 className="font-bold text-base 2xl:text-lg text-black-primary">{airline}</h3>
                            <div className="flex items-center gap-2 text-sm text-black-secondary">
                                <span>{flightNumber}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="bg-primary-900 text-white text-xs flex items-center justify-center font-medium h-[30px] py-1 px-2">{classType}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 2xl:gap-10 flex-1 max-w-[600px] justify-center">
                        <div className="text-center shrink-0">
                            <div className="font-semibold text-xl 2xl:text-2xl text-black-primary">{departureTime}</div>
                            <div className="text-sm text-black-secondary">{departureDate}</div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 items-center px-4 min-w-[150px]">
                            <div className="flex items-center justify-between w-full text-sm text-black-secondary mb-2">
                                <AirplaneTakeOff className="size-5 shrink-0" />
                                <span className="text-xs text-center">Duration: {duration}</span>
                                <AirplaneLanding className="size-5 shrink-0" />
                            </div>
                            <div className="w-full h-2 bg-primary-100 rounded-full relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-full bg-primary-600 rounded-full"></div>
                            </div>
                            <div className="w-full mt-2 flex items-center justify-between font-medium text-black-secondary text-sm">
                                <div className="font-semibold text-black-primary">{departureCode}</div>
                                <span className="text-xs">Direct</span>
                                <div className="font-semibold text-black-primary">{arrivalCode}</div>
                            </div>
                        </div>

                        <div className="text-center shrink-0">
                            <div className="font-semibold text-xl 2xl:text-2xl text-black-primary">{arrivalTime}</div>
                            <div className="text-sm text-black-secondary">{arrivalDate}</div>
                        </div>
                    </div>

                    <div className="text-right shrink-0 min-w-[140px]">
                        <div className="font-bold text-xl 2xl:text-2xl text-black-primary whitespace-nowrap">
                            ₦ {price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-400 my-6"></div>

                {/* Facilities & Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-wrap">
                        <h4 className="text-sm text-black-secondary font-medium mr-2">Facilities:</h4>
                        <div className="flex items-center gap-2 text-sm text-black-secondary shrink-0">
                            <SuitecaseRolling className="size-5" />
                            <span>Baggage: 20kg, Cabin Baggage: 8kg</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-black-secondary shrink-0">
                            <FilmSlate className="size-5" />
                            <span>In flight entertainment</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-black-secondary shrink-0">
                            <ForkKnife className="size-5" />
                            <span>In flight meal</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-black-secondary shrink-0">
                            <Usb className="size-5" />
                            <span>USB Port</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-400 my-6"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button className="text-primary-600 font-medium text-sm hover:underline">Flight details</button>
                        <button className="text-primary-600 font-medium text-sm hover:underline">Price details</button>
                    </div>
                    <button className="text-primary-600 font-medium text-sm hover:underline">Edit details</button>
                </div>
            </div>

            {/* Remove Button Side Panel */}
            <div className="w-16 flex items-center justify-center bg-[#FBEAE9] rounded-r-lg absolute right-0 top-0 bottom-0 cursor-pointer hover:bg-[#f9d5d3] transition-colors">
                <X className="size-6 text-red-600" />
            </div>
        </div>
    );
}