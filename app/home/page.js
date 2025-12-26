"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEnrollment, getMyLearningProgress } from "../app-redux/features/AppData/appSlice";
import { FormatDate } from "../../constants/utils";
import AILiteracyOutcome from "./pagecomponents/AILiteracyOutcome";

export default function page() {
  let dispatch = useDispatch();
  let authData = useSelector((state) => state?.authData);
  let appData = useSelector((state) => state?.appData);

  let { loginState } = authData;
  const firstName = loginState?.data?.user?.first_name || "";
  const lastName = loginState?.data?.user?.last_name || "";

  const initials = (firstName[0] || "") + (lastName[0] || "");
  let { myEnrolmentState ,learningProgressState} = appData;
  let myEnrolmentStateData = myEnrolmentState?.data[0] || null;
  let learningProgressStateData = learningProgressState?.data[0] || null;


  useEffect(() => {
    // get my enrolment
    dispatch(getMyEnrollment());
    dispatch(getMyLearningProgress());

  }, []);

  return (
    <div className="space-y-6">
      {/* Profile / Track Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">
            {initials || "?"}
          </div>

          {/* {
            JSON?.stringify(learningProgressStateData)
          } */}

          <div>
            <h2 className="font-semibold text-lg">
              {loginState?.data?.user?.first_name}{" "}
              {loginState?.data?.user?.last_name}
            </h2>
            {/* ✅ Email */}
            <p className="text-sm text-gray-500">
              {loginState?.data?.user?.email}
            </p>

            <p className="text-sm text-gray-500">
              Enrolled Track: {myEnrolmentStateData?.track?.name || "-"}
            </p>
            <p className="text-xs text-gray-400">
              {myEnrolmentStateData?.cohort?.name || "-"} ·{" "}
              {FormatDate(myEnrolmentStateData?.cohort?.start_date,false)} –{" "}
              {FormatDate(myEnrolmentStateData?.cohort?.end_date,false) || "-"}
            </p>
          </div>
        </div>

        <button className="text-green-600 font-medium text-sm hover:underline">
          View Track
        </button>
      </div>

      <AILiteracyOutcome learningProgressStateData={learningProgressStateData} />

      {/* Track Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Track Overview</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Info
            label="Track Name"
            className="text-purple-600"
            value={myEnrolmentStateData?.track?.name || "-"}
          />
          <Info
            label="Cohort"
            className="text-yellow-600"
            value={myEnrolmentStateData?.cohort?.name || "-"}
          />
          <Info
            label="Enrolled Trainees"
            className="text-blue-600"
            value={myEnrolmentStateData?.track?.enrolled_trainees || "-"}
          />
          <Info
            label="Status"
            className="text-green-600"
            value={myEnrolmentStateData ? "Active" : "-"}
          />
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

      {/* Upcoming Meeting */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Meeting</h3>

        {myEnrolmentStateData?.track?.meeting ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {myEnrolmentStateData?.track?.meeting?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Wednesday · 10:00 AM – 12:00 PM
                </p>
              </div>

              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition">
                Join Meeting
              </button>
            </div>
          </>
        ) : (
          <>
            <p>No upcoming meeting</p>
          </>
        )}
      </div>

      {/* 🎥 Motivational Video Section */}
      <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Message */}
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Grow Your Skills. Transform Agriculture.
            </h3>
            <p className="text-green-100 text-sm leading-relaxed">
              Watch how digital innovation is empowering farmers and
              agripreneurs across Africa. Your journey in modern agriculture
              starts here.
            </p>
          </div>

          {/* Video */}
          <div className="w-full aspect-video bg-green-700 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Replace src with real video later */}
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/581Kx8wzTMc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, className = "" }) {
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
      <p className={`font-medium text-sm ${className}`}>{value}</p>
    </div>
  );
}
