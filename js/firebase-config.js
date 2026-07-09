const firebaseConfig = {
  apiKey: "AIzaSyB5m_paIIyOsvogUGHilwr9McgbOEpeueE",
  authDomain: "afmo-858b5.firebaseapp.com",
  projectId: "afmo-858b5",
  storageBucket: "afmo-858b5.firebasestorage.app",
  messagingSenderId: "607442348914",
  appId: "1:607442348914:web:01d72e2c26c18b3bdacbeb",
  measurementId: "G-2PTT7SLQK5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
