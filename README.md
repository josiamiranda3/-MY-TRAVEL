# MY TRAVEL 2.0 — Immersive Travel Explorer

An immersive, frontend-only travel discovery and trip-planning application built with **Angular 21** and TypeScript.

MY TRAVEL provides an interactive environment where users can discover destinations, explore travel inspiration, organize trips, manage favorite places, and personalize their traveler profile through a responsive and visually engaging interface.

The project focuses on user experience, modular frontend architecture, responsive design, and browser-based data persistence.

---

## Overview

MY TRAVEL is a travel exploration platform designed to bring destination discovery and personal trip organization together in one application.

The application offers a collection of destinations, detailed destination pages, a personal wishlist, a trip planner, and a customizable traveler profile.

The project was migrated from its original React implementation to Angular 21, adopting standalone components, lazy-loaded routes, Angular Signals, TypeScript strict settings, and an SCSS-based design system.

**Project type:** Frontend Web Application  
**Framework:** Angular 21  
**Architecture:** Standalone Components  
**Rendering:** Client-side  
**Backend:** Not required

---

## Features

### 1. Immersive Homepage

- Travel-inspired landing page.
- Featured destinations and editorial content.
- Destination search functionality.
- Destination categories.
- Curated travel inspiration.
- Responsive visual sections.

### 2. Destination Exploration

- Destination catalogue.
- Combined search and filtering.
- Continent filters.
- Category filters.
- Budget filters.
- Sorting options.
- Load more functionality.
- Destination cards with relevant information.

### 3. Destination Details

- Dynamic destination pages.
- Destination image galleries.
- Interactive gallery lightbox.
- Keyboard-friendly gallery controls.
- Destination facts and information.
- Attractions and points of interest.
- Travel tips and recommendations.

### 4. Wishlist

- Save favorite destinations.
- Remove saved destinations.
- Persistent wishlist.
- Dedicated wishlist page.
- Empty states and user feedback.

### 5. Trip Planner

- Create and manage trips.
- Delete existing trips.
- Add and manage activities.
- Track activity completion.
- Estimate trip expenses.
- Validate trip dates.
- Organize travel plans through a dedicated interface.

### 6. Traveler Profile

- Editable traveler information.
- Five selectable profile avatars.
- Travel preference customization.
- Personalized profile settings.
- Persistent user preferences.
- Light and dark themes.

### 7. User Experience

- Responsive navigation.
- Mobile-friendly layouts.
- Toast notifications.
- Empty states.
- Interactive interface elements.
- Consistent visual design.
- Responsive SCSS styling.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Angular 21 | Frontend framework |
| TypeScript | Application logic and type safety |
| Angular Signals | Reactive state management |
| RxJS | Reactive programming |
| SCSS | Styling and responsive design |
| HTML5 | Application structure |
| LocalStorage | Browser-based persistence |
| IndexedDB | Trip data persistence |
| Angular Router | Navigation and lazy-loaded routes |

### Development Principles

- Standalone Angular components.
- Lazy-loaded application routes.
- Type-safe development.
- Separation of application responsibilities.
- Reusable interface components.
- Responsive design system.
- Browser-native persistence.
- No mandatory external backend.

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Homepage and featured destinations |
| `/explore` | Destination discovery and filtering |
| `/destination/:slug` | Dynamic destination details |
| `/wishlist` | Saved destinations |
| `/planner` | Trip planning and activity management |
| `/profile` | Traveler profile and preferences |

---

## Project Structure

The application follows a modular Angular structure:

```text
my-travel/
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── data/
│   │   │   └── services/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── explore/
│   │   │   ├── destination-detail/
│   │   │   ├── wishlist/
│   │   │   ├── planner/
│   │   │   └── profile/
│   │   ├── shared/
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles.scss
│   └── index.html
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*The structure above represents the main application organization; individual files may vary according to the current implementation.*

---

## Getting Started

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- Git
- A code editor such as Visual Studio Code

### Installation

Clone the repository:

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

Navigate to the project directory:

```bash
cd my-travel
```

Install dependencies:

```bash
npm install
```

### Run the development server

```bash
npm start
```

Open the URL provided by Angular CLI:

```text
http://localhost:4200
```

The application automatically reloads when source files are modified.

---

## Production Build

Generate an optimized production build:

```bash
npm run build
```

The production output is generated in:

```text
dist/my-travel/browser
```

The generated production files can be deployed to a compatible static hosting provider.

---

## Data and Persistence

MY TRAVEL operates entirely in the browser and does not require a backend server.

### Destination Catalogue

The destination catalogue is bundled locally:

```text
src/app/core/data/destinations.ts
```

Destination information is available without requiring an external API.

### LocalStorage

LocalStorage is used for browser-based persistence of:

- Wishlist information.
- Traveler profile information.
- User preferences.
- Theme configuration.

### IndexedDB

IndexedDB is used for trip-related data, with a LocalStorage backup/fallback mechanism.

**Data limitations:**

- Information is stored in the current browser profile.
- There is no cloud synchronization.
- There is no user authentication system.
- Clearing browser storage may remove saved information.
- Data is not automatically synchronized between devices.

---

## External Resources

Destination imagery uses local assets where available and publicly accessible image URLs for other destinations.

Some profile avatars and external images depend on internet connectivity.

The application does not require API credentials to operate.

---

## Important Notes and Limitations

- Destination budgets are illustrative estimates in USD, not live travel quotes.
- Newsletter interactions are local-only and do not send emails.
- Trip planning does not book flights, hotels, or activities.
- No payment processing is implemented.
- No backend or authentication service is included.
- Browser storage is local to the user's device and browser profile.
- External images may become unavailable if their hosting provider changes or removes them.

---

## Future Improvements

Potential development directions include:

- Integration with real travel APIs.
- Weather information for destinations.
- Interactive maps.
- Enhanced itinerary management.
- More advanced destination recommendations.
- Cloud-based synchronization.
- User authentication.
- Backend integration.

These improvements are not prerequisites for the current frontend-only application.

---

## Project Goals

MY TRAVEL was developed to demonstrate practical frontend engineering skills through a complete travel-oriented web application.

The project emphasizes:

- Angular application architecture.
- Component-based development.
- Reactive state management.
- Responsive interface development.
- Browser storage integration.
- Dynamic routing.
- User experience and interface design.
- TypeScript and SCSS organization.

---

## License

This project is available for educational and portfolio purposes.

---

**MY TRAVEL 2.0 — Discover places. Plan experiences. Explore the world.**