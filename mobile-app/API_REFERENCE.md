# API Reference

This document outlines all API endpoints that the mobile app expects from the backend.

## Base URL

All endpoints are prefixed with `/api` (configurable in `environment.ts`)

## Authentication

### Owner Login
```
POST /api/auth/owner/login
Body: {
  email: string
  password: string
}
Response: {
  token: string
  user: {
    id: string
    email: string
    businessName: string
    themeJson: string
    rewardThreshold: number
    rewardName: string
    createdAt: string
  }
}
```

### Get User Details
```
GET /api/auth/user/{userId}
Headers: Authorization: Bearer {token}
Response: {
  id: string
  email: string
  businessName: string
  themeJson: string
  rewardThreshold: number
  rewardName: string
  createdAt: string
}
```

### Update User Settings
```
PUT /api/auth/user/{userId}
Headers: Authorization: Bearer {token}
Body: {
  businessName: string
  themeJson: string
  rewardThreshold: number
  rewardName: string
}
Response: User object
```

## Public Endpoints

### Get Customer by QR Secret
```
GET /api/public/customer/{qrSecret}
Response: {
  name: string
  stamps: number
  totalRewards: number
}
Note: This endpoint should also return customer ID for internal use,
or backend should support adding stamps by qrSecret
```

## Customer Management

### Get All Customers (Owner)
```
GET /api/customer
Headers: Authorization: Bearer {token}
Response: Customer[]
```

### Get Customer by ID
```
GET /api/customer/{customerId}
Headers: Authorization: Bearer {token}
Response: {
  id: string
  userId: string
  name: string
  phone: string
  stamps: number
  totalRewards: number
  qrSecret: string
  createdAt: string
}
```

### Create Customer
```
POST /api/customer
Headers: Authorization: Bearer {token}
Body: {
  name: string
  phone: string
}
Response: Customer object
```

### Get Customer History
```
GET /api/customer/{customerId}/history
Headers: Authorization: Bearer {token}
Response: [
  {
    id: string
    type: "stamp" | "reward_redeemed"
    timestamp: string
  }
]
```

## Loyalty Operations

### Add Stamp by QR Secret
```
POST /api/loyalty/qr/{qrSecret}/stamp
Headers: Authorization: Bearer {token}
Body: {}
Response: {
  stamps: number
  rewardCreated?: {
    id: string
    customerId: string
    userId: string
    rewardName: string
    status: "pending" | "redeemed"
    createdAt: string
    redeemedAt?: string
  }
}
```

### Add Stamp by Customer ID
```
POST /api/loyalty/customer/{customerId}/stamp
Headers: Authorization: Bearer {token}
Body: {}
Response: {
  stamps: number
  rewardCreated?: Reward
}
```

### Get Customer Rewards
```
GET /api/loyalty/customer/{customerId}/rewards
Headers: Authorization: Bearer {token}
Response: Reward[]
```

### Redeem Reward
```
POST /api/loyalty/reward/{rewardId}/redeem
Headers: Authorization: Bearer {token}
Body: {}
Response: {
  id: string
  customerId: string
  userId: string
  rewardName: string
  status: "redeemed"
  createdAt: string
  redeemedAt: string
}
```

## Data Models

### User
```typescript
{
  id: string (UUID)
  email: string
  passwordHash: string (backend only)
  businessName: string
  themeJson: string (JSON string)
  rewardThreshold: number
  rewardName: string
  createdAt: string (ISO 8601)
}
```

### Customer
```typescript
{
  id: string (UUID)
  userId: string (UUID, FK to User)
  name: string
  phone: string
  stamps: number
  totalRewards: number
  qrSecret: string (unique random string)
  createdAt: string (ISO 8601)
}
```

### Reward
```typescript
{
  id: string (UUID)
  customerId: string (UUID, FK to Customer)
  userId: string (UUID, FK to User)
  rewardName: string
  status: "pending" | "redeemed"
  createdAt: string (ISO 8601)
  redeemedAt?: string (ISO 8601, null if pending)
}
```

### StampEvent
```typescript
{
  id: string (UUID)
  customerId: string (UUID, FK to Customer)
  userId: string (UUID, FK to User)
  type: "stamp" | "reward_redeemed"
  timestamp: string (ISO 8601)
}
```

### Theme JSON Structure
```json
{
  "primaryColor": "#2e2e2e",
  "backgroundColor": "#ffffff",
  "logoUrl": "https://example.com/logo.png",
  "iconSet": "default",
  "welcomeText": "Welcome to our loyalty program!",
  "rewardThreshold": 10,
  "rewardName": "Free Coffee"
}
```

## Error Responses

All endpoints should return standard HTTP status codes:
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## Authentication

- Owner endpoints require `Authorization: Bearer {token}` header
- Token is obtained from `/api/auth/owner/login`
- Token should be validated on every authenticated request
- Token expiration should return `401 Unauthorized`

## CORS

Backend must allow CORS from:
- `http://localhost:8100` (development)
- `capacitor://localhost` (Capacitor)
- `ionic://localhost` (Capacitor)
- Your production domain

## Notes

1. All timestamps should be in ISO 8601 format (UTC)
2. UUIDs should be standard UUID v4 format
3. QR secrets should be unique random strings (minimum 32 characters recommended)
4. When stamps reach threshold, automatically create a reward and reset stamps
5. Customer profile endpoint (`/public/customer/{qrSecret}`) should be fast and not require authentication

