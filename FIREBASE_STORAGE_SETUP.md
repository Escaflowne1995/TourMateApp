# Firebase Storage Setup Guide

## Step 1: Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Storage** in the left menu
4. Click **Get Started**
5. Click **Done**

## Step 2: Set Storage Rules

Replace your storage rules with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload profile pictures
    match /profile_pictures/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow anyone to read profile pictures (optional)
    match /profile_pictures/{allPaths=**} {
      allow read;
    }
  }
}
```

## Step 3: Update Your Firebase Config

Make sure your `firebaseConfig.js` includes storage:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // ← Add this

const firebaseConfig = {
  // your config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ← Add this
```

## ✅ Then you can use the original ProfilePictureUpload component! 