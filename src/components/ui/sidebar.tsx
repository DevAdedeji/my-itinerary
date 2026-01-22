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
        <aside className="sticky top-[154px] rounded-sm w-[300px] bg-white flex flex-col p-6 self-start max-h-[calc(100vh-174px)]">
            <nav className="flex-1 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-gray-50 text-primary-600 shadow-primary-600/20"
                                    : "text-black-secondary hover:bg-gray-50 hover:text-primary-600"
                            )}
                        >
                            <item.icon className={cn("size-8", isActive ? "text-white" : "group-hover:text-primary-600")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="my-auto h-[86px] bg-gray-50 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 rounded text-base text-white size-[50px] flex items-center justify-center">Go</div>
                    <span className="text-gray-600 text-sm font-medium">Personal Account</span>
                </div>
                <CaretUpDown className="size-6 text-neutral-700" />
            </div>
        </aside>
    );
}