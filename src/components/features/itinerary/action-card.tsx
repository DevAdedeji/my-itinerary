import { cn } from '@/lib/utils';

interface ActionCardProps {
    title: string;
    description: string;
    buttonText: string;
    variant: 'dark' | 'light' | 'blue';
    onClick?: () => void;
    className?: string;
}

export function ActionCard({
    title,
    description,
    buttonText,
    variant,
    onClick,
    className
}: ActionCardProps) {
    const variants = {
        dark: {
            container: 'bg-primary-1100 text-white',
            button: 'bg-primary-600 text-white hover:bg-primary-700'
        },
        light: {
            container: 'bg-primary-100 text-black-primary',
            button: 'bg-primary-600 text-white hover:bg-primary-700'
        },
        blue: {
            container: 'bg-primary-600 text-white',
            button: 'bg-white text-primary-600 hover:bg-gray-50'
        }
    };

    const styles = variants[variant];

    return (
        <div className={cn("p-4 rounded flex flex-col h-[193px] justify-between", styles.container, className)}>
            <div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className={cn("text-sm leading-relaxed", variant === 'light' ? 'text-black-secondary' : 'text-white/90')}>
                    {description}
                </p>
            </div>

            <button
                onClick={onClick}
                className={cn("w-full py-3 rounded text-sm font-medium transition-colors mt-auto", styles.button)}
            >
                {buttonText}
            </button>
        </div>
    );
}
