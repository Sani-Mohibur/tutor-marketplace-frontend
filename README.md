# SkillBridge — Frontend

A modern, full-featured tutor-student marketplace UI built with Next.js 16, TypeScript, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=brandfolder&logoColor=orange)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 🌐 Live Links

- **Frontend UI Client:** [https://skillbridge-sani.vercel.app](https://skillbridge-sani.vercel.app)
- **Backend API Server:** [https://skill-bridge-backend-x2sb.onrender.com](https://skill-bridge-backend-x2sb.onrender.com)

> ⚠️ **Important Note:** This repository contains the frontend client only. It requires the backend API to be running to function correctly. You can find the backend repository here: [skill-bridge-backend](https://github.com/Sani-Mohibur/skill-bridge-backend)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Authentication & Authorization](#authentication--authorization)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

**SkillBridge** is a full-stack tutoring marketplace platform. This repository contains the **Next.js frontend** that provides:

- **Public landing page** — hero section, featured tutors, categories, and a skills marquee
- **Tutor discovery** — browse, search, and filter verified tutors by skill and category
- **Authentication flows** — role-based sign-up (student / tutor) and sign-in via `better-auth`
- **Student dashboard** — view bookings, submit reviews, and manage profile
- **Tutor dashboard** — manage availability slots, view incoming bookings, and update profile
- **Admin panel** — platform-wide stats, user management, tutor verification, and category control
- **Dark / Light theme** — system-aware theme toggle with persistent preference
- **Responsive design** — mobile-first layouts across all pages

---

## Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Framework        | Next.js 16.2.9 (App Router)                 |
| Language         | TypeScript 5                                |
| UI Library       | React 19                                    |
| Styling          | Tailwind CSS v4 + `tw-animate-css`          |
| Component System | shadcn/ui (Radix UI primitives)             |
| Authentication   | better-auth 1.6 (client-side session)       |
| Icons            | lucide-react                                |
| Notifications    | sonner (toast notifications)                |
| Date Utilities   | date-fns, react-day-picker                  |
| Font             | Geist Sans + Geist Mono (Google Fonts)      |
| Linting          | ESLint 9 + eslint-config-next               |

---

## Project Structure

```
skill-bridge/
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   ├── (client)/             # Main client-side routes
│   │   │   ├── (auth)/           # Auth pages (no layout chrome)
│   │   │   │   ├── login/        # Sign-in page
│   │   │   │   └── register/     # Sign-up page
│   │   │   ├── (public)/         # Informational pages
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   ├── how-it-works/
│   │   │   │   ├── privacy/
│   │   │   │   └── terms/
│   │   │   ├── bookings/         # Booking management
│   │   │   ├── dashboard/        # Role-split dashboard
│   │   │   │   ├── @student/     # Student parallel route
│   │   │   │   └── @tutor/       # Tutor parallel route
│   │   │   ├── profile/          # User profile page
│   │   │   ├── reviews/          # Review submission
│   │   │   ├── slots/            # Tutor availability slots
│   │   │   ├── tutors/           # Tutor listing & detail pages
│   │   │   ├── layout.tsx        # Client layout (Navbar + Footer)
│   │   │   └── page.tsx          # Home page (SSR featured tutors)
│   │   ├── admin/                # Admin panel routes
│   │   ├── globals.css           # Global styles & CSS variables
│   │   ├── layout.tsx            # Root layout (fonts, theme, toaster)
│   │   └── not-found.tsx         # 404 page
│   ├── components/
│   │   ├── admin/                # Admin-specific components
│   │   ├── auth/                 # Login & register forms
│   │   ├── bookings/             # Booking cards & lists
│   │   ├── dashboard/            # Dashboard widgets
│   │   ├── home/                 # Hero, FeaturedTutors, Marquee, etc.
│   │   ├── layout/               # Navbar & Footer
│   │   ├── profile/              # Profile edit forms
│   │   ├── reviews/              # Review components
│   │   ├── shared/               # Reusable shared components
│   │   ├── slots/                # Slot picker & management
│   │   ├── tutors/               # TutorCard, TutorDetail, search filters
│   │   └── ui/                   # shadcn/ui base components
│   ├── constants/
│   │   └── roles.ts              # USER_ROLES constants
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark/light theme provider
│   └── lib/
│       ├── auth-client.ts        # better-auth client configuration
│       └── utils.ts              # Shared utility functions (cn, etc.)
├── .env                          # Local environment variables
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Pages & Features

### 🏠 Home (`/`)
Server-side rendered landing page featuring:
- **Hero section** — headline, CTA buttons, and animated elements
- **Featured Categories** — browsable skill category cards
- **Featured Tutors** — SSR-fetched tutor highlights (revalidates every 10 minutes)
- **Infinite Marquee** — scrolling skills/topics ticker

### 🔍 Tutors (`/tutors`)
- Browse all verified tutors with search and category filters
- Tutor detail pages with bio, rating, categories, pricing, and booking CTA

### 📅 Slots (`/slots`)
- Tutors create and manage availability time slots
- Students view and book available slots

### 📋 Bookings (`/bookings`)
- Students view all their past and upcoming bookings
- Booking status lifecycle: `pending → confirmed → completed / cancelled`

### ⭐ Reviews (`/reviews`)
- Students submit one review per completed booking
- Tutor aggregate ratings updated automatically via the backend

### 👤 Profile (`/profile`)
- View and edit user profile information
- Tutor-specific fields: bio, price per hour, experience years, categories

### 📊 Dashboard (`/dashboard`)
Role-based parallel routes using Next.js `@student` / `@tutor` slots:
- **Student dashboard** — upcoming sessions, booking history, quick stats
- **Tutor dashboard** — slot management, booking requests, earnings overview

### 🔐 Auth (`/login`, `/register`)
- Email/password authentication via `better-auth`
- Role selection during registration (`student` or `tutor`)
- Session persisted via HTTP-only cookies

### 🛠️ Admin (`/admin`)
Protected admin panel (requires `admin` role):
- Platform-wide statistics
- User management (view, block, role management)
- Tutor verification control
- Category management (create, update, delete)

---

## Authentication & Authorization

Authentication is handled by the [`better-auth`](https://www.npmjs.com/package/better-auth) library, integrated on both frontend and backend:

- The client is configured in `src/lib/auth-client.ts`
- Sessions are maintained via HTTP-only cookies (set by the backend)
- Three roles are enforced: **`student`**, **`tutor`**, and **`admin`**
- Role constants are defined in `src/constants/roles.ts`
- The dashboard uses **Next.js parallel routes** (`@student` / `@tutor`) to render role-appropriate content without a redirect

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (or pnpm / yarn)
- A running instance of the [SkillBridge Backend](https://github.com/Sani-Mohibur/skill-bridge-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sani-Mohibur/skill-bridge.git
cd skill-bridge

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# For local development
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note for production/live deployment:**  
> Set `NEXT_PUBLIC_API_URL` to your **frontend** URL (e.g. `https://skillbridge-sani.vercel.app/api`) to prevent session state mismatches between Render (backend) and Vercel (frontend).

```env
# For live deployment
NEXT_PUBLIC_BACKEND_URL=https://skill-bridge-backend-x2sb.onrender.com
NEXT_PUBLIC_API_URL=https://skillbridge-sani.vercel.app/api
NEXT_PUBLIC_BASE_URL=https://skillbridge-sani.vercel.app
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Script          | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Start the Next.js development server             |
| `npm run build` | Build the production bundle                      |
| `npm run start` | Start the production server (after build)        |
| `npm run lint`  | Run ESLint across the project                    |

---

## Deployment

This project is deployed on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sani-Mohibur/skill-bridge)

**Steps to deploy:**

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_BACKEND_URL`
   - `NEXT_PUBLIC_API_URL` (use the Vercel frontend URL)
   - `NEXT_PUBLIC_BASE_URL`
4. Deploy — Vercel will automatically detect Next.js and configure the build.
