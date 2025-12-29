"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getMyBaselineSurvey,
//   submitBaselineSurvey,
// } from "@/app/app-redux/features/AppData/appSlice";
import { Loader2, CheckCircle } from "lucide-react";
import { getMyBaselineSurvey, submitBaselineSurvey } from "../../../app-redux/features/AppData/appSlice";

/* ===========================
   KENYA COUNTIES
=========================== */
const KENYA_COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang’a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

export default function BaselineSurveyPage() {
  const dispatch = useDispatch();

  /* ===========================
     REDUX STATE
  =========================== */
  const { myBaselineSurveyState } = useSelector(
    (state) => state.appData
  );

  const { loading, error, data } = myBaselineSurveyState;

  /* ===========================
     LOCAL FORM STATE
  =========================== */
  const [form, setForm] = useState({
    consent_given: false,
    email: "",
    phone_number: "",
    age: "",
    gender: "",
    county: "",
    primary_device: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  /* ===========================
     FETCH BASELINE
  =========================== */
  useEffect(() => {
    dispatch(getMyBaselineSurvey());
  }, [dispatch]);

  /* ===========================
     PREPOPULATE FORM
  =========================== */
  useEffect(() => {
    if (data) {
      setForm({
        consent_given: data.consent_given ?? false,
        email: data.email ?? "",
        phone_number: data.phone_number ?? "",
        age: data.age ?? "",
        gender: data.gender ?? "",
        county: data.county ?? "",
        primary_device: data.primary_device ?? "",
      });
    }
  }, [data]);

  /* ===========================
     HANDLERS
  =========================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    dispatch(submitBaselineSurvey(form))
      .unwrap()
      .then(() => {
        setSuccessMessage("Baseline survey saved successfully");
      });
  };

  /* ===========================
     UI
  =========================== */
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">
          Baseline Survey
        </h1>
        <p className="text-sm text-gray-500">
          Please confirm or update your baseline information
        </p>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* ================= SUCCESS ================= */}
      {successMessage && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
          <CheckCircle className="w-4 h-4" />
          {successMessage}
        </div>
      )}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-5"
      >
        {/* Consent */}
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent_given"
            checked={form.consent_given}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <span>
            I consent to the collection and use of my data for programme purposes.
          </span>
        </label>

        {/* Email */}
        <Field
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
        />

        {/* Phone */}
        <Field
          label="Phone Number"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
        />

        {/* Age */}
        <Field
          label="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          type="number"
        />

        {/* Gender */}
        <Select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />

        {/* County (Dropdown) */}
        <Select
          label="County"
          name="county"
          value={form.county}
          onChange={handleChange}
          options={KENYA_COUNTIES}
        />

        {/* Device */}
        <Field
          label="Primary Device"
          name="primary_device"
          value={form.primary_device}
          onChange={handleChange}
          placeholder="e.g Smartphone Samsung, Laptop HP"
        />

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===========================
   REUSABLE INPUTS
=========================== */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}