import Link from 'next/link';
import Image from 'next/image';
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

export function Navbar() {
    return (
        <header className="w-full h-[134px] bg-white flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Search Bar */}
            <div className="flex items-center gap-7">
                <Image src={"/logo.svg"} width={58} height={56} alt="gopaddi logo" />
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className=" bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2.5 h-14 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6">
                <nav className="flex items-center gap-6 text-neutral-700 text-sm font-medium">
                    <Link href="/" className="flex flex-col items-center gap-1 hover:text-primary-600">
                        <House className="size-8" />
                        <span>Home</span>
                    </Link>
                    <Link href="/dashboard" className="flex flex-col items-center gap-1 hover:text-primary-600">
                        <ChartPieSlice className="size-8" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/wallet" className="flex flex-col items-center gap-1 hover:text-primary-600">
                        <Wallet className="size-8" />
                        <span>Wallet</span>
                    </Link>
                    <Link href="/plan" className="flex flex-col items-center gap-1 text-black-primary hover:text-primary-600 text-nowrap">
                        <ListCheckes className="size-8" />
                        <span>Plan a trip</span>
                    </Link>
                    <Link href="/commission" className="flex flex-col items-center gap-1 hover:text-primary-600 text-nowrap">
                        <HandCoines className="size-8" />
                        <span>Commission for life</span>
                    </Link>
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
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <CaretDown className="size-6" />
                </div>
            </div>
        </header>
    );
}
