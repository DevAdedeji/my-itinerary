'use client';

import { useState, useEffect, useRef } from 'react';
import { searchLocations } from '@/services/api';
import MapPinIcon from '@/assets/icons/MapPin.svg';
import { cn } from '@/lib/utils';

interface LocationAutocompleteProps {
    type: 'flight' | 'hotel' | 'activity';
    placeholder?: string;
    onSelect: (value: string) => void;
    defaultValue?: string;
    className?: string;
}

export function LocationAutocomplete({ type, placeholder, onSelect, defaultValue = '', className }: LocationAutocompleteProps) {
    const [query, setQuery] = useState(defaultValue);
    const [results, setResults] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const ignoreFetch = useRef(false);

    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        if (!ignoreFetch.current && query && query.length >= 3) {
            setLoading(true);
        }

        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        async function fetchLocations() {
            if (ignoreFetch.current) {
                ignoreFetch.current = false;
                setLoading(false);
                return;
            }

            if (!debouncedQuery || debouncedQuery.length < 3) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await searchLocations(debouncedQuery, type);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchLocations();
    }, [debouncedQuery, type]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: any) => {
        ignoreFetch.current = true;
        setQuery(item.label);
        onSelect(item.value);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className={cn("relative", className)}>
            <MapPinIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value.length > 0) setLoading(true);
                }}
                placeholder={placeholder || "Search location..."}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded border-none focus:ring-1 focus:ring-primary-600 outline-none"
                onClick={() => {
                    if (results.length > 0) setIsOpen(true);
                }}
            />

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto border border-neutral-200">
                    {results.map((item) => (
                        <button
                            key={item.id}
                            className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex flex-col"
                            onClick={() => handleSelect(item)}
                        >
                            <span className="font-medium text-sm text-black-primary">{item.label}</span>
                            {item.subLabel && (
                                <span className="text-xs text-black-secondary">{item.subLabel}</span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {loading && isOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white p-2 text-center text-sm text-neutral-500 shadow-lg rounded-md">
                    Loading...
                </div>
            )}
        </div>
    );
}
