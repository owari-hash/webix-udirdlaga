# Backend Integration Guide

This document outlines how the Next.js frontend authentication system has been integrated with your MongoDB/Express backend.

## 🔄 Integration Overview

The frontend has been updated to work seamlessly with your backend API structure, including:

- **MongoDB User Schema** integration
- **Express API endpoints** compatibility
- **JWT token management** with your backend
- **Role-based access control** matching your schema
- **Session management** with your backend

## 📊 Backend Schema Mapping

### User Schema Integration

| Backend Field      | Frontend Type | Description                  |
| ------------------ | ------------- | ---------------------------- |
| `_id`              | `string`      | MongoDB ObjectId as string   |
| `email`            | `string`      | User email (unique, indexed) |
| `displayName`      | `string`      | User display name (required) |
| `photoURL`         | `string?`     | Optional profile photo URL   |
| `role`             | `Role`        | User role from your enum     |
| `isActive`         | `boolean`     | Account status               |
| `twoFactorEnabled` | `boolean`     | 2FA status                   |
| `lastLoginAt`      | `string?`     | Last login timestamp         |
| `createdAt`        | `string`      | Account creation date        |
| `updatedAt`        | `string`      | Last update date             |

### Role System

Your backend roles are now fully integrated:

```typescript
type Role = 'super_admin' | 'org_admin' | 'org_moderator' | 'org_user' | 'viewer';
```

**Role Hierarchy:**

- `super_admin` (Level 5) - Full system access
- `org_admin` (Level 4) - Organization administration
- `org_moderator` (Level 3) - Organization moderation
- `org_user` (Level 2) - Organization user
- `viewer` (Level 1) - Read-only access

## 🔌 API Integration

### Backend Endpoints Used

| Endpoint                    | Method | Purpose               | Frontend Usage             |
| --------------------------- | ------ | --------------------- | -------------------------- |
| `/api/auth/login`           | POST   | User login            | `authApi.login()`          |
| `/api/auth/register`        | POST   | User registration     | `authApi.register()`       |
| `/api/auth/refresh`         | POST   | Token refresh         | `authApi.refreshToken()`   |
| `/api/auth/logout`          | POST   | Single session logout | `authApi.logout()`         |
| `/api/auth/logout-all`      | POST   | All sessions logout   | `authApi.logoutAll()`      |
| `/api/auth/profile`         | GET    | Get user profile      | `authApi.getProfile()`     |
| `/api/auth/verify`          | GET    | Verify token          | `authApi.verifyToken()`    |
| `/api/auth/change-password` | POST   | Change password       | `authApi.changePassword()` |

### Request/Response Format

#### Login Request

```typescript
// Frontend sends
{
  email: "user@example.com",
  password: "password123"
}

// Backend responds
{
  success: true,
  message: "Login successful",
  data: {
    user: {
      _id: "64f8b2c1a1b2c3d4e5f6g7h8",
      email: "user@example.com",
      displayName: "John Doe",
      role: "org_user",
      isActive: true,
      // ... other user fields
    },
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file in your Next.js project:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: JWT secrets for frontend fallback
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
```

### API Configuration

The frontend uses a centralized configuration system:

```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      // ... other endpoints
    },
  },
};
```

## 🔐 Authentication Flow

### 1. Login Process

```typescript
// User submits login form
const result = await login({
  email: 'user@example.com',
  password: 'password123',
});

// Frontend handles:
// 1. API call to /api/auth/login
// 2. Receives user data + tokens
// 3. Stores in localStorage
// 4. Updates auth context
// 5. Redirects to dashboard
```

### 2. Token Management

```typescript
// Automatic token refresh
// - Monitors token expiration
// - Refreshes 1 minute before expiry
// - Updates stored tokens
// - Maintains seamless user experience
```

### 3. Session Management

```typescript
// Backend session tracking
// - Each login creates a session record
// - Sessions tracked by IP and User-Agent
// - Logout removes session from database
// - Multiple sessions supported per user
```

## 🎯 Role-Based Access Control

### Frontend Components

