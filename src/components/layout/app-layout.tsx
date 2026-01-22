import { Sidebar } from '../ui/sidebar';
import { Navbar } from '../ui/navbar';
import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-300 font-sans text-gray-900">
            <Navbar />
            <main className="flex flex-col md:flex-row items-start gap-6 md:gap-10 px-4 md:px-10 pt-6 md:pt-10">
                <Sidebar />
                <div className="flex-1 pb-10 min-w-0 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}