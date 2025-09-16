# FedEx Ship Center - Backend API Integration Guide

## Overview

This guide explains how the frontend has been integrated with the backend API. All major functionality now uses the backend API with proper fallbacks to local data for demo purposes.

## Backend API Endpoints Used

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/profile` - Get user profile

### Shipments

- `GET /api/shipments` - Get all shipments (Admin only)
- `GET /api/shipments/tracking/:trackingId` - Get shipment by tracking ID (Public)
- `POST /api/shipments` - Create new shipment (Admin only)
- `PUT /api/shipments/:trackingId` - Update shipment (Admin only)
- `DELETE /api/shipments/:trackingId` - Delete shipment (Admin only)
- `GET /api/shipments/stats/dashboard` - Get dashboard statistics (Admin only)

### Contact Messages

- `POST /api/contact/submit` - Submit contact message (Public)
- `GET /api/contact/messages` - Get all messages (Admin only)
- `PUT /api/contact/messages/:messageId/status` - Update message status (Admin only)
- `POST /api/contact/messages/:messageId/reply` - Reply to message (Admin only)

### Health Check

- `GET /api/health` - API health status

## Frontend Integration Details

### 1. API Client (`backend/utils/apiClient.js`)

- Centralized API client with authentication handling
- Automatic token management
- Error handling and response parsing
- Base URL configured for `http://localhost:3000/api`

### 2. Admin Panel (`admin.js`)

**Authentication:**

- Uses backend API for login with JWT token storage
- Fallback to local credentials for demo purposes
- Token verification on page load

**Shipment Management:**

- Loads shipments from backend API
- Creates, updates, and deletes shipments via API
- Real-time dashboard statistics from backend
- Proper error handling with user notifications

**Message Management:**

- Loads contact messages from backend
- Reply to messages via API
- Update message status via API
- Real-time message count updates

### 3. Tracking Page (`tracking.js`)

**Shipment Tracking:**

- Uses backend API to fetch shipment details
- Fallback to local sample data if API fails
- Dynamic timeline generation based on shipment status
- Proper error handling and user feedback

### 4. Contact Form (`Script.js`)

**Form Submission:**

- Submits contact messages to backend API
- Real-time validation and error handling
- Success/error notifications
- API connection testing on page load

## Setup Instructions

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3000`

### 2. Start the Frontend

```bash
# Open index.html in a web browser or use a local server
# For example, using Python:
python -m http.server 8000
# Then visit http://localhost:8000
```

### 3. Test the Integration

#### Admin Panel Testing:

1. Go to `admin.html`
2. Login with credentials: `admin` / `swift2025`
3. Test shipment management features
4. Test message management features

#### Tracking Testing:

1. Go to `tracking.html`
2. Try tracking IDs: `SCS-2025-001`, `SCS-2025-002`, `SCS-2025-003`
3. Test with invalid tracking ID

#### Contact Form Testing:

1. Go to `index.html`
2. Fill out and submit the contact form
3. Check admin panel for new messages

## Error Handling

### API Errors

- All API calls include proper error handling
- User-friendly error messages
- Fallback to local data when API is unavailable
- Loading states during API calls

### Network Errors

- Graceful degradation when backend is offline
- Clear error messages to users
- Retry mechanisms where appropriate

## Features Implemented

### ✅ Completed

- [x] Backend API integration for all major features
- [x] Authentication with JWT tokens
- [x] Shipment CRUD operations
- [x] Contact message handling
- [x] Real-time dashboard statistics
- [x] Error handling and user notifications
- [x] Loading states for all API calls
- [x] Fallback to local data for demo purposes

### 🔄 Fallback Behavior

When the backend API is unavailable:

- Admin login falls back to local credentials
- Shipment data falls back to sample data
- Contact form shows error message
- All features remain functional for demo purposes

## API Client Configuration

The API client is automatically loaded and configured. Key features:

```javascript
// Automatic token management
window.apiClient.setToken(token);
window.apiClient.removeToken();

// API calls with error handling
const response = await window.apiClient.getShipments();
if (response.success) {
  // Handle success
} else {
  // Handle error
}
```

## Troubleshooting

### Common Issues

1. **API Client not loading**

   - Check that `backend/utils/apiClient.js` exists
   - Check browser console for errors
   - Verify file path in script tag

2. **CORS errors**

   - Ensure backend CORS is configured for frontend domain
   - Check backend server is running on port 3000

3. **Authentication issues**

   - Check JWT token in localStorage
   - Verify backend authentication endpoints
   - Clear localStorage and try again

4. **API connection fails**
   - Verify backend server is running
   - Check API health endpoint: `http://localhost:3000/api/health`
   - Check network tab in browser dev tools

### Debug Mode

Enable debug logging by opening browser console. All API calls and errors are logged for debugging.

## Security Notes

- JWT tokens are stored in localStorage
- All API calls include proper authentication headers
- Input validation handled by backend
- CORS configured for security

## Performance Considerations

- API calls are optimized with proper loading states
- Local data fallback ensures functionality offline
- Error handling prevents UI blocking
- Efficient data loading and caching strategies
