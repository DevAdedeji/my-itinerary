import { AppLayout } from '@/components/layout/app-layout';
import { ItineraryCategoryPage } from '@/components/features/itinerary/itinerary-category-page';

export default function FlightsPage() {
    return (
        <AppLayout>
            <ItineraryCategoryPage
                type="flight"
                title="Flights"
                description="Manage your flight itinerary here."
            />
        </AppLayout>
    );
}
