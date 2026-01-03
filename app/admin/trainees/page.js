"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrainees } from "@/app/app-redux/features/AppData/appSlice";
import { X } from "lucide-react";

export default function TraineesPage() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.appData.traineesState
  );

  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getAllTrainees({ page }));
  }, [dispatch, page]);

  const trainees = data?.results || [];
  const total = data?.count || 0;
  const hasNext = Boolean(data?.next);
  const hasPrevious = Boolean(data?.previous);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Trainees</h1>
        <p className="text-sm text-gray-500">
          All registered trainees (enrolled or not)
        </p>
      </div>

      {/* ================= LOADING ================= */}
      {loading && <p className="text-sm text-gray-500">Loading trainees…</p>}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ================= TABLE ================= */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-slate-300">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Enrolments</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {trainees.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-300 last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {t.first_name} {t.last_name}
                  </td>
                  <td className="px-4 py-3">{t.email}</td>
                  <td className="px-4 py-3">{t.phone}</td>
                  <td className="px-4 py-3">{t.enrolments?.length || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        console.log(t);
                        setSelectedTrainee(t);
                      }}
                      className="text-green-600 hover:underline font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {trainees.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    No trainees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ================= PAGINATION ================= */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-300 text-sm">
            <p className="text-gray-500">
              Total trainees: <strong>{total}</strong>
            </p>

            <div className="flex gap-2">
              <button
                disabled={!hasPrevious}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-2 py-1 text-gray-600">Page {page}</span>

              <button
                disabled={!hasNext}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SIDE MODAL ================= */}
      {selectedTrainee && (
        <TraineeModal
          trainee={selectedTrainee}
          onClose={() => setSelectedTrainee(null)}
        />
      )}
    </div>
  );
}

/* ================= MODAL ================= */
function TraineeModal({ trainee, onClose }) {
  return (
    <div className="fixed  inset-0 backdrop-blur-sm z-50 flex justify-end bg-black/30 ">
      <div className="bg-white w-full max-w-md h-full shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Trainee Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <Info
            label="Name"
            value={`${trainee.first_name} ${trainee.last_name}`}
          />
          <Info label="Email" value={trainee.email} />
          <Info label="Phone" value={trainee.phone} />
          <Info label="Role" value={trainee.role} />
          <Info
            label="Joined"
            value={new Date(trainee.date_joined).toLocaleDateString()}
          />

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Enrolments
            </p>

            {trainee.enrolments?.length ? (
              <div className="mt-2 space-y-3">
                {trainee.enrolments.map((e) => (
                  <div
                    key={e.id}
                    className="border border-slate-300 rounded-lg p-3 bg-slate-50 space-y-2"
                  >
                    {/* ===== TRACKS ===== */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Track
                      </p>

                      {/* {
            JSON.stringify(e.track)
          } */}

                      {e.track ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                            {e.track.name || e.track.short_name}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 mt-1">
                          No track assigned
                        </p>
                      )}
                    </div>

                    {/* ===== COHORTS ===== */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Cohort
                      </p>

                      {e.cohort ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                            {e.cohort.name}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 mt-1">
                          No cohort assigned
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-2">
                Not enrolled in any track
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= INFO ================= */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-medium text-sm">{value || "-"}</p>
    </div>
  );
}
