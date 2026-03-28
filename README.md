# Portfolio

A full-stack portfolio built with React, Vite, TypeScript, Node.js, Express, and MongoDB support.
It showcases projects, skills, writing, resume details, and contact flow with a redesigned aesthetic UI, animated backgrounds, dark mode, case study modals, and admin-ready content management.

## Highlights

- Custom light and dark themes with polished color grading
- Animated background system with layered gradients and motion
- Featured projects with detailed case study modal views
- About, experience, skills, resume, writing, and contact sections
- Responsive layout for desktop and mobile
- Contact form with local fallback storage when MongoDB is unavailable
- Admin-ready backend structure for dynamic content

## Tech Stack

- React 18
- Vite 5
- TypeScript
- React Router
- CSS Modules
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- JWT Authentication

## Local Development

```bash
npm install
npm run dev
```

This starts:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5174`

## Environment Setup

Copy `.env.example` to `.env` and configure the values you need.

Important variables:

- `MONGODB_URI`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`

If MongoDB is not configured locally, contact form submissions are stored in a local fallback file instead of failing.

## Seed Data

```bash
npm run seed
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/    UI sections and modals
  hooks/         reusable React hooks
  pages/         admin page
  styles/        global and app-level styles
server/
  apiApp.js      API routes and data logic
  index.js       backend server entry
seed/            initial content
public/          static assets and resume files
```

## Author

Supratik Sangram
GitHub: [Supratik24](https://github.com/Supratik24)
LinkedIn: [supratik26](https://www.linkedin.com/in/supratik26)
