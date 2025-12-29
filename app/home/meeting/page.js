"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyMeetings } from "@/app/app-redux/features/AppData/appSlice";
import {
  Video,
  X,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react";
import { FormatDate } from "@/constants/utils";

export default function MyMeetingsPage() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.appData.myMeetingsState
  );

  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    dispatch(getMyMeetings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">My Meetings</h1>
        <p className="text-sm text-gray-500">
          View and manage your upcoming track meetings
        </p>
      </div>

      {/* ================= ERROR ================= */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Meeting</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Progress</th>
              <th className="px-4 py-3 text-left">Registration</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              data.map((m) => (
                <tr
                  key={m.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedMeeting(m)}
                >
                  <td className="px-4 py-3 font-medium">{m.name}</td>

                  <td className="px-4 py-3">
                    {m.start_time
                      ? FormatDate(m.start_time, true)
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    {m.has_started ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Started
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-600">
                        <Clock className="w-4 h-4" />
                        Upcoming
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {m.has_registered ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Registered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        <XCircle className="w-4 h-4" />
                        Not Registered
                      </span>
                    )}
                  </td>

                  <td
                    className="px-4 py-3 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}

            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Loading meetings…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </div>
  );
}

/* =========================================
   MEETING MODAL
========================================= */
function MeetingModal({ meeting, onClose }) {
  const attendance = meeting.attendance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Meeting Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ================= BASIC DETAILS ================= */}
        <div className="space-y-3 text-sm">
          <Detail label="Name" value={meeting.name} />
          <Detail label="Topic" value={meeting.topic} />
          <Detail
            label="Start Time"
            value={
              meeting.start_time
                ? FormatDate(meeting.start_time, true)
                : "-"
            }
          />
          <Detail
            label="Status"
            value={meeting.has_started ? "Started" : "Upcoming"}
          />
          <Detail
            label="Registration"
            value={meeting.has_registered ? "Registered" : "Not Registered"}
          />
        </div>

        {/* ================= ATTENDANCE ================= */}
        {attendance && (
          <div className="border-t pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Your Attendance
            </h3>

            <Detail
              label="Join Count"
              value={attendance.join_count}
            />

            <Detail
              label="Time Attended"
              value={`${attendance.total_duration_minutes} minutes`}
            />

            <Detail
              label="First Joined"
              value={
                attendance.first_join_time
                  ? FormatDate(attendance.first_join_time, true)
                  : "-"
              }
            />

            <Detail
              label="Last Left"
              value={
                attendance.last_leave_time
                  ? FormatDate(attendance.last_leave_time, true)
                  : "-"
              }
            />

            <Detail
              label="Currently In Meeting"
              value={attendance.is_in_meeting ? "Yes" : "No"}
            />
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>

          {meeting.has_registered &&
            meeting.has_started &&
            meeting.json?.start_url && (
              <a
                href={meeting.json.start_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 inline-flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Join Meeting
              </a>
            )}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SMALL COMPONENT
========================================= */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}