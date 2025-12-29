"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import {
    getMySurveyResponses,
  getSurveyBySlug,
  submitSurveyResponses,
} from "../../../app-redux/features/AppData/appSlice";
import { FormatDate } from "../../../../constants/utils";

export default function SurveyDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { data: survey, loading, error } = useSelector(
    (state) => state.appData.surveyBySlugState
  );

  const myResponsesState = useSelector(
  (state) => state.appData.mySurveyResponsesState
);

const myResponses = myResponsesState?.data;

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
    dispatch(getMySurveyResponses({ slug }));

    }
  }, [dispatch, slug]);

  useEffect(() => {
  if (!myResponses?.answers?.length) return;
  console.log(0)

  const mapped = {};

  myResponses.answers.forEach((ans) => {
    mapped[ans.question_id] = {
      question_id: ans.question_id,

      // checkbox → array
      value: ans.selected_choices?.length
        ? ans.selected_choices.map((c) => c.value)
        : ans.selected_choice
        ? ans.selected_choice.value
        : ans.answer_text ?? "",
    };
  });

  console.log(mapped)

  setAnswers(mapped);
}, [myResponses]);

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
        slug: slug,
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

      {/* {
        JSON.stringify(myResponses)
      } */}
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

      {
        myResponses?.id &&
         <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
          <CheckCircle className="w-4 h-4" />
          This survey was submitted on {FormatDate(myResponses?.submitted_at,true)}
        </div>
      }

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
          disabled={myResponses?.id}
         
            key={q.id}
            question={q}
            value={answers[q.id]?.value}
            onChange={updateAnswer}
            index={index}
          />
        ))}
      </div>

      {/* Actions */}

      {
         !myResponses?.id &&
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
      }
     
    </div>
  );
}

/* ======================================================
   QUESTION RENDERER (ALL TYPES SUPPORTED)
====================================================== */
function QuestionRenderer({
  question,
  value,
  onChange,
  index,
  disabled = false,
}) {
  return (
    <div
      className={`space-y-2 ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
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
          disabled={disabled}
          onChange={(e) =>
            !disabled && onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        />
      )}

      {/* TEXTAREA */}
      {question.question_type === "textarea" && (
        <textarea
          value={value || ""}
          disabled={disabled}
          onChange={(e) =>
            !disabled && onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
          rows={4}
        />
      )}

      {/* NUMBER */}
      {question.question_type === "number" && (
        <input
          type="number"
          value={value || ""}
          disabled={disabled}
          onChange={(e) =>
            !disabled && onChange(question, e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        />
      )}

      {/* RADIO */}
      {question.question_type === "radio" &&
        question.choices?.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-2 text-sm ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              checked={value === c.value}
              disabled={disabled}
              onChange={() =>
                !disabled && onChange(question, c.value)
              }
            />
            {c.label}
          </label>
        ))}

      {/* CHECKBOX */}
      {question.question_type === "checkbox" &&
        question.choices.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-2 text-sm ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              disabled={disabled}
              checked={
                Array.isArray(value) &&
                value.includes(c.value)
              }
              onChange={(e) => {
                if (disabled) return;

                const next = Array.isArray(value)
                  ? [...value]
                  : [];

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