"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getSurveyInsights } from "@/app/app-redux/features/AppData/appSlice";
import {
  Loader2,
  BarChart3,
  Download,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

export default function SurveyInsightsPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.appData.surveyInsightsState
  );

  useEffect(() => {
    if (slug) {
      dispatch(getSurveyInsights({ slug }));
    }
  }, [dispatch, slug]);

  /* =========================
     RESPONSE TREND DATA
  ========================= */
  const trendData = useMemo(() => {
    if (!data?.responses) return [];

    const grouped = {};

    data.responses.forEach((r) => {
      const date = new Date(r.submitted_at).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }));
  }, [data]);

  /* =========================
     CSV EXPORT
  ========================= */
  const exportCSV = () => {
    if (!data?.responses) return;

    const rows = [];

    rows.push([
      "Survey",
      "User Email",
      "Question",
      "Answer",
      "Submitted At",
    ]);

    data.responses.forEach((resp) => {
      resp.answers.forEach((ans) => {
        const answer =
          ans.answer_text ||
          ans.selected_choice ||
          ans.selected_choices?.join(", ");

        rows.push([
          data.survey.name,
          resp.user?.email || "",
          ans.question_label,
          answer || "",
          resp.submitted_at,
        ]);
      });
    });

    const csvContent = rows
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.survey.slug}-responses.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading insights…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const { survey, questions } = data;

  return (
    <div className="max-w-6xl space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-green-600" />
            {survey.name} – Insights
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Total responses:{" "}
            <strong>{survey.total_responses}</strong>
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* ================= RESPONSE TREND ================= */}
      {trendData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">
            Response Trends
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ================= QUESTIONS ================= */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-xl shadow-sm p-6 space-y-6"
          >
            <div>
              <p className="font-medium">
                {idx + 1}. {q.label}
              </p>

              <p className="text-xs text-gray-500">
                {q.total_answers} responses
              </p>
            </div>

            {/* ================= BAR CHART ================= */}
            {q.options && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={q.options}>
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* ================= PIE (RADIO) ================= */}
            {q.question_type === "radio" && q.options && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={q.options}
                      dataKey="count"
                      nameKey="label"
                      outerRadius={90}
                      label
                    >
                      {q.options.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* ================= TEXT COUNTS (ALL OPTIONS) ================= */}
            {q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {q.options.map((opt) => (
                  <div
                    key={opt.label}
                    className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-gray-700">
                      {opt.label}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {opt.count}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* ================= TEXT RESPONSES ================= */}
            {q.responses && (
              <div className="space-y-1 text-sm text-gray-700">
                {q.responses.slice(0, 5).map((r, i) => (
                  <p key={i} className="italic">
                    “{r}”
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}