# Axelere Collective

A modern luxury website for Axelere Collective — a premium creative collective focused on innovation, luxury aesthetics, and forward-thinking ventures in fashion, technology, and design.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, intro, featured ventures, principles, CTA |
| `/about` | About — story, timeline, philosophy, values |
| `/ventures` | Ventures — grid of all portfolio projects |
| `/ventures/[slug]` | Venture Detail — individual project pages |
| `/collective` | Collective — founders and collaborators |
| `/journal` | Journal — editorial writing platform |
| `/contact` | Contact — inquiry form and social links |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Nav, Footer, Cursor, Loading)
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   ├── not-found.tsx         # 404 page
│   ├── about/
│   ├── ventures/
│   │   └── [slug]/           # Dynamic venture detail pages
│   ├── collective/
│   ├── journal/
│   └── contact/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx    # Animated nav + full-screen mobile overlay
│   │   └── Footer.tsx
│   └── ui/
│       ├── CustomCursor.tsx  # Dual-ring custom cursor
│       ├── LoadingScreen.tsx # Animated loading screen with progress bar
│       ├── PageTransition.tsx
│       └── SectionReveal.tsx # Scroll-triggered reveal wrapper
└── lib/
    └── ventures.ts           # Venture data and TypeScript types
```

## Design System

| Token | Value |
|-------|-------|
| Black | `#0a0a0a` |
| Off-white | `#f5f3ef` |
| Metallic (accent) | `#c9b99a` |
| Serif font | Georgia, Times New Roman |
| Sans font | System UI, -apple-system |

## Extending

### Adding a new venture
Edit `src/lib/ventures.ts` and add a new entry to the `ventures` array. The detail page is automatically generated via `generateStaticParams`.

### Adding a journal article
Edit `src/app/journal/JournalClient.tsx` and add to the `articles` array. In production, connect to a CMS (Sanity, Contentful, etc.).

### Adding collective members
Edit `src/app/collective/CollectiveClient.tsx`.
