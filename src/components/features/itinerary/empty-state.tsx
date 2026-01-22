import { cn } from '@/lib/utils';
import { SVGProps } from 'react';

interface EmptyStateProps {
    icon: React.FC<SVGProps<SVGSVGElement>>;
    title: string;
    description?: string;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    className
}: EmptyStateProps) {
    return (
        <div className={cn("bg-white p-12 rounded-lg flex flex-col items-center justify-center text-center gap-4 min-h-[300px]", className)}>
            <div className="bg-neutral-100 p-6 rounded-full">
                <Icon className="w-10 h-10 text-black-secondary" />
            </div>
            <div className="space-y-2">
                <p className="font-semibold text-black-primary text-xl">{title}</p>
                {description && (
                    <p className="text-black-secondary text-sm max-w-sm mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
