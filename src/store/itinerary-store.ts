import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ItineraryItem = {
    id: string;
    type: 'flight' | 'hotel' | 'activity';
    title: string;
    price: number;
    date?: string;
    details?: any;
    logo: string;
};

type ItineraryStore = {
    items: ItineraryItem[];
    addItem: (item: ItineraryItem) => void;
    removeItem: (id: string) => void;
    clearItinerary: () => void;
    totalCost: () => number;
};

export const useItineraryStore = create<ItineraryStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
            removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            clearItinerary: () => set({ items: [] }),
            totalCost: () => get().items.reduce((total, item) => total + item.price, 0),
        }),
        {
            name: 'itinerary-storage',
        }
    )
);
