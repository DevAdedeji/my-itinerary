'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MagnifyingGlass from '@/assets/icons/MagnifyingGlass.svg';
import House from '@/assets/icons/House.svg';
import ChartPieSlice from '@/assets/icons/ChartPieSlice.svg';
import Wallet from '@/assets/icons/Wallet.svg';
import ListCheckes from '@/assets/icons/ListChecks.svg';
import HandCoines from '@/assets/icons/HandCoins.svg';
import Bell from '@/assets/icons/Bell.svg';
import Basket from '@/assets/icons/Basket.svg';
import PlusSquare from '@/assets/icons/PlusSquare.svg';
import CaretDown from '@/assets/icons/CaretDown.svg';
import X from '@/assets/icons/X.svg';
import List from '@/assets/icons/menu.svg';

const navbarItems = [

    { href: '/', label: 'Home', icon: House, active: true },
    { href: '/dashboard', label: 'Dashboard', icon: ChartPieSlice, active: false },
    { href: '/wallet', label: 'Wallet', icon: Wallet, active: false },
    { href: '/plan', label: 'Plan a trip', icon: ListCheckes, active: false },
    { href: '/commission', label: 'Commission for life', icon: HandCoines, active: false },

]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full h-auto min-h-[80px] xl:h-[134px] bg-white flex flex-col justify-center px-4 xl:px-8 sticky top-0 z-50 border-b xl:border-none border-gray-100">
            <div className="flex items-center justify-between h-[80px] xl:h-auto w-full">
                {/* Search Bar & Logo */}
                <div className="flex items-center gap-7">
                    <Image src={"/logo.svg"} width={58} height={56} alt="gopaddi logo" className="w-10 h-10 xl:w-[58px] xl:h-[56px]" />
                    <div className="hidden xl:block flex-1 max-w-md">
                        <div className="relative">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className=" bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2.5 h-14 text-sm focus:ring-2 focus:ring-blue-100 outline-none w-auto 2xl:w-[400px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="size-8 text-black" /> : <List className="size-8 text-black" />}
                </button>

                {/* Desktop Navigation & Actions */}
                <div className="hidden xl:flex items-center gap-6">
                    <nav className="flex items-center gap-6 text-neutral-700 text-sm font-medium">
                        {navbarItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.active ? item.href : '#'}
                                className={`flex flex-col items-center gap-1 whitespace-nowrap ${item.active ? 'hover:text-primary-600' : 'opacity-40 cursor-not-allowed hover:text-neutral-700'}`}
                                onClick={(e) => !item.active && e.preventDefault()}
                            >
                                <item.icon className="size-8" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="h-8 w-px bg-gray-200 mx-2"></div>

                    <button className="bg-primary-600 text-white px-4 py-2 h-10 rounded-sm text-sm font-medium hover:bg-primary-700 transition">
                        Subscribe
                    </button>

                    <div className="flex items-center gap-4 text-gray-500">
                        <button className="hover:text-primary-600 relative">
                            <Bell className="size-8" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <button className="hover:text-primary-600 relative">
                            <Basket className="size-8" />
                        </button>
                        <button className="hover:text-primary-600 relative">
                            <PlusSquare className="size-8" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="size-[52px] rounded-full bg-gray-200 overflow-hidden">
                            <img src="/user.png" alt="User" />
                        </div>
                        <CaretDown className="size-6" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="xl:hidden absolute top-[80px] left-0 w-full bg-white border-t border-gray-100 shadow-lg p-6 flex flex-col gap-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
                    {/* Mobile Search */}
                    <div className="relative w-full">
                        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-50 border-none rounded-lg pl-10 pr-4 py-3 w-full text-base focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>

                    <nav className="flex flex-col gap-4 text-neutral-700 font-medium">
                        {[
                            { href: '/', label: 'Home', icon: House, active: true },
                            { href: '/dashboard', label: 'Dashboard', icon: ChartPieSlice, active: false },
                            { href: '/wallet', label: 'Wallet', icon: Wallet, active: false },
                            { href: '/plan', label: 'Plan a trip', icon: ListCheckes, active: false },
                            { href: '/commission', label: 'Commission for life', icon: HandCoines, active: false },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.active ? item.href : '#'}
                                className={`flex items-center gap-4 p-2 rounded ${item.active ? 'hover:bg-gray-50' : 'opacity-40 cursor-not-allowed hover:bg-transparent'}`}
                                onClick={(e) => {
                                    if (!item.active) {
                                        e.preventDefault();
                                    } else {
                                        setIsMenuOpen(false);
                                    }
                                }}
                            >
                                <item.icon className="size-6" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="h-px bg-gray-100 w-full"></div>

                    <div className="flex flex-col gap-4">
                        <button className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded text-gray-500">
                            <Bell className="size-8" />
                            <span>Notifications</span>
                        </button>
                        <button className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded text-gray-500">
                            <Basket className="size-8" />
                            <span>Cart</span>
                        </button>
                        <button className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded text-gray-500">
                            <PlusSquare className="size-8" />
                            <span>Create</span>
                        </button>
                    </div>

                    <div className="h-px bg-gray-100 w-full"></div>

                    <div className="flex items-center gap-3 p-2">
                        <div className="size-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                            <img src="/user.png" alt="User" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Felix</span>
                            <span className="text-xs text-gray-500">View Profile</span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
