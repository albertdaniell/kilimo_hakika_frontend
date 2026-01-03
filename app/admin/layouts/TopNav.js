"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../app-redux/features/AppData/authSlice";

export default function TopNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  let dispatch = useDispatch()

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

 const handleLogout = () => {
  dispatch(logout());

  // ✅ Capture current page before logout
  const nextPage = window.location.pathname;

  // ✅ Clear local storage
  localStorage.clear();

  // ✅ Close dropdown
  setIsDropdownOpen(false);

  // ✅ Redirect to login with nextPage
  router.push(
    `/auth/login?nextPage=${encodeURIComponent(nextPage)}`
  );
};
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-b-slate-200 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          <Link href="/">KilimoHakika</Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/products" className="hover:text-green-600">Products</Link>
          <Link href="/solutions" className="hover:text-green-600">Solutions</Link>
          <Link href="/resources" className="hover:text-green-600">Resources</Link>
          <Link href="/plans" className="hover:text-green-600">Plans & Pricing</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative">
          <Link href="/schedule" className="text-sm font-medium text-green-600">
            Schedule
          </Link>
          <Link href="/join" className="text-sm font-medium text-green-600">
            Join
          </Link>

          {/* Account Icon Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
            >
              <span className="text-sm font-bold text-white">A</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 font-semibold">
                  Daniel Albert
                </p>

                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  My Track
                </Link>

                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Upcoming Meetings
                </Link>

                <hr className="my-1 border-gray-200" />

                {/* ✅ LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}