import MapPin from '@/assets/icons/MapPin.svg';
import Star from '@/assets/icons/Star.svg';
import Clock from '@/assets/icons/Clock.svg';
import { Carousel } from '@/components/ui/carousel';

interface ActivitySearchCardProps {
    name: string;
    description: string;
    location: string;
    rating: number;
    reviews: number;
    duration: string;
    price: number;
    images: string[];
    onAdd: () => void;
}

export function ActivitySearchCard({
    name,
    description,
    location,
    rating,
    reviews,
    duration,
    price,
    images,
    onAdd
}: ActivitySearchCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 h-48 shrink-0 rounded-lg overflow-hidden relative">
                <Carousel images={images} />
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-lg text-black-primary line-clamp-1">{name}</h3>
                        <div className="font-bold text-lg text-black-primary whitespace-nowrap">
                            USD {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <p className="text-black-secondary text-sm mt-1 line-clamp-2">{description}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <div className="flex items-center gap-1 text-black-secondary">
                            <MapPin className="size-4" />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-black-secondary">
                            <Star className="size-4 text-yellow-500 fill-yellow-500" />
                            <span>{rating} ({reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-black-secondary">
                            <Clock className="size-4" />
                            <span>{duration}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 sm:mt-auto pt-4 flex justify-end">
                    <button
                        onClick={onAdd}
                        className="bg-primary-600 text-white font-semibold py-2 px-6 rounded hover:bg-primary-700 transition-colors text-sm"
                    >
                        Add to Itinerary
                    </button>
                </div>
            </div>
        </div>
    );
}
