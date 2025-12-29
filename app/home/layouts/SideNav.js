"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", link: "/home" },
  { name: "Profile", link: "/home/profile" },
  { name: "Tracks", link: "/home/tracks" },
  { name: "Meeting", link: "/home/meeting" },
  { name: "Surveys", link: "/home/surveys/baseline" },
  { name: "Certificates", link: "/home/certificates" },
  { name: "Learning Materials", link: "/home/learning-materials" },
  { name: "Support", link: "/home/support" },


];

export default function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (link) => {
    if (link === "/home") return pathname === "/home";
    return pathname.startsWith(link);
  };

  return (
    <>
      {/* ☰ Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-12 left-4 z-50 md:hidden bg-green-500 text-white p-2 rounded-lg shadow"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out z-40
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

        <div className="p-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">
            PERSONAL
          </p>

          <ul className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm transition
                  ${
                    isActive(item.link)
                      ? "bg-green-500 text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}