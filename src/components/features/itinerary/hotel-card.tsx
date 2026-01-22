import MapPin from '@/assets/icons/MapPin.svg';
import Star from '@/assets/icons/Star.svg';
import Bed from '@/assets/icons/Bed.svg';
import Calendar from '@/assets/icons/CalendarBlank.svg';
import X from '@/assets/icons/X.svg';
import Wine from '@/assets/icons/Wine.svg';
import Waves from '@/assets/icons/SwimmingPool.svg'
import { Carousel } from '@/components/ui/carousel';

interface HotelCardProps {
    name: string;
    address: string;
    rating: number;
    reviews: number;
    roomType: string;
    checkIn: string;
    checkOut: string;
    price: number;
    totalPrice: number;
    nights: number;
    guests: number;
    images: string[];
    onRemove?: () => void;
}

export function HotelCard({
    name,
    address,
    rating,
    reviews,
    roomType,
    checkIn,
    checkOut,
    price,
    totalPrice,
    nights,
    guests,
    images,
    onRemove
}: HotelCardProps) {
    return (
        <div className="bg-white p-6 relative flex gap-6">
            {/* Carousel */}
            <div className="shrink-0">
                <Carousel images={images} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col pr-12 min-w-0">
                <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg 2xl:text-xl text-black mb-2">{name}</h3>
                        <p className="text-black-primary text-sm 2xl:text-base max-w-lg mb-4">{address}</p>
                    </div>



                    <div className="text-right shrink-0">
                        <div className="font-bold text-xl 2xl:text-2xl text-gray-900 whitespace-nowrap">
                            USD {price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-black-secondary mt-1 whitespace-nowrap">Total Price: USD {totalPrice.toLocaleString()}</div>
                        <div className="text-sm text-black-secondary whitespace-nowrap">1 room x {nights} nights incl. taxes</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm 2xl:text-base">
                    <div className="flex items-center gap-1 text-primary-600 font-medium">
                        <MapPin className="size-[18px]" />
                        <span>Show in map</span>
                    </div>
                    <div className="flex items-center gap-1 text-black-secondary">
                        <Star className="size-[18px]" />
                        <span>{rating} ({reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-black-secondary">
                        <Bed className="size-5" />
                        <span>{roomType}</span>
                    </div>
                </div>

                <div className="border-t border-neutral-400 my-4"></div>

                <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-black-secondary">
                            <h4 className="font-medium text-gray-700">Facilities:</h4>
                            <Waves className="size-5" />
                            <span>Pool</span>
                            <Wine className="size-5" />
                            <span>Bar</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black-secondary flex-wrap">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Calendar className="size-5" />
                            <span>Check In: {checkIn}</span>
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Calendar className="size-5" />
                            <span>Check Out: {checkOut}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-neutral-400 pt-4 flex items-center justify-between">
                    <div className="flex gap-4">
                        <button className="text-primary-600 font-medium text-sm hover:underline">Hotel details</button>
                        <button className="text-primary-600 font-medium text-sm hover:underline">Price details</button>
                    </div>
                    <button className="text-primary-600 font-medium text-sm hover:underline">Edit details</button>
                </div>
            </div>

            {/* Remove Button Side Panel */}
            <div onClick={onRemove} className="w-12 flex items-center justify-center bg-[#FBEAE9] rounded-r-lg absolute right-0 top-0 bottom-0 cursor-pointer hover:bg-[#f9d5d3] transition-colors">
                <X className="w-5 h-5 text-red-600" />
            </div>
        </div>
    );
}