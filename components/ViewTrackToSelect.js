import React, { useEffect } from "react";
import { Users, Video } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

function ViewTrackToSelect({
  track,
  cohorts = [],
  onSelect,
  selectCohort,
  selectedCohort,
  error,
  success,
  loadingSelectTrack,
}) {
  const meeting = track?.meeting;
  // const hasMeetingLink = meeting?.join_url;
  const hasMeetingLink = meeting;
  let has_selected_this_track = track?.has_selected_this_track;

  useEffect(() => {
    if (cohorts?.length === 1 && !selectedCohort) {
      selectCohort(cohorts[0].id);
    }
  }, [cohorts, selectedCohort, selectCohort]);

  return (
    <>
      {loadingSelectTrack ? (
        <LoadingSpinner message="Please wait ..." />
      ) : (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col border border-gray-100">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <img
                src={track?.track_url}
                alt={track?.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />

              <div>
                <h2 className="text-xl font-semibold text-slate-700">
                  {track?.name}
                </h2>
                <p className="text-sm text-gray-500">{track?.description}</p>
              </div>
            </div>
          </div>
          {/* Enrolled Badge */}

          <div className="flex w-fit items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
            <Users className="w-4 h-4" />
            {track?.enrolled_trainees} Enrolled
          </div>

          {/* Meeting Section */}
          {hasMeetingLink && has_selected_this_track && (
            <div className="mb-5 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                <Video className="w-4 h-4" />
                Zoom Meeting Available
              </div>

              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Join Meeting →
              </a>
            </div>
          )}

          {/* Cohorts */}
          {cohorts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Available Cohorts
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cohorts.map((cohort) => {
                  const isSelected = selectedCohort === cohort.id;

                  return (
                    <div
                      key={cohort.id}
                      onClick={() => selectCohort(cohort.id)}
                      className={`
          relative rounded-xl p-3 cursor-pointer transition
          border
          ${
            isSelected
              ? "border-green-500 bg-green-50 ring-2 ring-green-200"
              : "border-slate-200 hover:border-green-400 hover:bg-green-50"
          }
        `}
                    >
                      {/* Selected Badge */}
                      {isSelected && (
                        <span className="absolute top-2 right-2 text-[10px] bg-green-200 text-slate-800 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}

                      <p
                        className={`font-medium ${
                          isSelected ? "text-green-700 mt-4" : "text-gray-800"
                        }`}
                      >
                        {cohort?.name}
                      </p>

                      {cohort?.start_date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {cohort.start_date} – {cohort.end_date}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <strong className="block font-semibold">Error</strong>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <strong className="block font-semibold">Success</strong>
              <span>{success}</span>
            </div>
          )}

          <button
            disabled={track?.has_selected_this_track}
            onClick={() => {
              if (!track?.has_selected_this_track) {
                onSelect();
              }
            }}
            className={`
    mt-auto py-3 rounded-xl font-semibold transition
    ${
      track?.has_selected_this_track
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-green-500 text-white hover:bg-green-600"
    }
  `}
          >
            {track?.has_selected_this_track
              ? "Already Enrolled"
              : "Select Track"}
          </button>
        </div>
      )}
    </>
  );
}

export default ViewTrackToSelect;
