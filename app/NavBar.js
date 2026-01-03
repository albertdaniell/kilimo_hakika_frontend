"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ================= LOGO ================= */}
        <Link href="/" className="text-lg font-semibold text-green-700">
          Learning Platform
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </nav>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {open ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}