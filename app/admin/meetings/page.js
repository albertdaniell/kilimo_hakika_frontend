"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrackMeetings,
  createTrackMeeting,
  deleteTrackMeeting,
  getTracks,
} from "@/app/app-redux/features/AppData/appSlice";

import {
  Plus,
  Trash2,
  Video,
  Eye,
  Loader2,
  CheckCircle,
} from "lucide-react";

/* =====================================================
   COMPONENT
===================================================== */
export default function AdminMeetingsPage() {
  const dispatch = useDispatch();

  const { data: meetings = [], loading } = useSelector(
    (state) => state.appData.meetingsState
  );

  const { data: tracks = [] } = useSelector(
    (state) => state.appData.tracksState
  );

  const { loading: creating } = useSelector(
    (state) => state.appData.createMeetingState
  );

  /* ================= LOCAL STATE ================= */
  const [filter, setFilter] = useState("active");

  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [track, setTrack] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  /* ================= EFFECTS ================= */
  useEffect(() => {
    dispatch(getTrackMeetings());
    dispatch(getTracks());
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filteredMeetings = useMemo(() => {
    if (filter === "active") return meetings.filter((m) => m.is_active);
    if (filter === "inactive") return meetings.filter((m) => !m.is_active);
    return meetings;
  }, [meetings, filter]);

  /* ================= CREATE ================= */
  const submitMeeting = (e) => {
    e.preventDefault();

    dispatch(
      createTrackMeeting({
        track,
        start_time: startTime,
        duration_hours: duration,
      })
    ).then(() => {
      setShowCreate(false);
      setTrack("");
      setStartTime("");
      setDuration("");
      dispatch(getTrackMeetings());
    });
  };

  /* ================= DELETE ================= */
  const confirmDelete = () => {
    if (!selectedMeeting || !selectedMeeting.is_active || deleting) return;

    setDeleting(true);

    dispatch(deleteTrackMeeting(selectedMeeting.id))
      .unwrap()
      .then((res) => {
        setDeleteSuccess(res.detail);
        setShowDelete(false);
        setSelectedMeeting(null);
        dispatch(getTrackMeetings());
        setTimeout(() => setDeleteSuccess(""), 4000);
      })
      .finally(() => setDeleting(false));
  };

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Track Meetings</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Create Meeting
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["active", "inactive", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-lg text-sm ${
              filter === f
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Success */}
      {deleteSuccess && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
          <CheckCircle className="w-4 h-4" />
          {deleteSuccess}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Track</th>
              <th className="px-4 py-3 text-left">Topic</th>
              <th className="px-4 py-3 text-left">Meeting</th>
              <th className="px-4 py-3 text-right">Actions</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              filteredMeetings.map((m) => (
                <tr key={m.id} className="border-b border-slate-300 last:border-b-0">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3">{m.topic}</td>

                  <td className="px-4 py-3">
                    <a
                      href={m.join_url}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-blue-600"
                    >
                      <Video className="w-4 h-4" />
                      Join
                    </a>
                  </td>

                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => {
                        setSelectedMeeting(m);
                        setShowView(true);
                      }}
                      className="inline-flex items-center gap-1 text-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <button
                      disabled={!m.is_active}
                      onClick={() => {
                        setSelectedMeeting(m);
                        setShowDelete(true);
                      }}
                      className={`inline-flex items-center gap-1 text-red-600 ${
                        !m.is_active && "opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        m.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {m.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ================= CREATE MODAL ================= */}
     {/* ================= CREATE MODAL ================= */}
{showCreate && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <form
      onSubmit={submitMeeting}
      className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
    >
      <h2 className="text-lg font-semibold">
        Create Track Meeting
      </h2>

      {/* Track */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Track
        </label>
        <select
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Track</option>
          {tracks?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Start Time */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Start Date & Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="text-xs text-gray-400">
          Meeting start time (Africa/Nairobi)
        </p>
      </div>

      {/* Duration */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Duration (hours)
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          placeholder="e.g. 1.5"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="text-xs text-gray-400">
          Supports decimals (e.g. 1.5 = 1 hour 30 minutes)
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={() => setShowCreate(false)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={creating}
          className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
        >
          {creating ? "Creating Meeting…" : "Create Meeting"}
        </button>
      </div>
    </form>
  </div>
)}

      {/* ================= VIEW MODAL ================= */}
     

      {/* ================= VIEW MEETING MODAL ================= */}
{showView && selectedMeeting && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-5">
      <h2 className="text-lg font-semibold">
        Meeting Details
      </h2>

      {/* Track */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Track</p>
        <p className="font-medium">{selectedMeeting.name}</p>
      </div>

      {/* Topic */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Topic</p>
        <p className="font-medium">{selectedMeeting.topic}</p>
      </div>

      {/* Join Link */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Join Link</p>
        <a
          href={selectedMeeting.join_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline break-all"
        >
          {selectedMeeting.join_url}
        </a>
      </div>

      {/* Status */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Status</p>
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            selectedMeeting.is_active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {selectedMeeting.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={() => setShowView(false)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Close
        </button>

        <button
          onClick={() => {
            setShowView(false);
            openDeleteModal(selectedMeeting);
          }}
          disabled={!selectedMeeting.is_active}
          className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 ${
            selectedMeeting.is_active
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-200 text-red-500 cursor-not-allowed"
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
)}

      {/* ================= DELETE MODAL ================= */}
     {/* ================= DELETE MODAL ================= */}
{showDelete && selectedMeeting && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
      <h2 className="text-lg font-semibold text-red-600">
        Delete Meeting
      </h2>

      <p className="text-sm text-gray-600">
        Are you sure you want to delete the meeting for{" "}
        <span className="font-medium">
          {selectedMeeting.name}
        </span>
        ? This cannot be undone.
      </p>
      

      {!selectedMeeting.is_active && (
        <p className="text-xs text-gray-500">
          This meeting is already inactive and cannot be deleted again.
        </p>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={() => setShowDelete(false)}
          disabled={deleting}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          disabled={!selectedMeeting.is_active || deleting}
          className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 ${
            selectedMeeting.is_active
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-200 text-red-500 cursor-not-allowed"
          }`}
        >
          {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}