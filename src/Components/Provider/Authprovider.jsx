import React, { createContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import AxiosPublic from "../Hooks/axiosPublic";
import HomePageSkeleton from "../Skeleton/HomePageSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Context to provide user state and auth functions
export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for handling authentication errors
  const axiosPublic = AxiosPublic();

  // Function to create a new user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with name and photo URL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser(user); // Update the user state with the newly created user
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to sign in a user
  const signInUser = async (email, password) => {
    setLoading(true); // Start loading state

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user); // Update the user state after successful sign-in

      return user; // Return user object after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message); // Update error state for display
      throw error; // Re-throw error for further handling if needed
    } finally {
      setLoading(false); // Stop loading state
    }
  };


  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Google Authentication Provider
  const googleProvider = new GoogleAuthProvider();

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user); // Update user state with Google login details
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // GitHub Authentication Provider
  const githubProvider = new GithubAuthProvider();

  // Function to sign in with GitHub
  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      setUser(user); // Update user state with GitHub login details
      return user;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };


  // Firebase Auth state listener to maintain session persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when the auth state changes
      setLoading(false);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
            }
          })
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [axiosPublic]);

  if (loading) {
    return <HomePageSkeleton></HomePageSkeleton>; // Display a loading indicator while checking auth state
  }

  // Context value to expose user state and auth functions
  const userInfo = {
    user,
    loading,
    error,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    signInWithGitHub
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children} {/* Render children with access to the auth context */}
    </AuthContext.Provider>
  );
};

export default Authprovider;

