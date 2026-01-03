"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  Home,
  User,
  Layers,
  Users,
  Video,
  ClipboardList,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { getAllSurveys } from "@/app/app-redux/features/AppData/appSlice";

/* ===========================
   NAV ITEMS
=========================== */
const navItems = [
  { name: "Home", link: "/admin", icon: Home },
  { name: "Profile", link: "/admin/profile", icon: User },
  { name: "Tracks", link: "/admin/tracks", icon: Layers },
  { name: "Cohorts", link: "/admin/cohorts", icon: Users },
  { name: "Trainees", link: "/admin/trainees", icon: User },
  { name: "Meetings", link: "/admin/meetings", icon: Video },
  { name: "Surveys", link: "/admin/surveys", icon: ClipboardList },
  { name: "Certificates", link: "/admin/certificates", icon: Award },
];

export default function SideNav({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [openSurveyMenu, setOpenSurveyMenu] = useState(
    pathname.startsWith("/admin/surveys")
  );

  /* ===========================
     SURVEYS FROM REDUX
  =========================== */
  const surveys = useSelector(
    (state) => state.appData.allSurveysState.data
  );

  useEffect(() => {
    dispatch(getAllSurveys());
  }, [dispatch]);

  const isActive = (link) => {
    if (link === "/admin") return pathname === "/admin";
    return pathname.startsWith(link);
  };

  const isSurveyActive = pathname.startsWith("/admin/surveys");

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-12 left-4 z-50 md:hidden bg-green-500 text-white p-2 rounded-lg shadow"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* SIDEBAR */}
      <aside
  className={`
    fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-slate-300
    transition-all duration-300 z-40
    overflow-y-auto
    ${collapsed ? "w-20" : "w-64"}
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <p className="text-sm font-semibold text-gray-600">Menu</p>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* COLLAPSE BUTTON */}
        <div className="hidden md:flex justify-end px-3 pt-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* NAV */}
        <div className="p-4">
          {!collapsed && (
            <p className="text-xs font-semibold text-gray-400 mb-2">
              ADMIN ACCOUNT
            </p>
          )}

          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              /* ===== SURVEYS MENU ===== */
              if (item.name === "Surveys") {
                return (
                  <li key="surveys">
                    <button
                      onClick={() => setOpenSurveyMenu(!openSurveyMenu)}
                      className={`
                        w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm
                        ${
                          isSurveyActive
                            ? "bg-green-500 text-white"
                            : "text-gray-700 hover:bg-green-100"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {!collapsed && <span>Surveys</span>}
                      </div>

                      {!collapsed &&
                        (openSurveyMenu ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </button>

                    {/* SUBMENU */}
                    {!collapsed && openSurveyMenu && (
                      <ul className="ml-10 mt-2 space-y-1 text-sm">
                        {/* RESPONSES */}
                        <Link
                          href="/admin/surveys"
                          className={`block px-3 py-1 rounded-md ${
                            pathname === "/admin/surveys"
                              ? "text-green-600 font-medium"
                              : "text-gray-600 hover:text-green-600"
                          }`}
                        >
                          Responses
                        </Link>

                        {/* INSIGHTS HEADER */}
                        <div className="pt-3 text-xs text-gray-400">
                          Insights
                        </div>

                        {/* DYNAMIC SURVEYS */}
                        {surveys.map((survey) => (
                          <Link
                            key={survey.id}
                            href={`/admin/surveys/insights/${survey.slug}`}
                            className={`block px-3 py-1 rounded-md ${
                              pathname.includes(survey.slug)
                                ? "text-green-600 font-medium"
                                : "text-gray-600 hover:text-green-600"
                            }`}
                          >
                            {survey.name}
                            {survey.track?.short_name && (
                              <span className="text-xs text-gray-400 ml-1">
                                ({survey.track.name})
                              </span>
                            )}
                          </Link>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              /* ===== NORMAL ITEMS ===== */
              const active = isActive(item.link);

              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg text-sm
                    ${
                      active
                        ? "bg-green-500 text-white"
                        : "text-gray-700 hover:bg-green-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}