"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCertificates } from "@/app/app-redux/features/AppData/appSlice";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { FileText, X } from "lucide-react";

export default function AdminCertificatesPage() {
  const dispatch = useDispatch();

  const {
    data,
    loading,
    error,
    pagination,
  } = useSelector((state) => state.appData.adminCertificatesState);

  const [selectedCert, setSelectedCert] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllCertificates({ page }));
  }, [dispatch, page]);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">All Certificates</h1>
        <p className="text-sm text-gray-500">
          Issued certificates across all tracks and cohorts
        </p>
      </div>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading certificates…</p>}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 text-left">Trainee</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Track</th>
                <th className="px-4 py-3 text-left">Cohort</th>
                <th className="px-4 py-3 text-left">Issued</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((cert) => (
                <tr
                  key={cert.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{cert.user.name}</td>
                  <td className="px-4 py-3">{cert.user.email}</td>
                  <td className="px-4 py-3">{cert.track.name}</td>
                  <td className="px-4 py-3">{cert.cohort?.name || "-"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(cert.issued_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No certificates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500">
          Total certificates: {pagination.count}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={!pagination.previous}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`flex items-center gap-1 px-3 py-1 rounded-md border
              ${pagination.previous
                ? "hover:bg-gray-100"
                : "opacity-40 cursor-not-allowed"}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="px-2">Page {page}</span>

          <button
            disabled={!pagination.next}
            onClick={() => setPage((p) => p + 1)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md border
              ${pagination.next
                ? "hover:bg-gray-100"
                : "opacity-40 cursor-not-allowed"}`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <AdminCertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}

function AdminCertificateModal({ cert, onClose }) {
  return (
    <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-300">
          <div>
            <h2 className="font-semibold">
              Certificate #{cert.certificate_number}
            </h2>
            <p className="text-xs text-gray-500">
              {cert.track.name}
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 text-sm border-b border-slate-300">
          <Info label="Trainee" value={cert.user.name} />
          <Info label="Email" value={cert.user.email} />
          <Info label="Track" value={cert.track.name} />
          <Info label="Cohort" value={cert.cohort?.name || "-"} />
          <Info
            label="Issued On"
            value={new Date(cert.issued_at).toLocaleDateString()}
          />
        </div>

        {/* PDF Preview */}
        <div className="flex-1 bg-gray-100">
          <iframe
            src={cert.file_url}
            className="w-full h-full"
            title="Certificate Preview"
            name="Certificate"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-300 flex justify-end">
          <a
            href={cert.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}