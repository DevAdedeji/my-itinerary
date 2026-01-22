import { AppLayout } from '@/components/layout/app-layout';
import SearchContainer from '@/components/features/itinerary/search-container';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg';
import UserPlus from '@/assets/icons/UserPlus.svg';
import DotsThree from '@/assets/icons/DotsThree.svg';
import Calendar from '@/assets/icons/CalendarBlank2.svg';
import ArrowRight from '@/assets/icons/ArrowRight.svg';

export default function Home() {
  return (
    <AppLayout>
      <div className="overflow-hidden min-h-screen bg-white flex flex-col gap-5 p-8">
        <div style={{ backgroundImage: "url('/banner.png')" }} className="h-50 bg-no-repeat bg-cover bg-center p-6">
          <div className="flex items-center justify-center bg-[#FFFFFF33] size-12">
            <ArrowLeft className="size-6" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1 py-1 px-2 bg-secondary-100 text-secondary-900 text-sm font-medium">
              <Calendar className="size-4" />
              <p>21 March 2024</p>
              <ArrowRight />
              <p>21 April 2024</p>
            </div>
            <h2 className="text-2xl text-black font-semibold">
              Bahamas Family Trip
            </h2>
            <div className="flex items-center gap-1">
              <p className="font-medium text-black-secondary ">New York,  United States of America </p>
              <div className="w-px border-l border-neutral-500 h-4"></div>
              <p className="font-medium text-black-secondary ">Solo Trip</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-primary-100 py-2 px-4 h-[46px] w-40 flex items-center justify-center">
              <UserPlus />
            </button>
            <DotsThree className="size-8" />
          </div>
        </div>

        <SearchContainer />

      </div>
    </AppLayout>
  );
}
