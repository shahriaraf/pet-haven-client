import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./Provider/Authprovider";
import AxiosPublic from "./Hooks/axiosPublic";

const Login = () => {
    const { signInUser, error, signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = AxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInUser(email, password);
            navigate("/");
        } catch (err) {
            console.error("Login error", err);
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate("/");
            })

        })
    };
    const handleGithubSignIn = () => {
        signInWithGitHub()
        .then(result => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate("/");
            })

        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-36 pb-20">
            <div className="w-full max-w-[340px] md:max-w-md p-8 bg-[#6d165D] text-white rounded-lg shadow-2xl shadow-gray-500">
                <div className="flex items-center justify-center">
                    <img
                        src="https://i.ibb.co.com/nLwLNqp/pethavenproject-logo-202-500x500-1.png"
                        className="h-24"
                        alt="Flowbite Logo"
                    />
                </div>
                <p className="mt-2 text-center">
                    Sign in to explore Pet<span className="text-[#ECA511] font-semibold">H</span>aven!
                </p>

                {/* Error message */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 p-3 text-[#6d165D] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6d165D]"
                        />
                        {errors.password && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#ECA511] text-[#531044] hover:bg-[#531044] hover:text-[#ECA511] transition-colors py-3 rounded-lg font-semibold shadow-md"
                    >
                        Log In
                    </button>
                </form>

                {/* Sign-up Link */}
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link
                            className="text-[#ECA511] hover:underline font-semibold"
                            to="/register"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Google Sign-In Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white hover:bg-gray-300 text-[#6d165D] transition-colors py-3 rounded-lg font-semibold shadow-md"
                    >
                        Sign in with Google <i className="fa-brands fa-google"></i>
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={handleGithubSignIn}
                        className="w-full bg-white hover:bg-gray-300 text-[#6d165D] transition-colors py-3 rounded-lg font-semibold shadow-md"
                    >
                        Sign in with Github <i className="fa-brands fa-github"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
