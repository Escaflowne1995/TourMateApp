# Firestore Security Rules Setup Guide

## Problem
You're encountering the error: `ERROR Error fetching email history from Firebase: [FirebaseError: Missing or insufficient permissions.]`

This error occurs because Firestore's default security rules deny all read/write operations unless explicitly allowed.

## Solution

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `tourismapp-82791`
3. Click **Firestore Database** in the left menu
4. Click the **Rules** tab

### Step 2: Update Firestore Security Rules

Replace your current Firestore rules with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to access their own user data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to manage their email history
    match /recentEmails/{emailId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Optional: Allow read access to public data (attractions, etc.)
    match /attractions/{attractionId} {
      allow read: if true; // Public read access
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Optional: Allow users to manage their favorites
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Optional: Allow users to manage their reviews
    match /reviews/{reviewId} {
      allow read: if true; // Anyone can read reviews
      allow write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### Step 3: Publish the Rules
1. Click **Publish** to save and deploy the new rules
2. Wait for the rules to be deployed (usually takes a few seconds)

## What These Rules Do

1. **User Data Security**: Users can only access their own user documents
2. **Email History**: Users can only read/write their own email history entries
3. **Public Data**: Attractions can be read by anyone but only modified by authenticated users
4. **Personal Data**: Favorites and reviews are user-specific and secured by user ID

## Key Security Features

- **Authentication Required**: Most operations require user authentication
- **User Isolation**: Each user can only access their own data
- **Resource-Level Security**: Rules check both request authentication and resource ownership
- **Create vs Update**: Separate rules for creating new documents vs updating existing ones

## Testing the Fix

After updating the rules:

1. **Clear App Cache**: Close and restart your React Native app
2. **Check Authentication**: Ensure users are logged in before accessing email history
3. **Monitor Console**: Check for any remaining permission errors in the console

## Troubleshooting

If you still get permission errors:

1. **Check Authentication**: Verify `auth.currentUser` is not null
2. **Review Rules**: Ensure the rules match your collection structure
3. **Test Rules**: Use Firebase Console's Rules Simulator to test specific operations
4. **Check Network**: Ensure you have internet connectivity

## Alternative: Development-Only Rules (NOT for Production)

For development/testing only, you can use these permissive rules (NOT SECURE):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ WARNING**: Never use these permissive rules in production as they allow any authenticated user to access all data.

## Next Steps

After setting up the rules:
1. Test email history functionality
2. Verify user data access works properly  
3. Monitor Firebase Console for any rule violations
4. Consider adding more specific rules as your app grows 