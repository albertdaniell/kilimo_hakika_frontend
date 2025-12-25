"use client";
import React, { useState } from "react";

const navItems = [
  "Home",
  "Profile",
  "Meetings",
  "Tracks",
  
];

export default function SideNav() {
  const [active, setActive] = useState("Home");

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-r-slate-200 overflow-y-auto">
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 mb-2">PERSONAL</p>

        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={() => setActive(item)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition
                  ${
                    active === item
                      ? "bg-green-500 text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
