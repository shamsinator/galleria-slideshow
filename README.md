# Galleria

![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.45.1-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)

A modern, responsive art gallery application that showcases artwork with detailed information and a beautiful masonry layout.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Galleria is a digital art exhibition platform that allows users to browse through a collection of artwork in an elegant masonry grid layout. Users can view detailed information about each artwork, including high-resolution images, artist information, year of creation, and descriptions. The application also includes an admin dashboard for managing the artwork collection.

## Features

- **Masonry Grid Gallery**: Browse artwork in a responsive, visually appealing layout
- **Detailed Artwork View**: View comprehensive information about each artwork
- **Slideshow Navigation**: Navigate between artwork in a slideshow format
- **Modal Image View**: Expand artwork images for a closer look
- **Admin Dashboard**: Manage artwork with features to add, edit, delete, and toggle visibility
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Server-Side Rendering**: Fast page loads and improved SEO
- **Image Optimization**: Efficient loading of artwork images

## Technologies Used

### Frontend

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static type checking for improved code quality
- **Tailwind CSS**: Utility-first CSS framework for styling
- **DaisyUI**: Component library for Tailwind CSS
- **React Query**: Data fetching and state management

### Backend

- **Supabase**: Backend as a service (BaaS) with PostgreSQL database
- **Next.js API Routes**: Server-side API endpoints

### Tools & Libraries

- **Radix UI**: Accessible UI components
- **Lucide React**: Icon library
- **React Spinners**: Loading indicators

## Rendering Strategy

- Primary: SSR (with React Server Components) for pages that read from Supabase, providing fresh data and SEO benefits.
  - Examples: `src/app/page.tsx` prefetches data on the server and hydrates via React Query; `src/app/gallery/[slug]/page.tsx` is an async server component fetching artwork details; `src/app/dashboard/page.tsx` fetches on the server.
- CSR for interactive parts of the UI where client state and user actions dominate.
  - Examples: `src/_components/ArtworkGallery.tsx` and `src/_components/Header/SlideshowButton.tsx` are client components using React Query to fetch/caches data; `src/_components/AddArtworkModal.tsx` uses client-side form state and server actions.
- SSG/ISR: Not the default fit because content changes in Supabase (admin can add/toggle visibility), and the app already uses server actions with `revalidatePath`. You could adopt ISR later by adding `revalidate` and `generateStaticParams` to specific routes if the dataset stabilizes, but the current design favors SSR + CSR hydration for freshness.

In short: This project is best suited as a hybrid app — SSR for data-driven pages, with CSR for interactive components; SSG is optional only for truly static pages.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/galleria-slideshow.git
   cd galleria-slideshow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Generate Supabase types (optional)**

   ```bash
   npm run update-types
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Browsing the Gallery

1. The homepage displays a masonry grid of artwork thumbnails.
2. Click on any artwork to view its detailed information.
3. In the detailed view, you can:
   - View high-resolution images
   - Read about the artwork and artist
   - Navigate to previous/next artwork
   - Click "View Image" to see the artwork in a modal view

### Using the Admin Dashboard

1. Navigate to the dashboard at `/dashboard`.
2. Here you can:
   - View all artwork in a table format
   - Add new artwork using the "Add Artwork" button
   - Edit existing artwork
   - Delete artwork
   - Toggle the visibility of artwork

## Folder Structure

```
galleria-slideshow/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── gallery/        # Artwork detail pages
│   │   └── page.tsx        # Homepage
│   ├── _components/        # Reusable UI components
│   ├── _hooks/             # Custom React hooks
│   ├── _providers/         # Context providers
│   ├── _services/          # Service layer for API interactions
│   └── _utils/             # Utility functions
├── supabase/               # Supabase configuration
├── types.ts                # Global TypeScript types
├── next.config.mjs         # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Website - [shamsinator.nl](https://www.shamsinator.nl)
- Frontend Mentor - [@shamsinator](https://www.frontendmentor.io/profile/shamsinator)
- X - [@Amirsbay](https://x.com/Amirsbay)

---

[Back to top](#Galleria)
