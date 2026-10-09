
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Replace these placeholder values with your Firebase Console config.
const firebaseConfig = {
  apiKey: "AIzaSyC4QZnEtPdYDq9MIhBJHAO0xCc3V386uUw",
  authDomain: "gilly-gaming-website.firebaseapp.com",
  projectId: "gilly-gaming-website",
  storageBucket: "gilly-gaming-website.firebasestorage.app",
  messagingSenderId: "782665790907",
  appId: "1:782665790907:web:6b893e873d5af2aa56009e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const byId = id => document.getElementById(id);

const panel = byId("userPanel");
const usernameInput = byId("usernameInput");
const emailInput = byId("emailInput");
const passwordInput = byId("passwordInput");
const message = byId("userMessage");
const forms = byId("authForms");
const signedInPanel = byId("signedInPanel");
const signedInUsername = byId("signedInUsername");
const addUserBtn = byId("addUserBtn");

function showMessage(text) {
  message.textContent = text;
}

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Please log in.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Use a stronger password with at least 6 characters.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your internet connection."
  };

  return messages[error.code] || "Authentication failed. Please try again.";
}

byId("signupBtn").addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!username || username.length > 24) {
    showMessage("Enter a username between 1 and 24 characters.");
    return;
  }

  if (!email || !password) {
    showMessage("Enter your email and password.");
    return;
  }

  try {
    showMessage("Creating your account...");

    const result = await createUserWithEmailAndPassword(
      auth, email, password
    );

    await updateProfile(result.user, {
      displayName: username
    });

    showMessage("Account created successfully!");
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

byId("loginBtn").addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage("Enter your email and password.");
    return;
  }

  try {
    showMessage("Logging in...");

    await signInWithEmailAndPassword(auth, email, password);

    showMessage("Login successful!");
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

byId("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    showMessage("You have logged out.");
  } catch {
    showMessage("Could not log out. Please try again.");
  }
});

onAuthStateChanged(auth, user => {
  if (user) {
    forms.hidden = true;
    signedInPanel.hidden = false;
    signedInUsername.textContent = user.displayName || "Gamer";
    usernameInput.value = user.displayName || "";
    addUserBtn.textContent = "Account";
  } else {
    forms.hidden = false;
    signedInPanel.hidden = true;
    addUserBtn.textContent = "Account";
  }
});

console.log("Firebase authentication initialized.");

