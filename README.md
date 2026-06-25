# Tutor Marketplace — Frontend

A modern, full-featured tutor-student marketplace UI built with Next.js 16, TypeScript, and Tailwind CSS v4 — with integrated **Stripe Checkout**, **Cloudinary profile images**, and **forgot / reset password** flows.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=brandfolder&logoColor=orange)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

## 🌐 Live Links

- **Frontend UI Client:** [https://tutor-marketplace-sani.vercel.app](https://tutor-marketplace-sani.vercel.app)
- **Backend API Server:** [https://tutor-marketplace-backend.onrender.com](https://tutor-marketplace-backend.onrender.com)

> ⚠️ **Important Note:** This repository contains the frontend client only. It requires the backend API to be running to function correctly. You can find the backend repository here: [tutor-marketplace-backend](https://github.com/Sani-Mohibur/tutor-marketplace-backend)

---

## 📚 Table of Contents

- [Overview](#overview)
- [What's New](#whats-new)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Authentication & Authorization](#authentication--authorization)
- [Stripe Payment Flow](#stripe-payment-flow)
- [Cloudinary Profile Images](#cloudinary-profile-images)
- [Forgot / Reset Password](#forgot--reset-password)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

**Tutor Marketplace** is a full-stack tutoring marketplace platform. This repository contains the **Next.js frontend** that provides:

- **Public landing page** — hero section, featured tutors, categories, and a skills marquee
- **Tutor discovery** — browse, search, and filter verified tutors by skill and category
- **Authentication flows** — role-based sign-up (student / tutor), sign-in, and **forgot / reset password** via `better-auth`
- **Stripe Checkout** — students pay for sessions via Stripe with payment success / cancel pages and downloadable PDF receipts
- **Cloudinary profile images** — users upload and display profile photos stored on Cloudinary
- **Student dashboard** — view bookings, submit reviews, manage profile, and initiate payments
- **Tutor dashboard** — manage availability slots (with payment method selection), view incoming bookings, and update profile
- **Admin panel** — platform-wide stats, user management, tutor verification, and category control
- **Dark / Light theme** — system-aware theme toggle with persistent preference
- **Responsive design** — mobile-first layouts across all pages

---

## What's New

### 💳 Stripe Checkout Integration

- **Payment method on slots** — tutors can set each availability slot to accept `cash`, `stripe`, or `both` payment methods
- **Stripe Checkout redirect** — students are redirected to Stripe's hosted checkout page for secure card payments
- **Payment Success page** (`/payment-success`) — animated confirmation screen with full receipt details (session info, tutor name, amount, transaction ID)
- **Payment Cancel page** (`/payment-cancel`) — friendly cancel screen with option to retry from the bookings dashboard
- **PDF receipt download** — students can download a beautifully styled PDF receipt generated server-side

### 🖼️ Cloudinary Profile Images

- **Profile photo upload** — students and tutors can upload profile images from the profile edit page
- **Cloudinary-hosted images** — photos are served from `res.cloudinary.com` with Next.js Image optimization enabled
- **Face-aware cropping** — uploaded images are auto-cropped to 400×400 with face detection

### 🔑 Forgot / Reset Password

- **Forgot Password page** (`/forgot-password`) — users enter their email to receive a password reset link
- **Reset Password page** (`/reset-password`) — users enter a new password using the token from the email link
- **Integrated with better-auth** — uses the built-in `forgetPassword` and `resetPassword` client methods

> ⚠️ **Known Issue:** The forgot password flow works correctly on localhost but may experience issues when deployed on Render (backend) due to transactional email delivery constraints.

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
| Payments         | Stripe Checkout (via backend API)           |
| Image Hosting    | Cloudinary (via Next.js Image optimization) |
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
│   │   │   │   ├── register/     # Sign-up page
│   │   │   │   ├── forgot-password/  # Forgot password page (NEW)
│   │   │   │   └── reset-password/   # Reset password page (NEW)
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
│   │   │   ├── payment-success/  # Stripe payment success page (NEW)
│   │   │   ├── payment-cancel/   # Stripe payment cancel page (NEW)
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
│   │   ├── auth/                 # Login, Register, ForgotPassword, ResetPassword forms
│   │   ├── bookings/             # Booking cards & lists (+ payment actions)
│   │   ├── dashboard/            # Dashboard widgets
│   │   ├── home/                 # Hero, FeaturedTutors, Marquee, etc.
│   │   ├── layout/               # Navbar & Footer
│   │   ├── profile/              # Profile edit forms (+ image upload)
│   │   ├── reviews/              # Review components
│   │   ├── shared/               # Reusable shared components
│   │   ├── slots/                # Slot picker & management (+ payment method)
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
├── next.config.ts                # Next.js config (+ Cloudinary remote images)
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
- **Payment method selection** — tutors choose `cash`, `stripe`, or `both` for each slot
- Students view and book available slots

### 📋 Bookings (`/bookings`)

- Students view all their past and upcoming bookings
- Booking status lifecycle: `pending → confirmed → completed / cancelled`
- **Pay Now button** — students can initiate Stripe Checkout for unpaid bookings

### 💳 Payment Success (`/payment-success`)

- Animated success confirmation with confetti effect
- Displays full receipt: session title, tutor name, date, duration, location, amount paid
- **Download Receipt as PDF** — server-generated styled PDF receipt
- Transaction reference ID display

### ❌ Payment Cancel (`/payment-cancel`)

- Friendly cancellation screen
- Option to navigate to bookings dashboard and retry payment later

### ⭐ Reviews (`/reviews`)

- Students submit one review per completed booking
- Tutor aggregate ratings updated automatically via the backend

### 👤 Profile (`/profile`)

- View and edit user profile information
- **Profile image upload** — upload and preview profile photos stored on Cloudinary
- Tutor-specific fields: bio, price per hour, experience years, categories

### 📊 Dashboard (`/dashboard`)

Role-based parallel routes using Next.js `@student` / `@tutor` slots:

- **Student dashboard** — upcoming sessions, booking history, quick stats
- **Tutor dashboard** — slot management, booking requests, earnings overview

### 🔐 Auth (`/login`, `/register`)

- Email/password authentication via `better-auth`
- Role selection during registration (`student` or `tutor`)
- Session persisted via HTTP-only cookies

### 🔑 Forgot Password (`/forgot-password`)

- Email input form to request a password reset link
- Sends a styled HTML email with a reset token via the backend

### 🔑 Reset Password (`/reset-password`)

- Token-based password reset form (accessed from the email link)
- Sets a new password and redirects to login

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

## Stripe Payment Flow

The frontend integrates with the backend's Stripe Checkout API:

1. **Slot creation** — tutors select a payment method (`cash`, `stripe`, or `both`) when creating availability slots
2. **Booking + Payment** — depending on the slot's payment method:
   - **Cash / Both:** Student books first → can pay later via "Pay Now" from their bookings list
   - **Stripe-only:** Student is redirected to Stripe Checkout immediately → booking is created after payment
3. **Stripe Checkout** — the backend creates a Stripe Checkout Session and returns the URL; the frontend redirects the student
4. **Success / Cancel** — Stripe redirects back to:
   - `/payment-success?session_id={id}` — shows receipt with session details and PDF download
   - `/payment-cancel?booking_id={id}` — shows friendly cancel message with retry option

> 💡 The frontend uses Next.js API rewrites (`/api/:path*` → backend) to proxy API calls, avoiding CORS issues during Stripe checkout flows.

---

## Cloudinary Profile Images

- **Upload flow:** Profile edit forms include an image upload field that sends a `multipart/form-data` request to `POST /api/profile/upload-image`
- **Display:** Profile images are served from `res.cloudinary.com` and rendered via Next.js `<Image>` component
- **Next.js config:** `next.config.ts` includes `res.cloudinary.com` in `images.remotePatterns` for optimized image loading

---

## Forgot / Reset Password

1. **Forgot Password** (`/forgot-password`) — user enters their email and the `ForgotPasswordForm` component calls `authClient.forgetPassword()`
2. **Email delivery** — the backend sends a styled HTML email via Brevo with a reset link containing a secure token
3. **Reset Password** (`/reset-password?token=...`) — the `ResetPasswordForm` component reads the token from the URL and calls `authClient.resetPassword()` with the new password
4. **Redirect** — on success, the user is redirected to the login page

> ⚠️ **Known Issue:** The email delivery works on localhost but may experience issues when deployed on Render. See the backend README for details.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (or pnpm / yarn)
- A running instance of the [Tutor Marketplace Backend](https://github.com/Sani-Mohibur/tutor-marketplace-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sani-Mohibur/tutor-marketplace-frontend.git
cd tutor-marketplace

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# For local development
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe (publishable key for client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

| Variable                             | Description                                    | Required |
| ------------------------------------ | ---------------------------------------------- | -------- |
| `NEXT_PUBLIC_BACKEND_URL`            | Base URL of the backend API server             | ✅       |
| `NEXT_PUBLIC_API_URL`                | API URL used for proxying requests             | ✅       |
| `NEXT_PUBLIC_BASE_URL`               | Base URL of the frontend (used by auth client) | ✅       |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (from Stripe Dashboard) | ✅       |

> **Note for production/live deployment:**  
> Set `NEXT_PUBLIC_API_URL` to your **frontend** URL (e.g. `https://tutor-marketplace-sani.vercel.app/api`) to prevent session state mismatches between Render (backend) and Vercel (frontend).

```env
# For live deployment
NEXT_PUBLIC_BACKEND_URL=https://tutor-marketplace-backend.onrender.co
NEXT_PUBLIC_API_URL=https://tutor-marketplace-sani.vercel.app/api
NEXT_PUBLIC_BASE_URL=https://tutor-marketplace-sani.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the Next.js development server      |
| `npm run build` | Build the production bundle               |
| `npm run start` | Start the production server (after build) |
| `npm run lint`  | Run ESLint across the project             |

---

## Deployment

This project is deployed on **Vercel**.

**Steps to deploy:**

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_BACKEND_URL`
   - `NEXT_PUBLIC_API_URL` (use the Vercel frontend URL, e.g. `https://your-app.vercel.app/api`)
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Deploy — Vercel will automatically detect Next.js and configure the build.

> 💡 **Cloudinary images** work out of the box — `next.config.ts` already includes `res.cloudinary.com` in the allowed remote image patterns.
