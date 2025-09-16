# FedEx Ship Center - Setup Instructions

## Backend Setup

1. **Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**

   - Copy `backend/env.example` to `backend/.env`
   - Update the values in `.env` file:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A long, random secret key
     - `EMAIL_USER` and `EMAIL_PASS`: Your email credentials
     - `ADMIN_EMAIL`: Admin email for notifications

3. **Database Setup**

   - Make sure MongoDB is running
   - The application will create the database and collections automatically

4. **Start the Backend Server**

   ```bash
   cd backend
   node server.js
   ```

   The server will start on http://localhost:3000

5. **Seed Initial Data (Optional)**
   ```bash
   cd backend
   node scripts/seedData.js
   ```

## Frontend Setup

1. **Open the HTML files directly in your browser:**

   - `index.html` - Main landing page
   - `tracking.html` - Shipment tracking page
   - `admin.html` - Admin dashboard

2. **Admin Login:**
   - Default admin credentials (after seeding):
     - Username: `admin`
     - Password: `admin123`

## Features

### Backend Features

- ✅ User authentication (JWT)
- ✅ Shipment management (CRUD)
- ✅ Contact message handling
- ✅ Email notifications
- ✅ Automatic tracking ID generation
- ✅ Customer name and phone fields
- ✅ RESTful API endpoints

### Frontend Features

- ✅ Responsive design
- ✅ Contact form with phone field
- ✅ Shipment tracking
- ✅ Admin dashboard with:
  - Shipment management
  - Message management
  - Statistics
  - Real-time updates

### API Endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

#### Shipments

- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/:trackingId` - Get shipment by tracking ID
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/:trackingId` - Update shipment
- `DELETE /api/shipments/:trackingId` - Delete shipment
- `GET /api/shipments/stats/dashboard` - Get dashboard statistics

#### Contact Messages

- `POST /api/contact/submit` - Submit contact message
- `GET /api/contact/messages` - Get all messages (Admin)
- `GET /api/contact/messages/:messageId` - Get single message
- `PUT /api/contact/messages/:messageId/status` - Update message status
- `POST /api/contact/messages/:messageId/reply` - Reply to message
- `GET /api/contact/stats` - Get contact statistics

## Troubleshooting

1. **CORS Issues**: Make sure the CORS_ORIGIN in .env includes your frontend URL
2. **Database Connection**: Ensure MongoDB is running and accessible
3. **Email Issues**: Check email credentials and enable "Less secure app access" for Gmail
4. **Port Issues**: Make sure port 3000 is available or change PORT in .env

## Development Notes

- The backend automatically generates tracking IDs in format: `SCS-YYYYMMDD-XXX`
- Customer name and phone are required fields for shipments
- Contact form now uses phone instead of company field
- All API calls include proper error handling and validation
- Frontend includes loading states and user feedback
