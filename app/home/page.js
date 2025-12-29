"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyBaselineSurvey,
  getMyEnrollment,
  getMyLearningProgress,
  registerForMeeting,
} from "../app-redux/features/AppData/appSlice";
import { FormatDate } from "../../constants/utils";
import AILiteracyOutcome from "./pagecomponents/AILiteracyOutcome";
import Link from "next/link";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function page() {
  const dispatch = useDispatch();

  /* ===========================
     REDUX STATE
  =========================== */
  const authData = useSelector((state) => state?.authData);
  const appData = useSelector((state) => state?.appData);

  const { loginState } = authData;
  const {
    myEnrolmentState,
    learningProgressState,
    registerMeetingState,
    myBaselineSurveyState, // ✅ ADDED
  } = appData;

  const myEnrolmentStateData = myEnrolmentState?.data[0] || null;
  const learningProgressStateData = learningProgressState?.data[0] || null;

  /* ===========================
     BASELINE STATUS
  =========================== */
  const baselineCompleted = !!myBaselineSurveyState?.data;

  /* ===========================
     USER INFO
  =========================== */
  const firstName = loginState?.data?.user?.first_name || "";
  const lastName = loginState?.data?.user?.last_name || "";
  const email = loginState?.data?.user?.email || "";
  const initials = (firstName[0] || "") + (lastName[0] || "");

  /* ===========================
     REGISTER MODAL STATE
  =========================== */
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [registerMeetingError, set_registerMeetingError] = useState(null);
  const [registerMeetingSuccess, set_registerMeetingSuccess] = useState(null);

  /* ===========================
     EFFECTS
  =========================== */
  useEffect(() => {
    dispatch(getMyEnrollment());
    dispatch(getMyLearningProgress());
    // dispatch(getMyBaselineSurvey())
  }, [dispatch]);

  /* ===========================
     REGISTER HANDLERS
  =========================== */
  const openRegisterModal = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRegisterModal(true);
    set_registerMeetingSuccess(null);
    set_registerMeetingError(null);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    setSelectedMeeting(null);
  };

  const submitRegistration = () => {
    if (!selectedMeeting) return;

    dispatch(
      registerForMeeting({
        meeting_id: selectedMeeting.id,
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(getMyEnrollment());

        if (res?.detail) {
          set_registerMeetingSuccess({
            message: res.detail,
            join_url: res.join_url,
          });
        }
      })
      .catch((err) => {
        console.log({ err });
        set_registerMeetingError(
          err?.detail || err || "Error registering for your meeting, try again."
        );
      });
  };

  const isRegistering = registerMeetingState?.loading;
  const registerSuccess = registerMeetingState?.data?.detail;

  return (
    <div className="space-y-6">
      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">
            {initials || "?"}
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              {firstName} {lastName}
            </h2>

            <p className="text-sm text-gray-500">{email}</p>

            <p className="text-sm text-gray-500">
              Enrolled Track: {myEnrolmentStateData?.track?.name || "-"}
            </p>

            <p className="text-xs text-gray-400">
              {myEnrolmentStateData?.cohort?.name || "-"} ·{" "}
              {FormatDate(myEnrolmentStateData?.cohort?.start_date, false)} –{" "}
              {FormatDate(myEnrolmentStateData?.cohort?.end_date, false) || "-"}
            </p>
          </div>
        </div>

        <button className="text-green-600 font-medium text-sm hover:underline">
          View Track
        </button>
      </div>

      {/* ================= BASELINE SURVEY STATUS CARD ================= */}
      <div
        className={`rounded-xl p-5 border flex items-center justify-between ${
          baselineCompleted
            ? "bg-green-50 border-green-200"
            : "bg-yellow-50 border-yellow-200"
        }`}
      >
        <div className="flex items-center gap-3">
          {baselineCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          )}

          <div>
            <p className="font-medium">
              Baseline Survey
            </p>
            <p className="text-sm text-gray-600">
              {baselineCompleted
                ? "You have completed the baseline survey"
                : "You have not completed the baseline survey"}
            </p>
          </div>
        </div>

        {!baselineCompleted && (
          <Link
            href="/survey/baseline"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700"
          >
            Complete Survey
          </Link>
        )}
      </div>

      {/* ================= AI LITERACY ================= */}
      <AILiteracyOutcome
        learningProgressStateData={learningProgressStateData}
      />

      {/* ================= TRACK OVERVIEW ================= */}

      {/* ================= TRACK OVERVIEW ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Track Overview</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Info
            label="Track Name"
            value={myEnrolmentStateData?.track?.name || "-"}
          />
          <Info
            label="Cohort"
            value={myEnrolmentStateData?.cohort?.name || "-"}
          />
          <Info
            label="Enrolled Trainees"
            value={myEnrolmentStateData?.track?.enrolled_trainees || "-"}
          />
          <Info label="Status" value={myEnrolmentStateData ? "Active" : "-"} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            "Join Meeting",
            "View Cohort",
            "Learning Materials",
            "Announcements",
            "Support",
          ].map((item) => (
            <button
              key={item}
              className="border rounded-xl p-4 text-sm font-medium hover:bg-gray-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ================= UPCOMING MEETING ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold">Upcoming Meeting</h3>

        <p className="mb-4 text-sm text-slate-500">
          {myEnrolmentStateData?.track?.registered_trainees_count} trainees will
          be in attendance
        </p>

        {myEnrolmentStateData?.track?.meeting ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {myEnrolmentStateData.track.meeting.name}
              </p>
              <p className="text-sm text-gray-500">
                {FormatDate(
                  myEnrolmentStateData.track.meeting.start_time,
                  true
                )}
              </p>
            </div>

            {!myEnrolmentStateData.track.has_registered_for_meeting ? (
              <button
                onClick={() =>
                  openRegisterModal(myEnrolmentStateData.track.meeting)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                Register For Meeting
              </button>
            ) : (
              <Link
                target="_blank"
                href={myEnrolmentStateData.track.meeting.json?.start_url}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
              >
                Join Meeting
              </Link>
            )}
          </div>
        ) : (
          <p>No upcoming meeting</p>
        )}
      </div>

      {/* ================= REGISTER MODAL ================= */}
      {showRegisterModal && selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Register for Meeting</h2>

            {registerMeetingSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm space-y-2">
                <p className="text-green-700 font-medium">
                  ✅ {registerMeetingSuccess.message}
                </p>

                {registerMeetingSuccess.join_url && (
                  <p className="text-green-700">
                    🔗 Join link:{" "}
                    <a
                      href={registerMeetingSuccess.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline font-medium hover:text-blue-700"
                    >
                      Click here to join the meeting
                    </a>
                  </p>
                )}

                <p className="text-xs text-green-600">
                  ⚠️ Do not share this link with anyone.
                </p>
              </div>
            )}

            {registerMeetingError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                ❌ {registerMeetingError}
              </div>
            )}

            {registerSuccess && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                <CheckCircle className="w-4 h-4" />
                {registerSuccess}
              </div>
            )}

            <div className="space-y-3 text-sm -p">
              <Info label="Name" value={`${firstName} ${lastName}`} />
              <Info label="Email" value={email} />
              <Info label="Meeting" value={selectedMeeting.name} />
              <Info
                label="Start Time"
                value={FormatDate(selectedMeeting.start_time, true)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={closeRegisterModal}
                disabled={isRegistering}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>

              {!registerSuccess && (
                <button
                  onClick={submitRegistration}
                  disabled={isRegistering}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
                >
                  {isRegistering && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {isRegistering ? "Registering…" : "Register"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= VIDEO SECTION ================= */}
      <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Grow Your Skills. Transform Agriculture.
            </h3>
            <p className="text-green-100 text-sm leading-relaxed">
              Watch how digital innovation is empowering farmers and
              agripreneurs across Africa.
            </p>
          </div>

          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/581Kx8wzTMc"
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   INFO COMPONENT
=========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  );
}
