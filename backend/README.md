# Mind Trainer API (Express + MongoDB)

## Setup

1. Install [MongoDB](https://www.mongodb.com/try/download/community) and start it locally  
   (or set `MONGODB_URI` to Atlas).

2. Install & run:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API: http://localhost:4000  
Health: http://localhost:4000/api/health

## Env

See `.env.example` — `MONGODB_URI`, `AUTH_SECRET`, `FRONTEND_URL`, optional AWS S3.

## Routes

- `GET/POST /api/auth/*` — bootstrap, create-super-admin, login, logout, me
- `GET/POST/PATCH/DELETE /api/users`
- `GET/POST/PATCH/DELETE /api/programs` (+ `GET /api/programs/all`)
- `GET/POST/PATCH/DELETE /api/workshops`
- `GET /api/events`
- `POST /api/upload`
