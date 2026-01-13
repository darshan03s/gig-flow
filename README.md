# GigFlow

**GigFlow** is a mini-freelance marketplace platform

This is the frontend.

---

## Tech Stack

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **State Management**: Context API
- **HTTP Client**: Fetch
- **Authentication**: JWT via HttpOnly cookies
- **Build Tool**: Vite

---

## Features

- User authentication (Register / Login)
- Browse all open gigs
- Search gigs by title
- Create new gigs (authenticated users)
- Place bids on gigs
- View all bids for owned gigs
- Hire a freelancer

---

## Environment Variables

Create a `.env` file using the example below.

### `.env.example`

```
VITE_API_URL=
```

## Installation

### 1. Clone the repository

```
mkdir gigflow
cd gigflow
git clone https://github.com/darshan03s/gig-flow frontend
cd frontend
```

### 2. Install dependencies

```
pnpm install
```

### 3. Configure environment variables

```
cp .env.example .env
```

Fill in the environment variables.

---

## Running the App

### Development

```
pnpm dev
```

The app will be available at:

```
http://localhost:5173
```

---

### Production Build

```
pnpm build
```
---

# Deployment

## Vercel
https://gigflow.darshans.site

---

# Backend Repository
https://github.com/darshan03s/gig-flow-api