# Amul Kool - Interactive Scroll Experience 🥛

A modern, highly interactive, scroll-driven animated landing page highlighting the legacy and flavors of **Amul Kool**. Built with Vite, vanilla JavaScript, Tailwind CSS, and HTML5 Canvas.

## ✨ Features

- **Smooth Scroll-driven Animation**: 240 custom image frames are preloaded and rendered dynamically on a canvas as you scroll, creating a smooth interactive churning experience.
- **Glassmorphism UI**: Beautiful frosted-glass content cards that overlay the canvas animations seamlessly.
- **Bento Grid Layout**: A premium showcase of Amul Kool flavors with vibrant images and modern hover animations.
- **Micro-interactions & Preloader**: Interactive navigation headers, hover transitions, and a customized loader indicating asset preload progress.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES Modules)
- **Styling**: Tailwind CSS & Custom Vanilla CSS (`style.css`)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashutosh7643/amul-kool.git
   cd amul-kool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To build the static assets for production:
```bash
npm run build
```
The output will be generated inside the `dist/` directory.

## ☁️ Deployment on Vercel

This project is fully optimized and ready to deploy on **Vercel**.

### Steps to Deploy:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and log in.
2. Click **Add New** > **Project**.
3. Import the `amul-kool` repository from your GitHub account.
4. Vercel will automatically detect **Vite** as the framework preset:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build the project and host it automatically!

---

*© 2026 Amul Kool Premium Dairy. Crafted with care.*
