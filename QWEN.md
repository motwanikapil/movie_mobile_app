# QWEN.md — Project Context for `movie_mobile_app`

## Project Overview

**movie_mobile_app** is a React Native mobile application built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing. It is a movie discovery/browsing app with a dark-themed UI, styled using [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native).

### Key Features (In Progress)
- **Tab-based navigation**: Home, Search, Saved, Profile
- **Movie detail pages**: Dynamic route `movie/[id]` and `movies/[id]`
- **Search functionality**: `SearchBar` component (stub)
- **Custom themed tab bar**: Highlighted active tab with background image

### Tech Stack
| Category | Technology |
|----------|------------|
| Framework | React Native 0.81.5 |
| SDK | Expo ~54.0.33 |
| Routing | expo-router ~6.0.23 (file-based) |
| Navigation | @react-navigation/native, bottom-tabs |
| Styling | NativeWind 4.2.3 + Tailwind CSS 3.4 |
| Language | TypeScript ~5.9.2 |
| Animation | react-native-reanimated 4.1.1, react-native-gesture-handler 2.28 |
| Linting | ESLint (eslint-config-expo) |
| Formatting | Prettier + prettier-plugin-tailwindcss |

## Project Structure

```
movie_mobile_app/
├── app/                          # File-based routing (Expo Router)
│   ├── _layout.tsx               # Root layout (Stack navigator)
│   ├── globals.css               # Tailwind directives
│   ├── onboarding.tsx            # Onboarding screen (unused/stub)
│   ├── (tabs)/                   # Tab group
│   │   ├── _layout.tsx           # Tab bar configuration
│   │   ├── index.tsx             # Home tab
│   │   ├── search.tsx            # Search tab
│   │   ├── saved.tsx             # Saved tab
│   │   └── profile.tsx           # Profile tab
│   ├── movie/
│   │   └── [id].tsx              # Dynamic movie detail route
│   └── movies/
│       └── [id].tsx              # Alternate movie detail route
├── components/
│   └── SearchBar.tsx             # Reusable search bar component
├── constants/
│   ├── icons.ts                  # Icon asset exports
│   └── images.ts                 # Image asset exports
├── interfaces/
│   └── interfaces.d.ts           # TypeScript interfaces (Movie, MovieDetails, TrendingMovie, etc.)
├── assets/                       # Static assets (images, icons)
├── tailwind.config.js            # Tailwind/NativeWind configuration
├── tsconfig.json                 # TypeScript config (strict mode, @/* path alias)
├── app.json                      # Expo app configuration
└── package.json
```

## Building and Running

### Prerequisites
- Node.js (LTS recommended)
- npm (or yarn/pnpm)
- Expo CLI (`npx expo`)
- For native builds: Xcode (iOS) and/or Android Studio (Android), or use [Expo Go](https://expo.dev/go)

### Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npx expo start` | Start the Expo dev server |
| `npm run android` | Start and open on Android (emulator/device) |
| `npm run ios` | Start and open on iOS (simulator/device) |
| `npm run web` | Start and open in web browser |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset to a blank starter project |

## Development Conventions

### TypeScript
- **Strict mode** enabled (`"strict": true` in `tsconfig.json`).
- Path alias `@/*` maps to the project root (e.g., `@/constants/icons`).
- Type definitions for assets are generated via `nativewind-env.d.ts`.

### Styling
- **NativeWind** (Tailwind CSS for React Native) is used for styling via `className` props.
- Global Tailwind directives are imported in `app/globals.css`.
- Custom theme colors defined in `tailwind.config.js`:
  - `primary`: `#030014` (main background)
  - `secondary`: `#151312`
  - `dark-100`: `#221f3d`, `dark-200`: `#0f0d23`
  - `light-100`: `#D6C6FF`, `light-200`: `#A8B5DB`, `light-300`: `#9CA4AB`
  - `accent`: `#ab8bff`

### Interfaces
TypeScript interfaces are centralized in `interfaces/interfaces.d.ts`:
- `Movie` — Standard TMDB movie result
- `MovieDetails` — Full movie detail response
- `TrendingMovie` — Trending/search aggregation model
- `TrendingCardProps` — Props for trending movie card component

### Routing
- Uses **Expo Router** (file-based routing).
- The root layout (`app/_layout.tsx`) defines a Stack with the tab group and movie detail screen.
- Dynamic routes use bracket notation: `movie/[id].tsx`.

## Notes / Current State
- The app is in **early development**. Most screens are stubs/placeholders.
- Movie detail page (`movie/[id].tsx`) only displays the route parameter.
- `SearchBar` component is a visual placeholder (no text input or functionality yet).
- `saved.tsx`, `profile.tsx`, and `search.tsx` tabs exist but are not yet inspected.
- No API integration is visible yet (no fetch calls or API service layer found in explored files).
- The `onboarding.tsx` route exists but is commented out in the home screen.
