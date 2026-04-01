# New Bloom Fullstack Starter

## What is in this folder

- `index.html` → your frontend website
- `backend/server.js` → your backend starter
- `backend/package.json` → backend dependencies
- `backend/data/readings.json` → where saved readings go

## Run the frontend

Open `index.html` in your browser, or upload it to GitHub Pages.

## Run the backend

1. Open a terminal
2. Go into the backend folder
3. Run:

```bash
npm install
npm start
```

Your backend will run at:

```bash
http://localhost:3000
```

## What works

- Save numerology readings to the backend
- Read saved reports from a local JSON file
- Frontend calls backend with `fetch()`

## Important

This is a starter backend.
For the real version later, add:
- real authentication
- database like Firebase or Supabase
- astrology API
- AI summaries
- real PDF generation
