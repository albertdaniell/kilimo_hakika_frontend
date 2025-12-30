"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyMeetings } from "@/app/app-redux/features/AppData/appSlice";
import {
  Video,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react";
import { FormatDate } from "@/constants/utils";
import { registerForMeeting } from "../../app-redux/features/AppData/appSlice";

/* =====================================================
   PAGE
===================================================== */
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
      <Header />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <MeetingTable
        meetings={data}
        loading={loading}
        onSelect={setSelectedMeeting}
      />

      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </div>
  );
}

/* =====================================================
   HEADER
===================================================== */
function Header() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">My Meetings</h1>
      <p className="text-sm text-gray-500">
        View and manage your upcoming track meetings
      </p>
    </div>
  );
}

/* =====================================================
   TABLE
===================================================== */
function MeetingTable({ meetings = [], loading, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-slate-300">
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
            meetings.map((meeting) => (
              <MeetingRow
                key={meeting.id}
                meeting={meeting}
                onSelect={onSelect}
              />
            ))}

          {loading && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                Loading meetings…
              </td>
            </tr>
          )}

          {!loading && meetings.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No meetings available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* =====================================================
   ROW
===================================================== */
function MeetingRow({ meeting, onSelect }) {
  return (
    <tr
      className="border-b last:border-b-0 border-slate-300 hover:bg-gray-50 cursor-pointer"
      onClick={() => onSelect(meeting)}
    >
      <td className="px-4 py-3 font-medium">{meeting.name}</td>

      <td className="px-4 py-3">
        {meeting.start_time
          ? FormatDate(meeting.start_time, true)
          : "-"}
      </td>

      <td className="px-4 py-3">
        {meeting.has_started ? (
          <Badge icon={CheckCircle} text="Started" color="green" />
        ) : (
          <Badge icon={Clock} text="Upcoming" color="yellow" />
        )}
      </td>

      <td className="px-4 py-3">
        {meeting.has_registered ? (
          <Badge icon={CheckCircle} text="Registered" color="green" />
        ) : (
          <Badge icon={XCircle} text="Not Registered" color="gray" />
        )}
      </td>

      <td
        className="px-4 py-3 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onSelect(meeting)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );
}

/* =====================================================
   MODAL
===================================================== */
function MeetingModal({ meeting, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-6">
        <ModalHeader onClose={onClose} />

        <MeetingDetails meeting={meeting} />

        {meeting.attendance && (
          <MeetingAttendanceSection attendance={meeting.attendance} />
        )}

        <ModalActions meeting={meeting} onClose={onClose} />
      </div>
    </div>
  );
}

/* =====================================================
   MODAL SUBSECTIONS
===================================================== */
function ModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Meeting Details</h2>
      <button onClick={onClose}>
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}

function MeetingDetails({ meeting }) {
  return (
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
  );
}

function MeetingAttendanceSection({ attendance }) {
  return (
    <div className="border-t border-slate-300 pt-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Users className="w-4 h-4" />
        Your Attendance
      </h3>

      <Detail label="Join Count" value={attendance.join_count} />
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
  );
}

function ModalActions({ meeting, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state) => state.appData.registerMeetingState
  );

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setError(null);

    dispatch(
      registerForMeeting({ meeting_id: meeting.id })
    )
      .unwrap()
      .then((res) => {
        dispatch(getMyMeetings())
        setSuccess({
          message: res.detail,
          join_url: res.join_url,
        });
      })
      .catch((err) => {
        console.log({err})
        setError(err?.detail  || err || "Failed to register");
      });
  };

  return (
    <div className="space-y-3 pt-4">
      {/* SUCCESS */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
          <p className="text-green-700 font-medium">
            ✅ {success.message}
          </p>

          {success.join_url && (
            <a
              href={success.join_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium"
            >
              Join meeting
            </a>
          )}

          <p className="text-xs text-green-600">
            Do not share this link.
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          ❌ {error}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Close
        </button>

        {/* REGISTER */}
        {!meeting.has_registered && (
          <button
            onClick={handleRegister}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Registering…" : "Register"}
          </button>
        )}

        {/* JOIN */}
        {meeting.has_registered &&
        //   meeting.has_started &&
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
  );
}

/* =====================================================
   SHARED COMPONENTS
===================================================== */
function Badge({ icon: Icon, text, color }) {
  const colors = {
    green: "text-green-600",
    yellow: "text-yellow-600",
    gray: "text-gray-500",
  };

  return (
    <span className={`inline-flex items-center gap-1 ${colors[color]}`}>
      <Icon className="w-4 h-4" />
      {text}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}