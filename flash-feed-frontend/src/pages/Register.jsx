import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewspaperIcon } from "@heroicons/react/24/outline";

import ThemeSwitcher from "../component/UI/ThemeSwitcher";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            setLoading(true);
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-main-bg flex items-center justify-center transition-colors duration-300">
            <div className="absolute top-5 right-5">
                <ThemeSwitcher />
            </div>
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-main-bg rounded-full p-5 shadow">
                        <NewspaperIcon className="h-10 w-10 text-main-text" />
                    </div>
                    <h1 className="font-serif text-4xl mt-5 text-main-text">
                        Flash Feed
                    </h1>
                    <p className="text-muted-text mt-2">
                        AI Powered Personalized News
                    </p>
                    <h2 className="text-2xl font-semibold mt-6 text-main-text">
                        Create Account
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-5">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border bg-main-bg text-main-text px-4 py-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border bg-main-bg text-main-text px-4 py-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border bg-main-bg text-main-text px-4 py-3"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full rounded-xl border bg-main-bg text-main-text px-4 py-3"
                    />
                    <button
                        className="w-full bg-inv-bg text-inv-text rounded-xl py-3 font-semibold hover:opacity-90 transition"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <span className="text-muted-text">
                        Already have an account?
                    </span>
                    <Link
                        to="/login"
                        className="ml-2 text-main-text font-semibold"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Register;