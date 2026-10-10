# Aryan Katoch — Immersive 3D Portfolio

Built on the same engine as arvinexsarthak.online (Vite + React + TypeScript + Three.js + Tailwind),
re-themed in ember/gold and rewritten for Aryan's role at Arvinex Venture.

## Edit content
All text lives in `src/data/portfolioData.ts`. No invented numbers, clients or testimonials —
add real results there (with client permission) when they exist.

## Add Aryan's photo
Put the image in `src/assets/images/`, import it in `ProfileSection.tsx` / `PersonalSection.tsx`,
and pass it to `<MonogramCard photo={img} ... />`. Until then a monogram card is shown.

## Run / build
    npm install
    npm run dev      # http://localhost:3000
    npm run build    # outputs dist/

## Deploy on Vercel (aryan-katoch.vercel.app)
Import the folder/repo in Vercel → Framework preset: **Vite** → Build command `npm run build` → Output `dist`.
Or upload the ready-built `dist/` folder as a static site.

## Contact form
Sends via FormSubmit to aryankatoch236@gmail.com. The first submission triggers a one-time
activation email from FormSubmit — click the link in it once. WhatsApp fallback is built in.
