"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrackMeetings,
  createTrackMeeting,
  getTracks,
} from "@/app/app-redux/features/AppData/appSlice";

import { Plus, Video } from "lucide-react";

export default function AdminMeetingsPage() {
  const dispatch = useDispatch();

  const { data: meetings, loading, error } = useSelector(
    (state) => state.appData.meetingsState
  );

  const { data: tracks } = useSelector(
    (state) => state.appData.tracksState
  );

  const {
    loading: creating,
    error: createError,
  } = useSelector((state) => state.appData.createMeetingState);

  const [showForm, setShowForm] = useState(false);
  const [track, setTrack] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    dispatch(getTrackMeetings());
    dispatch(getTracks());
  }, [dispatch]);

  const submitMeeting = (e) => {
    e.preventDefault();

    dispatch(
      createTrackMeeting({
        track,
        start_time: startTime,
        duration_hours: duration,
      })
    ).then(() => {
      setShowForm(false);
      setTrack("");
      setStartTime("");
      setDuration("");
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Track Meetings</h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
        >
          <Plus className="w-4 h-4" />
          Create Meeting
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Meetings List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Track</th>
              <th className="px-4 py-3 text-left">Topic</th>
              <th className="px-4 py-3 text-left">Meeting</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              meetings?.map((m) => (
                <tr key={m.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-medium">
                    {m.name}
                  </td>
                  <td className="px-4 py-3">
                    {m.topic}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={m.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Video className="w-4 h-4" />
                      Join
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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

            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Loading meetings…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Meeting Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={submitMeeting}
            className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
          >
            <h2 className="text-lg font-semibold">
              Create Track Meeting
            </h2>

            {createError && (
              <p className="text-sm text-red-600">
                {createError}
              </p>
            )}

            {/* Track */}
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select Track</option>
              {tracks?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Start Time */}
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            {/* Duration */}
            <input
              type="number"
              min="0.5"
              step="0.5"
              placeholder="Duration (hours)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
              >
                {creating ? "Creating…" : "Create Meeting"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}