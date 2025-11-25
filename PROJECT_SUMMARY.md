# Ohrid Loyalty - Project Summary

## Overview

A complete mobile-only digital loyalty stamp card application for small businesses in Ohrid, Macedonia. The app supports both Android and iOS from a single codebase.

## Architecture

### Frontend (Mobile App)
- **Framework**: Ionic Angular with Capacitor
- **Location**: `mobile-app/`
- **Platforms**: Android (primary), iOS (optional)
- **Key Features**:
  - Owner mode: Business management, QR scanning, customer management
  - Customer mode: Loyalty card display, QR code generation, reward tracking
  - Dynamic theming system
  - QR code scanning and generation

### Backend (To be implemented)
- **Framework**: .NET 8 API
- **Database**: Neon Postgres (free tier)
- **Hosting**: Fly.io or Railway (€0-5/month)

## Project Structure

```
ohrid-flow/
├── mobile-app/              # Ionic Angular mobile application
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/       # Authentication pages
│   │   │   ├── owner/      # Owner mode pages
│   │   │   ├── customer/   # Customer mode pages
│   │   │   ├── services/   # Core services
│   │   │   └── shared/     # Shared models
│   │   ├── assets/         # Static assets
│   │   └── environments/   # Environment config
│   ├── capacitor.config.ts # Capacitor configuration
│   ├── package.json        # Dependencies
│   └── README.md           # Mobile app documentation
└── README.md               # Main project README
```

## Key Components

### Authentication
- **Owner**: Email/password login
- **Customer**: Phone number + OTP (Firebase Auth)

### Owner Features
1. **Dashboard**: Overview of business and quick actions
2. **QR Scanner**: Scan customer QR codes to add stamps
3. **Customer Management**: View all customers and their details
4. **Settings**: Customize theme, reward threshold, reward name

### Customer Features
1. **Home**: Quick access to loyalty card and QR code
2. **Loyalty Card**: Visual progress display with stamp circles
3. **QR Display**: Generate and display QR code for scanning

### Services
- **ApiService**: HTTP client with authentication
- **AuthService**: Authentication and session management
- **ThemeService**: Dynamic theme application
- **CustomerService**: Customer data management
- **LoyaltyService**: Stamp and reward operations

## Technology Stack

### Frontend
- Ionic 8
- Angular 20
- Capacitor 7
- ZXing (QR scanning)
- qrcode (QR generation)
- Firebase Auth (customer login)
- RxJS (reactive programming)

### Styling
- SCSS
- CSS Variables for theming
- Ionic components

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Quick Start

1. **Navigate to mobile app:**
```bash
cd mobile-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
   - Update `src/environments/environment.ts` with your API URL
   - Add Firebase configuration

4. **Run in browser:**
```bash
npm start
```

5. **Build for mobile:**
```bash
npm run build
npm run cap:add:android  # or cap:add:ios
npm run cap:sync
npm run cap:open:android  # or cap:open:ios
```

## API Endpoints Required

The mobile app expects these backend endpoints:

### Authentication
- `POST /api/auth/owner/login` - Owner login
- `GET /api/auth/user/{id}` - Get user details

### Public
- `GET /api/public/customer/{qrSecret}` - Get customer by QR

### Customer Management
- `GET /api/customer` - Get all customers (owner)
- `GET /api/customer/{id}` - Get customer details
- `POST /api/customer` - Create customer
- `GET /api/customer/{id}/history` - Get customer history

### Loyalty Operations
- `POST /api/loyalty/qr/{qrSecret}/stamp` - Add stamp via QR
- `POST /api/loyalty/customer/{id}/stamp` - Add stamp by ID
- `POST /api/loyalty/reward/{id}/redeem` - Redeem reward
- `GET /api/loyalty/customer/{id}/rewards` - Get customer rewards

### User Settings
- `PUT /api/auth/user/{id}` - Update user settings

## Theme System

Themes are stored as JSON in the backend and include:
- `primaryColor`: Main brand color
- `backgroundColor`: Background color
- `logoUrl`: Optional logo URL
- `welcomeText`: Welcome message
- `rewardThreshold`: Stamps needed for reward
- `rewardName`: Name of the reward

Themes are applied via CSS variables and updated dynamically.

## QR Code Format

Customer QR codes use deep link format:
```
ohridloyalty://card/{qrSecret}
```

Where `qrSecret` is a unique identifier for each customer.

## Development Status

### ✅ Completed
- [x] Project structure setup
- [x] Authentication pages (owner & customer)
- [x] Owner dashboard and navigation
- [x] QR scanner implementation
- [x] Customer management pages
- [x] Customer loyalty card display
- [x] QR code generation
- [x] Theme system
- [x] Services and API integration
- [x] Routing configuration
- [x] Capacitor configuration

### 🔄 Pending
- [ ] Backend API implementation
- [ ] Firebase Auth integration (customer OTP)
- [ ] Testing on physical devices
- [ ] App store deployment
- [ ] Error handling improvements
- [ ] Loading states optimization

## Next Steps

1. **Backend Development**
   - Implement .NET 8 API
   - Set up Neon Postgres database
   - Create all required endpoints
   - Implement authentication

2. **Firebase Setup**
   - Configure Firebase project
   - Set up phone authentication
   - Integrate Firebase SDK

3. **Testing**
   - Test on Android devices
   - Test on iOS devices
   - Test QR scanning functionality
   - Test theme system

4. **Deployment**
   - Build production APK/AAB
   - Submit to Google Play Store
   - Build iOS app
   - Submit to App Store (optional)

## Notes

- The app is designed to be lightweight and simple
- No web dashboard - mobile-only
- Single codebase for Android and iOS
- Free tier hosting target (€0-5/month)
- Focus on core functionality, no advanced features

## Support

For setup issues, see:
- `mobile-app/README.md` - Mobile app documentation
- `mobile-app/SETUP.md` - Detailed setup guide

