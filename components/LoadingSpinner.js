import React from "react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 w-full">
      {/* Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

      {/* Message */}
      <p className="mt-4 text-sm font-medium text-gray-600">
        {message}
      </p>
    </div>
  );
}