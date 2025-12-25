export default function ForgotPassword() {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">
        Forgot Your Password?
      </h1>
      <p className="text-gray-500 mt-2">
        Enter your email address below and we’ll send you instructions to reset your password.
      </p>

      {/* Form */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Send Reset Link
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <a
          href="/auth/login"
          className="text-green-600 font-medium hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
}