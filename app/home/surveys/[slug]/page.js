"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import {
  getSurveyBySlug,
  submitSurveyResponses,
} from "../../../app-redux/features/AppData/appSlice";

export default function SurveyDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { data: survey, loading, error } = useSelector(
    (state) => state.appData.surveyBySlugState
  );

  const submitState = useSelector(
    (state) => state.appData.submitSurveyState
  );

  /* ===========================
     ANSWERS STATE
  =========================== */
  const [answers, setAnswers] = useState({});
  const [formError, setFormError] = useState(null);

  /* ===========================
     FETCH SURVEY
  =========================== */
  useEffect(() => {
    if (slug) {
      dispatch(getSurveyBySlug({ slug }));
    }
  }, [dispatch, slug]);

  /* ===========================
     HANDLE ANSWER CHANGE
  =========================== */
  const updateAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        question_id: question.id,
        value:
          question.question_type === "checkbox"
            ? Array.isArray(value)
              ? value
              : [value]
            : value,
      },
    }));
  };

  /* ===========================
     SUBMIT
  =========================== */
  const handleSubmit = () => {
    setFormError(null);

    if (!survey?.questions?.length) return;

    // ✅ Required field validation (ALL TYPES)
    const missing = survey.questions.find((q) => {
      if (!q.is_required) return false;

      const answer = answers[q.id]?.value;

      if (q.question_type === "checkbox") {
        return !Array.isArray(answer) || answer.length === 0;
      }

      return answer === undefined || answer === "";
    });

    if (missing) {
      setFormError(`"${missing.label}" is required`);
      return;
    }

    dispatch(
      submitSurveyResponses({
        survey_id: survey.id,
        answers: Object.values(answers),
      })
    );
  };

  /* ===========================
     UI STATES
  =========================== */
  if (loading) return <p>Loading survey…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!survey) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{survey.name}</h1>
        <p className="text-sm text-gray-500">{survey.description}</p>
      </div>

      {/* Success */}
      {submitState.success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
          <CheckCircle className="w-4 h-4" />
          Survey submitted successfully
        </div>
      )}

      {/* Error */}
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {formError}
        </div>
      )}

      {/* Questions */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {survey.questions.map((q, index) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id]?.value}
            onChange={updateAnswer}
            index={index}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitState.loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
        >
          {submitState.loading && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          Submit Survey
        </button>
      </div>
    </div>
  );
}

/* ======================================================
   QUESTION RENDERER (ALL TYPES SUPPORTED)
====================================================== */
function QuestionRenderer({ question, value, onChange, index }) {
  return (
    <div className="space-y-2">
      {/* Label */}
      <p className="font-medium">
        {index + 1}. {question.label}
        {question.is_required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </p>

      {/* Help text */}
      {question.help_text && (
        <p className="text-xs text-gray-500">
          {question.help_text}
        </p>
      )}

      {/* TEXT */}
      {question.question_type === "text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) =>
            onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      )}

      {/* TEXTAREA */}
      {question.question_type === "textarea" && (
        <textarea
          value={value || ""}
          onChange={(e) =>
            onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
          rows={4}
        />
      )}

      {/* NUMBER */}
      {question.question_type === "number" && (
        <input
          type="number"
          value={value || ""}
          onChange={(e) =>
            onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      )}

      {/* RADIO */}
      {question.question_type === "radio" &&
        question.choices?.map((c) => (
          <label
            key={c.id}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="radio"
              name={question.id}
              checked={value === c.value}
              onChange={() =>
                onChange(question, c.value)
              }
            />
            {c.label}
          </label>
        ))}

      {/* CHECKBOX */}
      {question.question_type === "checkbox" &&
        question.choices?.map((c) => (
          <label
            key={c.id}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={value?.includes(c.value)}
              onChange={(e) => {
                const next = value ? [...value] : [];

                if (e.target.checked) {
                  next.push(c.value);
                } else {
                  const idx = next.indexOf(c.value);
                  if (idx > -1) next.splice(idx, 1);
                }

                onChange(question, next);
              }}
            />
            {c.label}
          </label>
        ))}
    </div>
  );
}