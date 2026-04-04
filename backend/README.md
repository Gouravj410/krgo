# Backend API - Lead Collection

## Setup

1. Go to backend folder:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - Copy `.env.example` to `.env`
4. Start server:
   - `npm run dev`

## Email Notifications

- New lead notifications are sent to `krgo427@gmail.com`.
- Configure SMTP in `.env`:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS` (for Gmail use App Password)
  - `SMTP_FROM`

## API Endpoints

- `POST /api/leads`
- `GET /api/leads`
- `GET /health`

## Request Body (POST /api/leads)

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "businessType": "Retail",
  "message": "Need website development support"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Lead saved successfully"
}
```

## Frontend Integration

### Using fetch

```js
await fetch("http://localhost:5000/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    phone: "9876543210",
    businessType: "Retail",
    message: "Need website development support",
  }),
});
```

### Using axios

```js
import axios from "axios";

await axios.post("http://localhost:5000/api/leads", {
  name: "John Doe",
  phone: "9876543210",
  businessType: "Retail",
  message: "Need website development support",
});
```
