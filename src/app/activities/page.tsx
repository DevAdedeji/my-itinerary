import { AppLayout } from '@/components/layout/app-layout';
import { ItineraryCategoryPage } from '@/components/features/itinerary/itinerary-category-page';

export default function ActivitiesPage() {
    return (
        <AppLayout>
            <ItineraryCategoryPage
                type="activity"
                title="Activities"
                description="Manage your planned activities here."
            />
        </AppLayout>
    );
}
