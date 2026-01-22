
import X from '@/assets/icons/X.svg';
import MapPin from '@/assets/icons/MapPin.svg';
import Star from '@/assets/icons/Star.svg';
import Clock from '@/assets/icons/Clock.svg';
import CarretCircleUp from '@/assets/icons/CaretCircleUp.svg'
import CarretCircleDown from '@/assets/icons/CaretCircleDown.svg'
import { Carousel } from '@/components/ui/carousel';

interface ActivityCardProps {
    name: string;
    description: string;
    location: string;
    rating: number;
    reviews: number;
    duration: string;
    price: number;
    date: string;
    time: string;
    images: string[];
    onRemove?: () => void;
}

export function ActivityCard({
    name,
    description,
    location,
    rating,
    reviews,
    duration,
    price,
    date,
    time,
    images,
    onRemove
}: ActivityCardProps) {
    return (
        <div className="bg-white p-4 md:p-6 relative flex flex-col md:flex-row gap-6 rounded-lg">
            {/* Carousel */}
            <div className="shrink-0 w-full md:w-[300px]">
                <Carousel images={images} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:pr-12 min-w-0">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
                    <div className="flex-1 min-w-0 w-full">
                        <h3 className="font-bold text-lg 2xl:text-xl text-black mb-2">{name}</h3>
                        <p className="text-black-primary text-sm 2xl:text-base max-w-lg mb-4">{description}</p>

                        <div className="flex items-center gap-3 text-sm 2xl:text-base mb-4 flex-wrap">
                            <div className="flex items-center gap-1 text-primary-600 font-medium">
                                <MapPin className="size-[18px]" />
                                <span>Directions</span>
                            </div>
                            <div className="flex items-center gap-1 text-black-secondary">
                                <Star className="size-[18px] text-yellow-500 fill-yellow-500" />
                                <span>{rating} ({reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-black-secondary">
                                <Clock className="size-[18px]" />
                                <span>{duration}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-left md:text-right shrink-0 w-full md:w-auto">
                        <div className="font-bold text-xl 2xl:text-2xl text-gray-900 whitespace-nowrap">
                            USD {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-black-secondary mt-1 whitespace-nowrap">{time} on {date}</div>
                    </div>
                </div>

                <div className="border-t border-neutral-400 my-4"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-2 text-black-secondary text-base 2xl:text-lg flex-1 min-w-0 flex-wrap">
                        <span className="font-medium text-gray-700 shrink-0">What's Included:</span>
                        <span className="truncate max-w-[200px] md:max-w-none">Admission to the Empire State Building</span>
                        <span className="text-primary-600 font-medium cursor-pointer shrink-0">See more</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button className="px-2 py-1 bg-primary-900 text-white text-xs font-medium rounded whitespace-nowrap">Day 1</button>
                        <div className="flex flex-col gap-0.5">
                            <CarretCircleUp className="size-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                            <CarretCircleDown className="size-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-neutral-400 pt-4 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-4">
                        <button className="text-primary-600 font-medium text-sm hover:underline">Activity details</button>
                        <button className="text-primary-600 font-medium text-sm hover:underline">Price details</button>
                    </div>
                    <button className="text-primary-600 font-medium text-sm hover:underline">Edit details</button>
                </div>
            </div>

            {/* Remove Button Side Panel */}
            <div onClick={onRemove} className="w-full h-12 md:h-auto md:w-12 flex items-center justify-center bg-[#FBEAE9] rounded-b-lg md:rounded-b-none md:rounded-r-lg relative md:absolute right-0 top-auto md:top-0 bottom-0 cursor-pointer hover:bg-[#f9d5d3] transition-colors order-last md:order-0">
                <X className="w-5 h-5 text-red-600" />
            </div>
        </div>
    );
}