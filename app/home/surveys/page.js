"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getMyTrackSurveys } from "../../app-redux/features/AppData/appSlice";

export default function SurveysPage() {
  const dispatch = useDispatch();

  const { loading, error, data } = useSelector(
    (state) => state.appData.myTrackSurveysState
  );

  useEffect(() => {
    dispatch(getMyTrackSurveys());
  }, [dispatch]);

  return (
    <div className="max-w-5xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Surveys</h1>
        <p className="text-sm text-gray-500">
          Please complete the surveys assigned to your track
        </p>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-sm text-gray-500">Loading surveys…</p>
      )}

      {/* ================= SURVEY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading &&
          data?.map((survey) => {
            const isCompleted = survey.has_submitted;

            return (
              <div
                key={survey.id}
                className={`
                  rounded-xl shadow-sm p-6 flex flex-col justify-between transition
                  ${
                    isCompleted
                      ? "bg-gray-50 opacity-70"
                      : "bg-white hover:shadow-md"
                  }
                `}
              >
                {/* -------- CONTENT -------- */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {survey.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {survey.description || "No description provided"}
                  </p>
                </div>

                {/* -------- ACTIONS -------- */}
                <div className="mt-6 flex gap-3">
                  {isCompleted ? (
                    <>
                      <span className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                        Completed
                      </span>

                      <Link
                        href={`/home/surveys/${survey.slug}?mode=view`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        View Responses
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/home/surveys/${survey.slug}`}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      Take Survey
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!loading && data?.length === 0 && (
        <p className="text-sm text-gray-500">
          No surveys available for your track
        </p>
      )}
    </div>
  );
}