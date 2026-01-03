"use client";

import Link from "next/link";
import NavBar from './NavBar'
import {
  GraduationCap,
  ClipboardCheck,
  Video,
  Award,
  BarChart3,
  LogIn,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar/>
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn. Participate. Grow.
            </h1>

            <p className="mt-4 text-green-100 text-lg">
              A digital learning platform designed to support training
              programmes, track progress, and measure impact through
              structured surveys.
            </p>

            <div className="mt-8">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-100"
              >
                <LogIn className="w-5 h-5" />
                Login to Your Account
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 rounded-2xl p-8">
              <ul className="space-y-4 text-green-50 text-sm">
                <li>✔ Enrol in learning tracks</li>
                <li>✔ Attend online meetings</li>
                <li>✔ Complete baseline & endline surveys</li>
                <li>✔ Track progress & earn certificates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            What You Can Do
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<GraduationCap />}
              title="Training Tracks"
              desc="Join structured learning tracks designed to build practical and digital skills."
            />

            <Feature
              icon={<Video />}
              title="Live Sessions"
              desc="Participate in scheduled meetings and training sessions."
            />

            <Feature
              icon={<ClipboardCheck />}
              title="Surveys"
              desc="Complete baseline and endline surveys to reflect on your learning journey."
            />

            <Feature
              icon={<Award />}
              title="Certificates"
              desc="Receive certificates upon successful completion of your training."
            />

            <Feature
              icon={<BarChart3 />}
              title="Progress Tracking"
              desc="Monitor your participation, attendance, and learning outcomes."
            />
          </div>
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold">
            Why This Platform Matters
          </h3>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            This platform helps learners actively engage in training,
            reflect on their progress through surveys, and demonstrate
            their growth with clear outcomes and certification.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>• Structured learning paths</div>
            <div>• Evidence-based progress tracking</div>
            <div>• Recognised completion certificates</div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-semibold">
          Ready to Begin Your Journey?
        </h2>

        <p className="mt-3 text-green-100">
          Log in to access your dashboard and learning activities.
        </p>

        <div className="mt-6">
          <Link
            href="/login"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-100"
          >
            Login
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Training & Learning Platform</p>

          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
            <Link href="/support" className="hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600">
        {icon}
      </div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}