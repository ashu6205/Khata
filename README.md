# Khata (Client + Server)

This repository contains two projects: the Next.js frontend (`Khata-Client-main`) and an Express/MongoDB backend (`Khata-Server-main`). This README explains how to run both locally, environment variables, and includes a small sample CSV format for importing transactions.

## Contents

- `Khata-Client-main/` — Next.js client (frontend)
- `Khata-Server-main/` — Express API server (backend)

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

## Environment variables

Create `.env` files in each project as needed.

### Server (`Khata-Server-main/.env`)

Example:

MONGODB_URI=mongodb://localhost:27017/khata_db
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development

### Client (`Khata-Client-main/.env.local`)

Example:

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_actual_api_key_here

> Note: The client reads `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`) to call the backend API.

## Install and run locally (PowerShell)

Open two terminals (one for server, one for client).

Server (from repository root):

```powershell
cd .\Khata-Server-main
npm install
npm run dev   # uses nodemon; or `npm start` to run once
```

Client:

```powershell
cd .\Khata-Client-main
npm install
npm run dev
```

The client runs on `http://localhost:3000` by default and will call the server at `http://localhost:5000` (unless `NEXT_PUBLIC_API_URL` is set).

## API Endpoints (high level)

- Auth: `/api/auth` (register, login, profile)
- Transactions: `/api/transactions` (CRUD, bulk upload endpoint: `/api/transactions/bulk`)
- Health check: `/api/health`

## Transaction CSV sample format

The server expects transactions to match the schema fields in `Khata-Server-main/models/transactionSchema.js`.

CSV columns (header):

userId,date,description,category,type,amount

- userId — MongoDB ObjectId string referencing an existing user (required)
- date — ISO date (YYYY-MM-DD or full ISO)
- description — text (max 200 chars)
- category — one of: `Food & Dining`, `Transportation`, `Shopping`, `Entertainment`, `Bills & Utilities`, `Healthcare`, `Education`, `Travel`, `Business`, `Income`, `Other`
- type — `income` or `expense`
- amount — positive decimal (e.g., `12.50`)

Example rows:

```
507f1f77bcf86cd799439011,2025-09-01,Salary for August,Income,income,2500.00
507f1f77bcf86cd799439011,2025-09-02,Coffee at corner cafe,Food & Dining,expense,4.50
```

## Importing CSV

The server exposes a bulk endpoint: `/api/transactions/bulk`. Check `Khata-Server-main/routes/transactionRoutes.js` to see expected payload and whether it accepts file uploads or JSON arrays.

## Development notes

- Server: `start` runs the server once, `dev` uses `nodemon`.
- Client: `dev`, `build`, `start` are standard Next.js scripts.

If you'd like, I can:

- Add a sample CSV file under `Khata-Server-main/samples/transactions_sample.csv`.
- Add a small Node script to import the CSV into MongoDB using your models.
- Generate a .env.example for both projects.

---

Completion summary: Created top-level `README.md` with run instructions, env examples, CSV format, and next steps.