import Image from 'next/image';
import AirplaneTakeOff from '@/assets/icons/AirplaneTakeoff.svg';
import AirplaneLanding from '@/assets/icons/AirplaneLanding.svg';
import { cn } from '@/lib/utils';

interface FlightSearchCardProps {
    logo: string;
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
    onAdd: () => void;
}

export function FlightSearchCard({
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
    price,
    logo,
    onAdd
}: FlightSearchCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-center">
            {/* Main Content */}
            <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-8 h-8 relative">
                            <Image src={logo} width={24} height={24} alt={airline} />
                        </div>
                        <div>
                            <h3 className="font-bold text-base text-black-primary">{airline}</h3>
                            <div className="flex items-center gap-2 text-sm text-black-secondary">
                                <span>{flightNumber}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="bg-primary-900 text-white text-xs px-2 py-0.5 rounded">{classType}</span>
                            </div>
                        </div>
                    </div>
                    <div className="font-bold text-xl text-black-primary">
                        ₦ {price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-10 justify-between sm:justify-center">
                    <div className="text-center">
                        <div className="font-semibold text-lg text-black-primary">{departureTime}</div>
                        <div className="text-xs text-black-secondary">{departureCode}</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center max-w-[200px]">
                        <div className="flex items-center justify-between w-full text-xs text-black-secondary mb-1">
                            <AirplaneTakeOff className="size-4" />
                            <span>{duration}</span>
                            <AirplaneLanding className="size-4" />
                        </div>
                        <div className="w-full h-1 bg-primary-100 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-full bg-primary-600 rounded-full"></div>
                        </div>
                        <div className="text-xs text-black-secondary mt-1">Direct</div>
                    </div>

                    <div className="text-center">
                        <div className="font-semibold text-lg text-black-primary">{arrivalTime}</div>
                        <div className="text-xs text-black-secondary">{arrivalCode}</div>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 flex items-center">
                <button
                    onClick={onAdd}
                    className="w-full sm:w-auto bg-primary-600 text-white font-semibold py-2.5 px-6 rounded hover:bg-primary-700 transition-colors text-sm"
                >
                    Add to Itinerary
                </button>
            </div>
        </div>
    );
}
