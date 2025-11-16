# Galleria -- Modern Art Gallery Platform

A clean, modern, and fully responsive digital art gallery built with
**Next.js 15**, **React Server Components**, **Supabase**, and
**Tailwind CSS**.\
Here is the English translation:

**Galleria displays artworks in an elegant masonry grid, featuring a rich detail view, slideshow navigation, and a complete admin dashboard for managing the collection.**

------------------------------------------------------------------------

## Features

-   **Masonry Grid Layout** -- Visueel aantrekkelijke, responsive grid
    voor kunstwerken\
-   **Artwork Detail View** -- Grote afbeeldingen, artistieke
    informatie, jaar en beschrijving\
-   **Slideshow Navigation** -- Navigeer tussen kunstwerken\
-   **Full-Screen Modal Image View**\
-   **Admin Dashboard** -- Kunstwerken toevoegen, bewerken, verwijderen,
    zichtbaar/onzichtbaar maken\
-   **SSR met React Server Components** -- Snelle laadtijden + SEO\
-   **React Query** -- Client-side caching & datafetching\
-   **Supabase** -- PostgreSQL database + file storage\
-   **Volledig Responsive** -- Mobiel, tablet en desktop

------------------------------------------------------------------------

## Tech Stack

**Frontend** - Next.js 14 (App Router, RSC) - React 18 - TypeScript -
Tailwind CSS + DaisyUI - React Query - Radix UI - Lucide Icons

**Backend** - Supabase (PostgreSQL + Auth + Storage) - Next.js API
Routes

------------------------------------------------------------------------

## Installation

``` bash
git clone https://github.com/yourusername/galleria-slideshow.git
cd galleria-slideshow
npm install
```

### Environment variables

Maak een `.env.local` aan in de project root:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

### Supabase types genereren (optioneel)

``` bash
npm run update-types
```

### Development server starten

``` bash
npm run dev
```

Navigeer naar **http://localhost:3000**.

------------------------------------------------------------------------

## NPM Scripts

Script                   Omschrijving
  ------------------------ -------------------------------------
`npm run dev`            Start development server
`npm run build`          Maakt een production build
`npm run start`          Start de geoptimaliseerde build
`npm run update-types`   Genereert Supabase TypeScript types
`npm run lint`           Lint project

------------------------------------------------------------------------

## 📂 Project Structure

    src/
    │
    ├── app/                    # App Router pagina's
    │   ├── dashboard/          # Admin dashboard
    │   ├── gallery/            # Detailpagina’s
    │   └── page.tsx            # Homepagina (gallery overview)
    │
    ├── _components/            # Reusable UI components
    ├── _hooks/                 # Custom hooks
    ├── _providers/             # React context providers
    ├── _services/              # API & Supabase interacties
    └── _utils/                 # Utility functies
------------------------------------------------------------------------

## Rendering Strategy

Galleria gebruikt een **hybride renderstrategie**:

-   **SSR (React Server Components)** → up-to-date data + SEO
-   **CSR via React Query** → optimale interactiviteit\
-   **revalidatePath()** → automatische updates na Supabase-mutaties

------------------------------------------------------------------------

## Contributing

Bijdragen zijn welkom!

1.  Fork de repository\

2.  Maak een feature branch

    ``` bash
    git checkout -b feature/my-update
    ```

3.  Commit je wijzigingen

    ``` bash
    git commit -m "feat: add my update"
    ```

4.  Push de branch

    ``` bash
    git push origin feature/my-update
    ```

5.  Open een Pull Request

------------------------------------------------------------------------

## License

Dit project valt onder de **MIT License**. Zie `LICENSE`.

------------------------------------------------------------------------

## 📬 Contact

-   Website --- https://shamsinator.nl\
-   Frontend Mentor ---
    https://www.frontendmentor.io/profile/shamsinator\
-   X / Twitter --- https://x.com/Amirsbay
