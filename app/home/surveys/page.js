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
    <div className="max-w-5xl  space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Surveys</h1>
        <p className="text-sm text-gray-500">
          Please complete the surveys assigned to your track
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading surveys…</p>
      )}

      {/* Survey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading &&
          data?.map((survey) => (
            <div
              key={survey.id}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {survey.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {survey.description || "No description provided"}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href={`/home/surveys/${survey.slug}`}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Take Survey
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Empty */}
      {!loading && data?.length === 0 && (
        <p className="text-sm text-gray-500">
          No surveys available for your track
        </p>
      )}
    </div>
  );
}