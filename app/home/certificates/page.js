"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCertificates } from "@/app/app-redux/features/AppData/appSlice";
import { FileText, Eye, X } from "lucide-react";

export default function MyCertificatesPage() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.appData.certificatesState
  );

  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    dispatch(getMyCertificates());
  }, [dispatch]);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Certificates</h1>
        <p className="text-sm text-gray-500">
          Download and verify certificates you’ve earned
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading certificates…</p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && data.length === 0 && (
        <p className="text-sm text-gray-500">
          You don’t have any certificates yet.
        </p>
      )}

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Certificate
                </span>
              </div>

              <h3 className="font-semibold">
                {cert.track.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Cohort: {cert.cohort?.name || "—"}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Issued:{" "}
                {new Date(cert.issued_at).toLocaleDateString()}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                #{cert.certificate_number}
              </p>
            </div>

            <button
              onClick={() => setSelectedCert(cert)}
              className="mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
            >
              <Eye className="w-4 h-4" />
              View Certificate
            </button>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}

function CertificateModal({ cert, onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-300">
          <div>
            <h2 className="font-semibold">
              {cert.track.name} Certificate
            </h2>
            <p className="text-xs text-gray-500">
              #{cert.certificate_number}
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 p-4 text-sm border-b border-slate-300">
          <Info label="Name" value={cert.user.name} />
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