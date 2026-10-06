import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewspaperIcon } from "@heroicons/react/24/outline";

import ThemeSwitcher from "../component/UI/ThemeSwitcher";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(formData);
      login(res.data.token, res.data.user);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-bg text-main-text transition-colors duration-300">
      {/* Header */}
      <div className="absolute top-5 right-5">
        <ThemeSwitcher />
      </div>
      {/* Login Card */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-card shadow-xl rounded-2xl w-full max-w-md p-8 transition-colors duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-main-bg rounded-full p-5 shadow-lg">
              <NewspaperIcon className="h-10 w-10 text-main-text" />
            </div>

            <h1 className="font-serif text-4xl mt-5 text-main-text">
              Flash Feed
            </h1>

            <p className="text-muted-text mt-2 text-center">
              AI Powered Personalized News Platform
            </p>

            <h2 className="text-2xl font-semibold mt-6 text-main-text">
              Welcome Back
            </h2>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-100 text-red-600 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-main-text">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-main-bg text-main-text px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-main-text">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-main-bg text-main-text px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-inv-bg text-inv-text py-3 font-semibold hover:opacity-90 transition cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-8">
            <span className="text-muted-text">Don't have an account?</span>

            <Link
              to="/register"
              className="ml-2 text-main-text font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
