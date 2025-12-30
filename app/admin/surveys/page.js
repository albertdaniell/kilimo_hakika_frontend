"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminSurveyResponses,
} from "@/app/app-redux/features/AppData/appSlice";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FormatDate } from "@/constants/utils";
import { getAdminCohorts, getCohorts } from "../../app-redux/features/AppData/appSlice";

export default function AdminSurveyResponsesPage() {
  const dispatch = useDispatch();

  const {
    data,
    loading,
    error,
    count,
    next,
    previous,
  } = useSelector(
    (state) => state.appData.myAdminSurveyResponsesState
  );

  const { data: cohorts } = useSelector(
    (state) => state.appData.adminCohortsState
  );

  /* ================= FILTER STATE ================= */
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [cohortId, setCohortId] = useState("");
  const [surveyType, setSurveyType] = useState("");

  const [openId, setOpenId] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getAdminCohorts())
    dispatch(
      getAdminSurveyResponses({
        page,
        email,
        cohort_id: cohortId,
        survey_type: surveyType,
      })
    );
  }, [dispatch, page, email, cohortId, surveyType]);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">
          Survey Responses
        </h1>
        <p className="text-sm text-gray-500">
          Filter and review trainee survey submissions
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Email */}
        <input
          type="text"
          placeholder="Search by email"
          value={email}
          onChange={(e) => {
            setPage(1);
            setEmail(e.target.value);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        {/* {JSON.stringify(cohorts)} */}

        {/* Cohort */}
        <select
          value={cohortId}
          onChange={(e) => {
            setPage(1);
            setCohortId(e.target.value);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Cohorts</option>
          {cohorts?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} --- {FormatDate(c?.start_date)} {FormatDate(c?.end_date)}
            </option>
          ))}
        </select>

        {/* Survey Type */}
        <select
          value={surveyType}
          onChange={(e) => {
            setPage(1);
            setSurveyType(e.target.value);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Surveys</option>
          <option value="baseline-survey">Baseline</option>
          <option value="endline-survey">Endline</option>
        </select>

        {/* Count */}
        <div className="text-sm text-gray-500 flex items-center">
          {count} responses
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {!loading &&
          data.map((res) => {
            const isOpen = openId === res.id;

            return (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow-sm border"
              >
                <button
                  onClick={() =>
                    setOpenId(isOpen ? null : res.id)
                  }
                  className="w-full px-6 py-4 flex justify-between text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">
                      {res.user.first_name}{" "}
                      {res.user.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {res.user.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {res.survey_name} ·{" "}
                      {res.track_info.cohort_name}
                    </p>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t px-6 py-4 space-y-4">
                    {res.answers.map((a, idx) => (
                      <div key={idx}>
                        <p className="text-sm font-medium">
                          {a.question_label}
                        </p>
                        <p className="text-sm text-gray-700">
                          {a.answer_text ||
                            a.selected_choice ||
                            a.selected_choices?.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center pt-4">
        <button
          disabled={!previous}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {page}
        </span>

        <button
          disabled={!next}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}