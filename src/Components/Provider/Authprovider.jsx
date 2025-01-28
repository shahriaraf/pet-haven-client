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


export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const axiosPublic = AxiosPublic();

  // Function to create a new user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with name and photo URL
      const users = await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser(user);
      console.log({user, users});
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message); 
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to sign in a user
  const signInUser = async (email, password) => {
    setLoading(true); 

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user); 

      return user; 
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message); 
      throw error; 
    } finally {
      setLoading(false);
    }
  };


  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth); 
      setUser(null); 
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
      setUser(user);
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message); 
      throw error;
    } finally {
      setLoading(false); 
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
      setUser(user); 
      return user;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      setError(error.message); 
      throw error;
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

    return () => unsubscribe(); 
  }, [axiosPublic]);

  if (loading) {
    return <HomePageSkeleton></HomePageSkeleton>; 
  }

 
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
      {children} 
    </AuthContext.Provider>
  );
};

export default Authprovider;

