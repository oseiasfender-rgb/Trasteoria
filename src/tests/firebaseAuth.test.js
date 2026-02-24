import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

describe('Firebase Authentication', () => {
  let auth;

  beforeAll(() => {
    const firebaseConfig = {
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VITE_FIREBASE_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  });

  it('should sign in with email and password', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    expect(userCredential.user).toBeDefined();
  });
});
