"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "../../app-redux/features/AppData/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, data } = useSelector(
    (state) => state.authData.loginState
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        dataPassed: {
          email,
          password,
        },
      })
    );
  };

  // ✅ Redirect after successful login
  // ✅ Redirect after successful login based on role
useEffect(() => {
  if (data?.access && data?.user?.role) {
    if (data.user.role === "TRAINEE") {
      router.push("/home");
    } else if (data.user.role === "ADMIN") {
      router.push("/admin");
    }
  }
}, [data, router]);

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to KilimoHakika
      </h1>
      <p className="text-gray-500 mt-2">
        Access your farm management dashboard and ensure accurate agricultural data.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-sm">
          <a
            href="/auth/forgot-password"
            className="text-green-600 hover:underline font-medium"
          >
            Forgot password?
          </a>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="#" className="text-green-600 font-medium hover:underline">
          Create one
        </a>
      </p>
    </div>
  );
}