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



export const searchFlights = async (params: SearchParams) => {
    try {
        const response = await api.get('', {
            params: {
                endpoint: '/api/v1/flights/searchFlights',
                fromId: params.from || 'BOM.AIRPORT',
                toId: params.to || 'DEL.AIRPORT',
                departDate: params.date || new Date().toISOString().split('T')[0],
                pageNo: 1,
                adults: params.adults || 1,
                children: params.children ? '0,'.repeat(params.children).slice(0, -1) : '0,17',
                sort: 'BEST',
                cabinClass: params.cabinClass || 'ECONOMY',
                currency_code: 'NGN',
                stops: 'none'
            }
        });

        if (response.data && response.data.data && response.data.data.flightOffers) {
            return response.data.data.flightOffers.map((offer: any) => {
                const segment = offer.segments[0];
                const leg = segment.legs[0];
                const carrier = leg.carriersData[0];

                const totalSeconds = segment.totalTime;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const durationStr = `${hours}h ${minutes}m`;

                return {
                    id: offer.token,
                    airline: carrier.name || 'Unknown Airline',
                    logo: carrier.logo || '/american_airlines_symbol.svg',
                    flightNumber: `${carrier.code}-${leg.flightInfo.flightNumber}`,
                    classType: leg.cabinClass || params.cabinClass || 'Economy',
                    departureTime: new Date(segment.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    departureDate: new Date(segment.departureTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }),
                    departureCode: segment.departureAirport.code,
                    arrivalTime: new Date(segment.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    arrivalDate: new Date(segment.arrivalTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }),
                    arrivalCode: segment.arrivalAirport.code,
                    duration: durationStr,
                    price: offer.priceBreakdown.total.units,
                    facilities: ['Wi-Fi', 'Meal']
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
        let arrival = params.date || new Date().toISOString().split('T')[0];
        let departure = params.returnDate || '2025-12-31';

        if (arrival >= departure) {
            const nextDay = new Date(arrival);
            nextDay.setDate(nextDay.getDate() + 1);
            departure = nextDay.toISOString().split('T')[0];
        }

        const response = await api.get('', {
            params: {
                endpoint: '/api/v1/hotels/searchHotels',
                dest_id: params.location || '-2092174',
                search_type: 'CITY',
                arrival_date: arrival,
                departure_date: departure,
                adults: params.adults || 1,
                children_age: params.children ? '0,'.repeat(params.children).slice(0, -1) : '0,17',
                room_qty: params.rooms || 1,
                page_number: 1,
                units: 'metric',
                temperature_unit: 'c',
                languagecode: 'en-us',
                currency_code: 'USD'
            }
        });

        if (response.data && response.data.data) {
            const results = response.data.data.hotels || [];
            return results.map((item: any) => ({
                id: item.hotel_id,
                name: item.property.name,
                address: item.accessibilityLabel ? item.accessibilityLabel.split('\n')[2] : '',
                rating: item.property.reviewScore,
                reviews: item.property.reviewCount,
                roomType: 'Standard Room',
                checkIn: item.property.checkinDate,
                checkOut: item.property.checkoutDate,
                price: item.property.priceBreakdown.grossPrice.value || 0,
                totalPrice: item.property.priceBreakdown.grossPrice.value || 0,
                nights: 1,
                guests: params.adults || 1,
                images: item.property.photoUrls || []
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
        const response = await api.get('', {
            params: {
                endpoint: '/api/v1/attraction/searchAttractions',
                id: params.location,
                sortBy: 'trending',
                page: 1,
                currency_code: 'USD',
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
                currency: product.representativePrice?.currency || 'NGN',
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

export const searchLocations = async (query: string, type: 'flight' | 'hotel' | 'activity') => {
    try {
        let endpoint = '';
        let params: any = { query };

        if (type === 'flight') {
            endpoint = '/api/v1/flights/searchDestination';
        } else if (type === 'hotel') {
            endpoint = '/api/v1/hotels/searchDestination';
            params = { query: query };
        } else if (type === 'activity') {
            endpoint = '/api/v1/attraction/searchLocation';
        }

        const response = await api.get('', {
            params: {
                endpoint,
                ...params
            }
        });

        if (type === 'flight' && response.data?.data) {
            return response.data.data.map((item: any) => ({
                id: item.id || item.code,
                label: `${item.name} (${item.code}) - ${item.city}`,
                subLabel: item.country,
                value: item.id
            }));
        } else if (type === 'hotel' && response.data?.data) {
            return response.data.data.map((item: any) => ({
                id: item.dest_id,
                label: item.label || item.name,
                subLabel: item.region || item.country,
                value: item.dest_id
            }));
        } else if (type === 'activity' && response.data?.data) {
            const products = response.data.data.products || [];
            const destinations = response.data.data.destinations || [];

            const combined = [
                ...products.map((item: any) => ({
                    id: item.id,
                    label: item.title || item.name,
                    subLabel: `${item.cityName || ''} (Product)`,
                    value: item.id
                })),
                ...destinations.map((item: any) => ({
                    id: item.id,
                    label: item.cityName,
                    subLabel: item.country,
                    value: item.id
                }))
            ];
            return combined;
        }

        return [];
    } catch (error) {
        console.error("Location Search API Error:", error);
        throw error;
    }
};
