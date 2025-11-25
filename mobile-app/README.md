# Ohrid Loyalty - Mobile App

A mobile-only digital loyalty stamp card app for small businesses in Ohrid, built with Ionic Angular and Capacitor.

## Features

### Owner Mode
- Login with email and password
- View and customize business theme (colors, logo, welcome text)
- Scan customer QR codes to add stamps
- View customer list and details
- Manage loyalty program settings (threshold, reward name)
- Redeem customer rewards

### Customer Mode
- Login via phone number with OTP (Firebase Auth)
- View loyalty card with progress visualization
- Display QR code for scanning
- View earned rewards

## Tech Stack

- **Framework**: Ionic Angular
- **Native**: Capacitor
- **QR Code**: ZXing (scanning), qrcode (generation)
- **Authentication**: Firebase Auth (for customers), Custom JWT (for owners)
- **State Management**: Services with RxJS
- **Styling**: SCSS with CSS variables for theming

## Prerequisites

- Node.js 18+ and npm
- Angular CLI
- Ionic CLI (`npm install -g @ionic/cli`)
- Capacitor CLI (`npm install -g @capacitor/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Update `src/environments/environment.ts` with your API URL
   - Add Firebase configuration for customer authentication

3. Build the web app:
```bash
ionic build
```

## Development

Run the app in the browser:
```bash
ionic serve
```

## Building for Mobile

### Android

1. Add Android platform:
```bash
npx cap add android
npx cap sync
```

2. Open in Android Studio:
```bash
npx cap open android
```

3. Build and run from Android Studio

### iOS

1. Add iOS platform:
```bash
npx cap add ios
npx cap sync
```

2. Open in Xcode:
```bash
npx cap open ios
```

3. Build and run from Xcode

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication pages
│   │   ├── role-select/
│   │   ├── login-owner/
│   │   └── login-customer/
│   ├── owner/              # Owner mode pages
│   │   ├── home/
│   │   ├── qr-scanner/
│   │   ├── customers/
│   │   ├── customer-detail/
│   │   └── settings/
│   ├── customer/           # Customer mode pages
│   │   ├── home/
│   │   ├── loyalty-card/
│   │   └── qr-display/
│   ├── services/           # Core services
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   ├── theme.service.ts
│   │   ├── customer.service.ts
│   │   └── loyalty.service.ts
│   └── shared/
│       └── models/         # TypeScript interfaces
├── assets/                 # Static assets
├── environments/          # Environment configuration
└── theme/                  # Global styles
```

## Theme System

The app supports dynamic theming through CSS variables. Each business owner can customize:
- Primary color
- Background color
- Logo URL
- Welcome text
- Reward threshold
- Reward name

Themes are stored as JSON in the backend and applied via `ThemeService`.

## QR Code Format

Customer QR codes use the format:
```
ohridloyalty://card/{qrSecret}
```

Where `qrSecret` is a unique identifier for each customer.

## API Integration

The app expects a .NET 8 backend API with the following endpoints:

- `POST /api/auth/owner/login` - Owner login
- `GET /api/public/customer/{qrSecret}` - Get customer by QR
- `POST /api/loyalty/qr/{qrSecret}/stamp` - Add stamp via QR
- `GET /api/customer` - Get all customers (owner)
- `GET /api/customer/{id}` - Get customer details
- `POST /api/loyalty/customer/{id}/stamp` - Add stamp by customer ID
- `POST /api/loyalty/reward/{id}/redeem` - Redeem reward
- `GET /api/loyalty/customer/{id}/rewards` - Get customer rewards
- `GET /api/customer/{id}/history` - Get customer history

## Environment Configuration

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url.com/api',
  firebaseConfig: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-sender-id',
    appId: 'your-app-id'
  }
};
```

## Building for Production

### Android APK/AAB

1. Build the web app:
```bash
ionic build --prod
```

2. Sync Capacitor:
```bash
npx cap sync android
```

3. Open in Android Studio and build signed APK/AAB

### iOS App

1. Build the web app:
```bash
ionic build --prod
```

2. Sync Capacitor:
```bash
npx cap sync ios
```

3. Open in Xcode and archive for App Store/TestFlight

## Permissions

### Android

Required permissions in `android/app/src/main/AndroidManifest.xml`:
- `CAMERA` - For QR code scanning
- `INTERNET` - For API calls

### iOS

Required permissions in `ios/App/App/Info.plist`:
- `NSCameraUsageDescription` - For QR code scanning

## Troubleshooting

### QR Scanner not working
- Ensure camera permissions are granted
- Check that ZXing scanner module is properly imported
- Verify Capacitor plugins are synced

### Theme not applying
- Check browser console for JSON parsing errors
- Verify theme JSON structure matches Theme interface
- Ensure CSS variables are properly set

### API calls failing
- Verify API URL in environment files
- Check CORS settings on backend
- Ensure authentication token is being sent

## License

MIT

