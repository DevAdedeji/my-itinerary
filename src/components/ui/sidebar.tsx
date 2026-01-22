'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import RoadHorizon from '@/assets/icons/RoadHorizon.svg';
import Buildings from '@/assets/icons/Buildings.svg';
import AirplainTilt from '@/assets/icons/AirplaneTilt.svg';
import Student from '@/assets/icons/Student.svg';
import NewspaperClipping from '@/assets/icons/NewspaperClipping.svg';
import SuitecaseRolling from '@/assets/icons/SuitcaseRolling.svg';
import FirstAidKit from '@/assets/icons/FirstAidKit.svg';
import Package from '@/assets/icons/Package.svg';
import CaretUpDown from '@/assets/icons/CaretUpDown.svg';

const sidebarItems = [
    { icon: RoadHorizon, label: 'Activities', href: '/activities' },
    { icon: Buildings, label: 'Hotels', href: '/hotels' },
    { icon: AirplainTilt, label: 'Flights', href: '/flights' },
    { icon: Student, label: 'Study', href: '/study' },
    { icon: NewspaperClipping, label: 'Visa', href: '/visa' },
    { icon: SuitecaseRolling, label: 'Immigration', href: '/immigration' },
    { icon: FirstAidKit, label: 'Medical', href: '/medical' },
    { icon: Package, label: 'Vacation Packages', href: '/packages' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 md:top-[120px] lg:top-[154px] z-30 rounded-sm w-full md:w-[250px] lg:w-[300px] bg-white flex flex-row md:flex-col p-4 md:p-6 md:self-start md:h-[calc(100vh-140px)] lg:md:h-[calc(100vh-174px)] shadow-sm md:shadow-none overflow-x-auto md:overflow-visible scrollbar-hide">
            <nav className="flex flex-row md:flex-col gap-2 md:gap-0 md:space-y-1 w-max md:w-full md:flex-1 md:overflow-y-auto md:min-h-0 no-scrollbar">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;

                    const isimplemented = ['/activities', '/hotels', '/flights'].includes(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={isimplemented ? item.href : '#'}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group whitespace-nowrap",
                                isActive
                                    ? "bg-gray-50 text-primary-600 shadow-primary-600/20"
                                    : "text-black-secondary hover:bg-gray-50 hover:text-primary-600",
                                !isimplemented && "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-black-secondary"
                            )}
                            onClick={(e) => !isimplemented && e.preventDefault()}
                        >
                            <item.icon className={cn("size-8", isActive ? "stroke-primary-600 md:text-white" : "group-hover:text-primary-600")} />
                            <span className="font-medium text-sm md:text-base">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto hidden md:flex h-[86px] bg-gray-50 p-4 rounded-xl items-center justify-between cursor-pointer hover:bg-gray-100 shrink-0 md:mt-4">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 rounded text-base text-white size-[50px] flex items-center justify-center">Go</div>
                    <span className="text-gray-600 text-sm font-medium">Personal Account</span>
                </div>
                <CaretUpDown className="size-6 text-neutral-700" />
            </div>
        </aside>
    );
}