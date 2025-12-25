export default function page() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div>
            <h2 className="font-semibold text-lg">Daniel Albert Agoya</h2>
            <p className="text-sm text-gray-500">
              Track: Track XYZ
            </p>
          </div>
        </div>

        <button className="text-blue-600 font-medium text-sm">
          View Track
        </button>
      </div>

      {/* Admin Dashboard */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          Admin Dashboard
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Info label="Account Name" value="Kilimo Hakika Limited" />
          <Info label="Plan" value="Workplace Pro" />
          <Info label="Total Users" value="7" />
          <Info label="Cloud Storage" value="0 MB of 50 GB" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            "Add Licenses",
            "Manage Plan",
            "Manage Users",
            "Account Settings",
            "Usage Reports",
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
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
