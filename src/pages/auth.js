// pages/auth.js
import { useState, useEffect } from "react";
import {
  auth,
  provider,
} from "../lib/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

    
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/"); // Redirect logged-in users to homepage
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
}, [router]);
    
  // Handle Google login/signup
  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      // User is logged in with Google, no need for additional steps
      router.push("/"); // Redirect to homepage after login
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Email login/signup
  const handleEmailAuth = async () => {
    try {
      // First, attempt to log in the user
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to homepage after login
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found") {
        // If user does not exist, automatically sign them up
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push("/"); // Redirect to homepage after signup
        } catch (signupError) {
          setError(signupError.message);
        }
      } else {
        setError(loginError.message);
      }
    }
  };

    
  return (
    <div className="auth-container">
      <h1>Login or Sign Up</h1>

      {/* Email & Password Form */}
      <div className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button onClick={handleEmailAuth} className="auth-button">
          Login / Sign Up with Email
        </button>
      </div>

      {/* Google Auth Button */}
      <button onClick={handleGoogleAuth} className="auth-button google-auth">
        Continue with Google
      </button>

      {/* Error Message Display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
