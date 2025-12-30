"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Nav */}
      <TopNav />

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main Content */}
        <main
          className={`
            w-full h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 p-6
            transition-all duration-300
            ${collapsed ? "md:ml-20" : "md:ml-64"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}