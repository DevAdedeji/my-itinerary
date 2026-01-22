# My Itinerary

A comprehensive travel itinerary planner application built with Next.js 16 and Tailwind CSS 4. This application allows users to search for flights, hotels, and activities, and add them to their personalized itinerary using a seamless state management system.

## Features

- **Itinerary Management**: Dynamically add and manage Flights, Hotels, and Activities. Your itinerary is persisted locally using Zustand.
- **Search Integration**:
  - **Hotel Search**: Integrated with real/mock APIs to search for destinations and hotels.
  - **Autocomplete**: Specific location autocomplete implementation for hotels.
- **UI/UX**:
  - **Responsive Design**: Built with Tailwind CSS 4 for a mobile-first, responsive interface.
  - **Interactive Elements**: Smooth transitions and modern UI components (Carousels, Cards).
  - **Error Handling**: User-friendly toast notifications (using Sonner) for API errors like quota limits (HTTP 429).
  - **Custom Fonts**: Typography using Matter and Geist fonts for a premium feel.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Utilities**:
  - `date-fns` for date manipulation.
  - `sonner` for toast notifications.
  - `axios` for API requests.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Recent Updates

- **API Error Handling**: Implemented robust error handling for API quota limits (429 Too Many Requests), showing clear toast notifications to the user.
- **Hotel Autocomplete**: Fixed endpoint issues with the hotel destination search to ensure correct autocomplete suggestions.
- **UI Improvements**: Refined flight and hotel cards to fix display issues and ensure all information is clearly visible.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
