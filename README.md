# Marvel Frontend Application

A modern, interactive React-based application that allows users to explore the Marvel universe by browsing, searching, and favoriting Marvel characters using the official Marvel API. Built with modern web technologies and best practices.

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Marvel API Integration](#marvel-api-integration)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)

## 🚀 Introduction

This Marvel Frontend Application is a web-based interface that connects to the Marvel API to provide users with access to information about Marvel characters. Users can browse through a list of heroes, search for specific characters, view detailed information about each hero, and maintain a list of favorite characters for quick access.

The application is designed with responsiveness in mind, ensuring a seamless experience across different devices, and implements caching strategies to optimize API usage and improve performance.

## ✨ Features

- **Character Browsing**: View a list of Marvel characters with pagination
- **Search Functionality**: Filter characters by name
- **Detailed Character View**: View comprehensive information about each character
- **Favorites System**: Add/remove characters to/from favorites for quick access
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Data Caching**: Reduces API calls by storing fetched data locally
- **Loading Animations**: Visual feedback during data fetching operations
- **Error Handling**: Graceful handling of API errors and edge cases

## 🔧 Technologies

- **Core**:
  - React 19
  - TypeScript
  - Vite (Build tool)
  
- **State Management**:
  - React Context API
  - Immer & use-immer (Immutable state updates)
  
- **API Integration**:
  - Axios (HTTP client)
  - MD5 (for Marvel API authentication)
  
- **Testing**:
  - Vitest
  - React Testing Library
  
- **Code Quality**:
  - ESLint
  - TypeScript strict mode

## 🏗️ Project Architecture

The application follows a modern React architecture with the following key aspects:

### State Management
- Uses React Context API with `use-immer` for immutable state updates
- Central `StateContext` provides global state across components
- Custom hooks abstract complex logic like API fetching

### Component Design
- Functional components with React Hooks
- Separation of concerns with dedicated components for specific functionalities
- Responsive design principles baked into component styling

### Data Flow
1. API data is fetched through custom hooks
2. Data is processed and stored in context state
3. Components consume state from context and render UI
4. User interactions trigger state updates via context actions

### Caching Strategy
- Implements browser storage for caching fetched data
- Time-based cache invalidation to ensure data freshness
- Reduces unnecessary API calls while maintaining data accuracy

## 📁 Project Structure

```
src/
├── components/              # UI components
│   ├── Header.tsx           # Application header
│   ├── SearchBar.tsx        # Search functionality
│   ├── HeroesList.tsx       # List of heroes display
│   ├── HeroeCard.tsx        # Individual hero card
│   └── ComicList.tsx        # List of comics for a hero
├── hooks/                   # Custom React hooks
│   └── useFetchedData.ts    # Data fetching logic
├── utils/                   # Utility functions
│   └── cacheUtils.ts        # Caching functionality
├── context/
│   └── StateContext.ts      # Global state management
├── mocks/                   # Mock data for testing
├── App.tsx                  # Main application component
├── index.ts                 # Type definitions
└── main.tsx                 # Application entry point
```

## 🔌 Marvel API Integration

This application integrates with the [Marvel Developer API](https://developer.marvel.com/) to fetch character data. The integration includes:

### Authentication
- Uses the Marvel authentication system requiring:
  - Public API key
  - Private API key
  - Timestamp
  - MD5 hash of timestamp + private key + public key

### Data Fetching
- Fetches character data from the `/v1/public/characters` endpoint
- Implements pagination for browsing through large datasets
- Supports searching by character name

### Caching
- Implements a browser storage-based caching system to reduce API calls
- Cached data includes a timestamp for expiration control
- Helps stay within Marvel API rate limits

## 🚦 Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn
- Marvel API keys (obtainable from [Marvel Developer Portal](https://developer.marvel.com/))

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd prueba-fe-marvel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see next section)

4. Start the development server:
```bash
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_MARVEL_API_PUBLIC_KEY=your_public_key_here
VITE_MARVEL_API_PRIVATE_KEY=your_private_key_here
```

You can obtain these keys by registering at the [Marvel Developer Portal](https://developer.marvel.com/).

## 📜 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run test` - Runs the test suite
- `npm run lint` - Runs ESLint for code linting

## 🧪 Testing

The application uses Vitest and React Testing Library for testing. Tests are located alongside the components they test.

To run tests:

```bash
npm run test
```

To run tests with coverage:

```bash
npm run test:coverage
```
