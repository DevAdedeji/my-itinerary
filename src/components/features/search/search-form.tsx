import { useState } from 'react';
import { cn } from '@/lib/utils';
import MagnifyingGlassIcon from '@/assets/icons/MagnifyingGlass.svg';
import CalendarIcon from '@/assets/icons/CalendarBlank.svg';
import MapPinIcon from '@/assets/icons/MapPin.svg';
import UserIcon from '@/assets/icons/UserPlus.svg';


interface SearchFormProps {
    type: 'flight' | 'hotel' | 'activity';
    onSearch: (data: any) => void;
    loading: boolean;
}

export function SearchForm({ type, onSearch, loading }: SearchFormProps) {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: new Date().toISOString().split('T')[0],
        returnDate: new Date().toISOString().split('T')[0],
        location: '',
        adults: 1,
        children: 0,
        rooms: 1,
        cabinClass: 'ECONOMY',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Dynamic Location Inputs */}
                    {type === 'flight' ? (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black-secondary">From</label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Areport Code (e.g. BOM.AIRPORT)"
                                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                        value={formData.from}
                                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black-secondary">To</label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Airport Code (e.g. DEL.AIRPORT)"
                                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                        value={formData.to}
                                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium text-black-secondary">Location</label>
                            <div className="relative">
                                <MapPinIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder={type === 'hotel' ? "City ID (e.g. -2092174)" : "Location ID (e.g. eyJ...)"}
                                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black-secondary">Date</label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    {(type === 'hotel' || type === 'activity') && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black-secondary">
                                {type === 'hotel' ? 'Check-out' : 'End Date'}
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                    value={formData.returnDate}
                                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black-secondary">Adults</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                            <input
                                type="number"
                                min="1"
                                placeholder="Adults"
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                value={formData.adults}
                                onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black-secondary">Children</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                            <input
                                type="number"
                                min="0"
                                placeholder="Children"
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                value={formData.children}
                                onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>

                    {type === 'flight' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black-secondary">Class</label>
                            <select
                                className="w-full px-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none appearance-none"
                                value={formData.cabinClass}
                                onChange={(e) => setFormData({ ...formData, cabinClass: e.target.value })}
                            >
                                <option value="ECONOMY">Economy</option>
                                <option value="PREMIUM_ECONOMY">Premium Econ</option>
                                <option value="BUSINESS">Business</option>
                                <option value="FIRST">First Class</option>
                            </select>
                        </div>
                    )}
                    {type === 'hotel' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black-secondary">Rooms</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full px-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                                value={formData.rooms}
                                onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                    {loading ? (
                        'Searching...'
                    ) : (
                        <>
                            <MagnifyingGlassIcon className="size-5 stroke-white text-white" />
                            Search
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
