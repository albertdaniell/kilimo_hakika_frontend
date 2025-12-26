import { FormatDate } from "../../../constants/utils";

export default function AILiteracyOutcome({ learningProgressStateData }) {
  if (!learningProgressStateData) return null;

  const {
    overall_progress,
    overall_progress_level,
    overall_progress_notes,
    completed_topics,
    total_attempts,
    total_time_hours,
    join_date,
    last_study_date,
    learning_period,
  } = learningProgressStateData;

  // 🔹 Progress %
  const progressPercent = `${overall_progress || 0}%`;

  // 🔹 Level-based styling
  const levelStyles = {
    beginner: "bg-yellow-100 text-yellow-800 border-yellow-200",
    basic: "bg-blue-100 text-blue-800 border-blue-200",
    intermediate: "bg-indigo-100 text-indigo-800 border-indigo-200",
    advanced: "bg-green-100 text-green-800 border-green-200",
    ai_ready: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  const outcomeStyle =
    levelStyles[overall_progress_level] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Artificial Intelligence Literacy Progress
        </h3>
        <p className="text-sm text-gray-500">
          A snapshot of your learning journey and engagement in AI concepts.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Overall Progress" value={progressPercent} highlight />
        <Stat label="Completed Topics" value={completed_topics} />
        <Stat label="Total Attempts" value={total_attempts} />
        <Stat label="Time Spent" value={`${total_time_hours} hrs`} />
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <Info label="Joined On" value={FormatDate(join_date)} />
        <Info label="Last Study Date" value={FormatDate(last_study_date)} />
        <Info label="Learning Period" value={learning_period} />
      </div>

      {/* Outcome Message */}
      <div
        className={`border rounded-xl p-4 text-sm font-medium ${outcomeStyle}`}
      >
        {overall_progress_notes}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight
          ? "bg-green-300 text-slate-700 border border-green-400"
          : "bg-gray-50 border border-gray-200"
      }`}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">
        {label}
      </p>
      <p className="text-2xl font-bold mt-1">
        {value}
      </p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </p>
      <p className="font-medium text-sm text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}