import { Sidebar } from '../ui/sidebar';
import { Navbar } from '../ui/navbar';
import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-300 font-sans text-gray-900">
            <Navbar />
            <main className="flex items-start gap-10 px-10 pt-10">
                <Sidebar />
                <div className="flex-1 pb-10 min-w-0">
                    {children}
                </div>
            </main>
        </div>
    );
}