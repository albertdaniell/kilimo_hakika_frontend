"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminCohorts,
  createCohort,
  updateCohort,
  deleteCohort,
} from "../../app-redux/features/AppData/appSlice";

export default function Page() {
  const dispatch = useDispatch();

  const { data: cohorts, loading, error } = useSelector(
    (state) => state.appData.adminCohortsState
  );

  const [showForm, setShowForm] = useState(false);
  const [editingCohort, setEditingCohort] = useState(null);

  useEffect(() => {
    dispatch(getAdminCohorts());
  }, [dispatch]);

  const openAdd = () => {
    setEditingCohort(null);
    setShowForm(true);
  };

  const openEdit = (cohort) => {
    setEditingCohort(cohort);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this cohort?")) {
      dispatch(deleteCohort(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cohorts</h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
        >
          <Plus className="w-4 h-4" />
          Add Cohort
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-sm text-gray-500">Loading cohorts…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-slate-300">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Start Date</th>
              <th className="text-left px-4 py-3">End Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cohorts?.map((cohort) => (
              <tr key={cohort.id} className="border-b  border-slate-300 last:border-b-0">
                <td className="px-4 py-3 font-medium">{cohort.name}</td>
                <td className="px-4 py-3">{cohort.start_date}</td>
                <td className="px-4 py-3">{cohort.end_date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cohort.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cohort.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(cohort)}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cohort.id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && cohorts?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No cohorts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <CohortForm
          cohort={editingCohort}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

/* ========================= */
/* Cohort Form Modal */
/* ========================= */

function CohortForm({ cohort, onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState(cohort?.name || "");
  const [startDate, setStartDate] = useState(cohort?.start_date || "");
  const [endDate, setEndDate] = useState(cohort?.end_date || "");
  const [isActive, setIsActive] = useState(cohort?.is_active || false);

  const isEdit = Boolean(cohort);

  const handleSubmit = () => {
    const payload = {
      name,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
    };

    if (isEdit) {
      dispatch(updateCohort({ id: cohort.id, dataPassed: payload }));
    } else {
      dispatch(createCohort(payload));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Cohort" : "Add Cohort"}
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Cohort name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            {isEdit ? "Update Cohort" : "Create Cohort"}
          </button>
        </div>
      </div>
    </div>
  );
}