"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardLayout from "./layouts/DashboardLayout";
import { Loader2 } from "lucide-react";

export default function layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
   setTimeout(() => {

    const rawUser = localStorage.getItem("user");

    // Not logged in
    if (!rawUser) {
      router.replace(
        `/auth/login?nextPage=${encodeURIComponent(pathname)}`
      );
      return;
    }

    let user;
    try {
      user = JSON.parse(rawUser);
    } catch (err) {
      router.replace(
        `/auth/login?nextPage=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // Role check
    if (user.role !== "ADMIN") {
      router.replace(
        `/auth/login?nextPage=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // Authorized
    setAuthorized(true);
   }, 1000);

  }, [pathname, router]);

  // Block rendering until auth is confirmed
  if (!authorized) {
    return <FullPageLoader text="Authorizing access…" />;
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}

function FullPageLoader({ text = "Loading…" }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
}