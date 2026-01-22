import { AppLayout } from '@/components/layout/app-layout';
import { ItineraryCategoryPage } from '@/components/features/itinerary/itinerary-category-page';

export default function HotelsPage() {
    return (
        <AppLayout>
            <ItineraryCategoryPage
                type="hotel"
                title="Hotels"
                description="Manage your hotel bookings here."
            />
        </AppLayout>
    );
}
