import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/Authprovider";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    setError("");
    setSuccessMessage("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUser(email, password, name, photo)
      .then(() => {
        setSuccessMessage("Registration successful! Please log in.");
        navigate("/");
        e.target.reset();
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        setError("Error creating account. Please try again.");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-36 pb-20">
      <div className="w-full max-w-md p-8 bg-[#6d165D] text-white rounded-lg shadow-2xl shadow-gray-500">
        <div className="flex items-center justify-center">
          <img
            src="https://i.ibb.co/nLwLNqp/pethavenproject-logo-202-500x500-1.png"
            className="h-24"
            alt="petHaven Logo"
          />
        </div>
        <p className="mt-2 text-center">Join Pet<span className="text-[#ECA511] font-semibold">H</span>aven and make a difference!</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
              required
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium">
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter Photo URL"
              className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ECA511] text-[#531044] hover:bg-[#531044] hover:text-[#ECA511] transition-colors py-3 rounded-lg font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link
              className="text-[#ECA511] hover:underline font-semibold"
              to="/login"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-300 text-[#6d165D] transition-colors py-3 rounded-lg font-semibold shadow-md"
          >
            Sign in with Google <i className="fa-brands fa-google"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
