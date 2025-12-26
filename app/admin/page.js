"use client";

import { useEffect } from "react";
import { Users, Layers, CalendarDays, BarChart3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardStats } from "@/app/app-redux/features/AppData/appSlice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.appData.adminDashboardStatsState
  );

  useEffect(() => {
    dispatch(getAdminDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading dashboard stats…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of training programmes, cohorts, and trainee engagement
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Trainees"
          value={data.total_trainees}
          note={`+${data.this_month_trainees} this month`}
          color="green"
        />
        <StatCard
          icon={<Layers className="w-5 h-5" />}
          label="Active Tracks"
          value={data.active_tracks}
          note="Across multiple sectors"
          color="blue"
        />
        <StatCard
          icon={<CalendarDays className="w-5 h-5" />}
          label="Active Cohorts"
          value={data.active_cohorts}
          note="Currently running"
          color="indigo"
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Avg Completion"
          value={`${data.ai_literacy_avg_progress}%`}
          note="AI literacy progress"
          color="emerald"
        />
      </div>

      {/* Track Enrolments */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Enrolments by Track
        </h2>
        {/* 📈 Enrolments Per Day Chart */}

        <div className="space-y-3">
          {data.enrollments_per_track.map((track) => (
            <TrackRow
              key={track.track_id}
              name={track.track_name}
              value={track.total}
            />
          ))}
        </div>
      </div>
<EnrollmentPerDayChart data={data.enrollments_per_day} />

      {/* Engagement & Meetings (still static placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Trainee Engagement
          </h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Highly Active</span>
              <span className="font-medium text-green-600">—</span>
            </li>
            <li className="flex justify-between">
              <span>Moderately Active</span>
              <span className="font-medium text-yellow-600">—</span>
            </li>
            <li className="flex justify-between">
              <span>Low Engagement</span>
              <span className="font-medium text-red-600">—</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Meetings
          </h2>

          <p className="text-sm text-gray-500">
            No upcoming meetings configured
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-green-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">
          Quick Admin Actions
        </h2>
        <p className="text-sm text-green-100 mb-4">
          Manage cohorts, tracks, and monitor programme performance
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            "Create Cohort",
            "Add Track",
            "View Reports",
            "Manage Users",
          ].map((item) => (
            <button
              key={item}
              className="bg-white/10 hover:bg-white/20 rounded-xl py-3 text-sm font-medium transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* Components */
/* ========================= */

function StatCard({ icon, label, value, note, color }) {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{note}</p>
    </div>
  );
}

function TrackRow({ name, value }) {
  const percentage = Math.min((value / 500) * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}



function EnrollmentPerDayChart({ data = [] }) {
  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">
        No enrollment data available
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        Enrolments Per Day
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}