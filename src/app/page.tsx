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
      <div className="overflow-hidden min-h-screen bg-white flex flex-col gap-5 p-4 md:p-8">
        <div style={{ backgroundImage: "url('/banner.png')" }} className="h-50 bg-no-repeat bg-cover bg-center p-6">
          <div className="flex items-center justify-center bg-[#FFFFFF33] size-12">
            <ArrowLeft className="size-6" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="space-y-1 w-full md:w-auto">
            <div className="flex items-center gap-1 py-1 px-2 bg-secondary-100 text-secondary-900 text-sm font-medium w-fit">
              <Calendar className="size-4" />
              <p>21 March 2024</p>
              <ArrowRight />
              <p>21 April 2024</p>
            </div>
            <h2 className="text-xl md:text-2xl text-black font-semibold">
              Bahamas Family Trip
            </h2>
            <div className="flex items-center flex-wrap gap-1 text-sm md:text-base">
              <p className="font-medium text-black-secondary ">New York,  United States of America </p>
              <div className="hidden lg:block w-px border-l border-neutral-500 h-4"></div>
              <p className="font-medium text-black-secondary ">Solo Trip</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <button className="bg-primary-100 py-2 px-4 h-[46px] w-full md:w-40 flex items-center justify-center rounded">
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
