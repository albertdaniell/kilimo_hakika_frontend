export default function Login() {
  return (
    <div className="w-full max-w-md">
      {/* Right Login Form */}
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to KilimoHakika
      </h1>
      <p className="text-gray-500 mt-2">
        Access your farm management dashboard and ensure accurate agricultural data.
      </p>

      <form className="mt-8 space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-sm">
          <a
            href="#"
            className="text-green-600 hover:underline font-medium"
          >
            Forgot password?
          </a>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-green-500" />
            <span className="text-gray-600">Remember me</span>
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Log in
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="#"
          className="text-green-600 font-medium hover:underline"
        >
          Create one
        </a>
      </p>
    </div>
  );
}