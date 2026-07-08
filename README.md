# Roots N Crunch — Production React App

A fully functional e-commerce web app built with **React 19 + TypeScript + Tailwind CSS + React Router**, rebuilt from the original static prototype per the master spec.

## Running locally

```bash
npm install
npm run dev        # starts dev server at http://localhost:5173
```

## Production build

```bash
npm run build       # type-checks with tsc, then builds to /dist
npm run preview      # serves the production build locally to verify
```

The `/dist` folder is a fully static build — you can deploy it to Vercel, Netlify, GitHub Pages, S3, or any static host as-is.

## Architecture

```
src/
  components/
    layout/     Header, Footer, BottomNav, MobileMenu, Marquee, Layout
    home/       HeroSlider, TrustBadges, BenefitsRow, MoodRecommender,
                TraditionalRecipesPreview, PromoSections, SocialProof, CategoryStrip
    product/    ProductCard, ProductGrid, ProductRail, QuickViewModal
    ui/         Button, Primitives (StarRating, QuantityStepper, EmptyState, Skeleton, Badge)
    ErrorBoundary.tsx
    ProtectedRoute.tsx
  context/      CartContext, WishlistContext, AuthContext, ToastContext (all localStorage-backed)
  hooks/        useLocalStorage, useRecentlyViewed, useRecentSearches
  data/         products.ts, content.ts (categories, moods, recipes, FAQ) — swap for a real API later
  lib/          format.ts, mockApi.ts (simulated network delay + coupon/contact/newsletter endpoints)
  pages/        Home, Shop, ProductDetail, Cart, Checkout, OrderConfirmation, Wishlist,
                Login, Signup, Account, Search, Recipes, Contact, FAQ, NotFound
```

## What's implemented

- **Navigation**: no duplicate icons — Search lives only in the header, Account/Wishlist/Cart only in the bottom nav on mobile (header shows them on desktop where there's no bottom nav)
- **Cart & Wishlist**: persisted to localStorage, live badge counts, toast confirmations
- **Mock auth**: signup/login/logout/session persistence, `ProtectedRoute` guards `/account` and redirects to `/login` with a return path
- **Checkout**: 2-step address → payment flow, coupon code (`ROOTS10` for 10% off), order placed and saved to the logged-in user's order history, confirmation page
- **AI Mood Recommender**: each mood shows a genuinely different product/price/description; "Try another" cycles through additional matches for moods with more than one
- **Search**: live results, recent searches persisted, popular search suggestions
- **Shop**: category filter, price range filter, sort, pagination
- **Product detail**: pack/variant selector, quantity, tabs (details/nutrition/reviews), related products, recently viewed
- **Traditional Recipes**: interactive tabs (Recipes, Cooking Tips, Serving Suggestions, Healthy Pairings, Snack Ideas, Seasonal Recipes, Quick Videos placeholder)
- **Trust badges & benefit cards**: redesigned as premium gradient cards, no emojis
- **Hero slider**: autoplay, manual prev/next, dot navigation, swipe on mobile, pauses on hover
- **Toasts, empty states, loading skeletons, 404 page, error boundary**

## Known simplifications (flagged honestly)

- **"Mock backend"** is an in-memory/localStorage layer (`lib/mockApi.ts`), not a real server — swap the functions there for real `fetch` calls to a backend when ready.
- **Auth** is mock/local only (no password hashing, no real sessions) — fine for a prototype/demo, not for real user data.
- **Hero imagery** is composed from your existing product photos with CSS/SVG (bowl, jaggery cubes) rather than a photographed lifestyle composite.
- **Payment** is simulated — no real payment gateway is wired up.
