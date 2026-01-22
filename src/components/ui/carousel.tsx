'use client';

import { useState } from 'react';
import CaretCircleLeft from '@/assets/icons/CaretCircleLeft.svg';
import CaretCircleRight from '@/assets/icons/CaretCircleRight.svg';
import Image from 'next/image';

interface CarouselProps {
    images: string[];
}

export function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full lg:w-[246px] h-full min-h-[232px] rounded-lg overflow-hidden group">
            <Image
                src={images[currentIndex]}
                alt="Slide"
                fill
                className="object-cover"
            />

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm"
                >
                    <CaretCircleLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm"
                >
                    <CaretCircleRight className="w-4 h-4 text-gray-700" />
                </button>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}
