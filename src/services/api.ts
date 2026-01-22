import api from '@/lib/axios';

export type SearchParams = {
    query?: string;
    from?: string;
    to?: string;
    date?: string;
    returnDate?: string;
    type?: 'flight' | 'hotel' | 'activity';
    location?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
};

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

const headers = {
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    'x-rapidapi-key': API_KEY
};

export const searchFlights = async (params: SearchParams) => {
    try {
        const response = await api.get('/api/v1/flights/searchFlights', {
            headers,
            params: {
                fromId: params.from || 'BOM.AIRPORT',
                toId: params.to || 'DEL.AIRPORT',
                pageNo: 1,
                adults: 1,
                children: '0,17',
                sort: 'BEST',
                cabinClass: 'ECONOMY',
                currency_code: 'AED',
                stops: 'none'
            }
        });

        if (response.data && response.data.data && response.data.data.flightOffers) {
            return response.data.data.flightOffers.map((offer: any) => {
                const segment = offer.segments[0];
                const leg = segment.legs[0];
                const carrier = leg.carriersData[0];

                // Format duration from seconds to string
                const totalSeconds = segment.totalTime;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const durationStr = `${hours}h ${minutes}m`;

                return {
                    id: offer.token,
                    airline: carrier.name || 'Unknown Airline',
                    flightNumber: `${carrier.code}-${leg.flightInfo.flightNumber}`,
                    classType: leg.cabinClass || 'Economy',
                    departureTime: new Date(segment.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    departureDate: new Date(segment.departureTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }),
                    departureCode: segment.departureAirport.code,
                    arrivalTime: new Date(segment.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    arrivalDate: new Date(segment.arrivalTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }),
                    arrivalCode: segment.arrivalAirport.code,
                    duration: durationStr,
                    price: offer.priceBreakdown.total.units,
                    facilities: ['Wi-Fi', 'Meal'] // Placeholder as not always in simple response
                };
            });
        }
        return [];
    } catch (error) {
        console.error("Flight Search API Error:", error);
        throw error;
    }
};

export const searchHotels = async (params: SearchParams) => {
    try {
        const response = await api.get('/api/v1/hotels/searchHotels', {
            headers,
            params: {
                dest_id: params.location || '-2092174',
                search_type: 'CITY',
                arrival_date: params.date || new Date().toISOString().split('T')[0],
                departure_date: params.returnDate || '2025-12-31',
                adults: params.adults || 1,
                children_age: params.children ? '0,'.repeat(params.children).slice(0, -1) : '0,17',
                room_qty: params.rooms || 1,
                page_number: 1,
                units: 'metric',
                temperature_unit: 'c',
                languagecode: 'en-us',
                currency_code: 'AED'
            }
        });

        if (response.data && response.data.data) {
            const results = response.data.data.result || [];
            return results.map((hotel: any) => ({
                id: hotel.hotel_id,
                name: hotel.hotel_name,
                address: hotel.address || hotel.city_trans,
                rating: hotel.review_score,
                reviews: hotel.review_nr,
                roomType: 'Standard Room',
                checkIn: params.date,
                checkOut: params.returnDate || 'TBD',
                price: hotel.min_total_price?.amount || 0,
                totalPrice: hotel.min_total_price?.amount || 0,
                nights: 1,
                guests: params.adults || 1,
                images: [hotel.main_photo_url]
            }));
        }
        return [];
    } catch (error) {
        console.error("Hotel Search API Error:", error);
        throw error;
    }
};

export const searchActivities = async (params: SearchParams) => {
    try {
        const response = await api.get('/api/v1/attraction/searchAttractions', {
            headers,
            params: {
                id: params.location || 'eyJ1ZmkiOi0yMDkyMTc0fQ==',
                sortBy: 'trending',
                page: 1,
                currency_code: 'AED',
                languagecode: 'en-us',
                startDate: params.date,
                endDate: params.returnDate
            }
        });

        if (response.data && response.data.data && response.data.data.products) {
            return response.data.data.products.map((product: any) => ({
                id: product.id,
                name: product.name,
                description: product.shortDescription,
                location: product.ufiDetails?.bCityName || 'Unknown',
                rating: product.reviewsStats?.combinedNumericStats?.average || 0,
                reviews: product.reviewsStats?.combinedNumericStats?.total || 0,
                duration: '1 Day',
                price: product.representativePrice?.publicAmount || 0,
                date: params.date || 'Flexible',
                time: '10:00 AM',
                images: [product.primaryPhoto?.small]
            }));
        }
        return [];
    } catch (error) {
        console.error("Activity Search API Error:", error);
        throw error;
    }
};
