"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Layers,
  ClipboardList,
  Video,
  Award,
  BookOpen,
  LifeBuoy,
} from "lucide-react";

/* ===========================
   NAV ITEMS
=========================== */
const navItems = [
  { name: "Home", link: "/home", icon: Home },
  { name: "Tracks", link: "/home/tracks", icon: Layers },
  { name: "Surveys", link: "/home/surveys", icon: ClipboardList },
  { name: "Meeting", link: "/home/meeting", icon: Video },
  { name: "Certificates", link: "/home/certificates", icon: Award },
  { name: "Learning Materials", link: "/home/learning-materials", icon: BookOpen },
  { name: "Support", link: "/home/support", icon: LifeBuoy },
];

export default function SideNav({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false); // mobile
  // const [collapsed, setCollapsed] = useState(false); // desktop

  const isActive = (link) => {
    if (link === "/home") return pathname === "/home";
    return pathname.startsWith(link);
  };

  return (
    <>
      {/* ☰ Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-12 left-4 z-50 md:hidden bg-green-500 text-white p-2 rounded-lg shadow"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out z-40
          ${collapsed ? "w-20" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <p className="text-sm font-semibold text-gray-600">Menu</p>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden md:flex justify-end px-3 pt-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Nav */}
        <div className="p-4">
          {!collapsed && (
            <p className="text-xs font-semibold text-gray-400 mb-2">
              PERSONAL
            </p>
          )}

          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.link);

              return (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                      ${
                        active
                          ? "bg-green-500 text-white"
                          : "text-gray-700 hover:bg-green-100"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-white" : "text-gray-500"
                      }`}
                    />

                    {!collapsed && (
                      <span className="whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>

                  {/* Tooltip (only when collapsed) */}
                  {collapsed && (
                    <div
                      className="
                        absolute left-full top-1/2 -translate-y-1/2 ml-3
                        hidden group-hover:block
                        bg-gray-800 text-white text-xs px-3 py-1 rounded-md
                        whitespace-nowrap shadow-lg z-50
                      "
                    >
                      {item.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}