```typescript
// Super Admin only
<SuperAdminGuard fallback={<AccessDenied />}>
  <AdminPanel />
</SuperAdminGuard>

// Organization Admin and above
<OrgAdminGuard fallback={<AccessDenied />}>
  <OrgSettings />
</OrgAdminGuard>

// Moderator and above
<ModeratorGuard fallback={<AccessDenied />}>
  <ModerationTools />
</ModeratorGuard>

// Any authenticated user
<UserGuard fallback={<LoginPrompt />}>
  <UserDashboard />
</UserGuard>
```

### Permission Checking

```typescript
// In components
const { user, hasRole, hasAnyRole } = useAuth();

// Check specific role
if (hasRole('super_admin')) {
  // Show super admin features
}

// Check multiple roles
if (hasAnyRole(['org_admin', 'org_moderator'])) {
  // Show admin/moderator features
}
```

## 🔄 Data Synchronization

### User Data Updates

```typescript
// Update user profile
const { updateUser } = useAuth();

await updateUser({
  displayName: 'New Name',
  photoURL: 'https://example.com/photo.jpg',
});

// Frontend automatically:
// 1. Updates local state
// 2. Updates localStorage
// 3. Syncs with backend on next API call
```

### Real-time Updates

Your backend supports Socket.IO for real-time updates:

```typescript
// Frontend can connect to backend Socket.IO
// for real-time notifications, messages, etc.
```

## 🚀 Getting Started

### 1. Start Backend Server

```bash
cd your-backend-directory
npm install
npm run dev
# Server runs on http://localhost:3000
```

### 2. Start Frontend

```bash
cd your-frontend-directory
npm install
npm run dev
# Frontend runs on http://localhost:8003
```

### 3. Test Authentication

1. Visit `http://localhost:8003`
2. Click "Login" or "Register"
3. Use test credentials:
   - Email: `admin@webix.mn`
   - Password: `admin123`

## 🧪 Testing

### Backend API Testing

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@webix.mn","password":"admin123"}'

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123","displayName":"New User"}'
```

### Frontend Testing

```typescript
// Test auth context
const { isAuthenticated, user, login } = useAuth();

// Test API client
const response = await authApi.getProfile();
console.log(response.data);
```

## 🔧 Customization

### Adding New Roles

1. **Backend**: Add to User schema enum
2. **Frontend**: Update `Role` type in `auth-context.tsx`
3. **Frontend**: Add to `ROLE_HIERARCHY` in `api.ts`
4. **Frontend**: Create new guard components

### Adding New API Endpoints

1. **Backend**: Create new route handler
2. **Frontend**: Add to `API_CONFIG.ENDPOINTS`
3. **Frontend**: Create API method in `api-client.ts`

### Custom Validation

```typescript
// Add custom validation rules
const validateUserInput = (input: any) => {
  // Your validation logic
  return { isValid: boolean, errors: string[] };
};
```

## 📱 Features Available

### ✅ Implemented

- User registration and login
- JWT token management
- Role-based access control
- Session management
- Password change
- Profile management
- Automatic token refresh
- Error handling
- Loading states

### 🚧 Ready for Implementation

- Two-factor authentication
- Organization management
- Webtoon management
- Analytics dashboard
- Payment processing
- Notifications
- Real-time messaging

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend CORS is configured for frontend URL
   - Check `CLIENT_URL` environment variable

2. **Token Issues**

   - Verify JWT secrets match between frontend/backend
   - Check token expiration times

3. **API Connection**

   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Ensure backend server is running

4. **Role Access**
   - Check user role in database
   - Verify role hierarchy configuration

### Debug Mode

```typescript
// Enable debug logging
localStorage.setItem('debug', 'auth:*');

// Check stored auth data
console.log(JSON.parse(localStorage.getItem('auth') || '{}'));
```

## 📈 Performance

### Optimizations Implemented

- Token caching in localStorage
- Automatic token refresh
- Efficient API client
- Minimal re-renders with React context
- Lazy loading of auth components

### Monitoring

- API request/response logging
- Error tracking
- Performance metrics
- User activity logging

This integration provides a robust, scalable authentication system that works seamlessly with your MongoDB/Express backend while maintaining excellent user experience and security.
