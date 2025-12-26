import React from "react";

export default function TrackCard({ track, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col p-10">
      
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={track.track_url}
          alt={track.name}
          className="w-12 h-12 object-cover rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold text-slate-600">
            {track.name}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2">
            {track.description}
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onSelect?.(track)}
        className="mt-auto bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition"
      >
        Select Track
      </button>
    </div>
  );
}