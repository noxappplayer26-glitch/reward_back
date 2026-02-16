# Reward Backend

Simple Express + MongoDB backend to store registration entries for the Eid rewards app.

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder based on `.env.example`:

```env
MONGODB_URL=your-mongodb-connection-string
MONGODB_DB=reward_app
CORS_ORIGIN=http://localhost:5174
PORT=4000
```

3. Start the backend server:

```bash
npm run dev
# or
npm start
```

The server will listen on `http://localhost:4000` by default.

## API

### `POST /api/registrations`

Create a new registration entry.

**Request body (JSON):**

```json
{
  "name": "Full name",
  "phone": "+8801XXXXXXXXX",
  "email": "optional@example.com",
  "city": "Dhaka",
  "language": "en" // or "bn"
}
```

**Response (201):**

```json
{
  "ok": true,
  "registrationId": "64f0...",
  "createdAt": "2026-02-16T12:34:56.789Z"
}
```

