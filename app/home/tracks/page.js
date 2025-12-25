import React from "react";

const tracks = [
  {
    id: "1a2b3c4d-0001-0000-0000-000000000001",
    name: "Economic Pathways",
    short_name: "EconPath",
    description: "Learn key concepts of economics, financial literacy, and pathways to generate sustainable income.",
    track_image: "https://img.icons8.com/fluency/48/000000/economy.png",
    created_at: "2025-12-25T08:30:00.000+03:00",
    updated_at: "2025-12-25T08:30:00.000+03:00"
  },
  {
    id: "1a2b3c4d-0002-0000-0000-000000000002",
    name: "Digital Agric",
    short_name: "DigAgric",
    description: "Gain hands-on skills in modern digital agriculture, precision farming, and technology-driven crop management.",
    track_image: "https://img.icons8.com/fluency/48/000000/tractor.png",
    created_at: "2025-12-25T08:31:00.000+03:00",
    updated_at: "2025-12-25T08:31:00.000+03:00"
  },
  {
    id: "1a2b3c4d-0003-0000-0000-000000000003",
    name: "Gig Economy",
    short_name: "GigEco",
    description: "Explore opportunities in the gig economy, freelancing, and flexible digital work for income generation.",
    track_image: "https://img.icons8.com/fluency/48/000000/freelancer.png",
    created_at: "2025-12-25T08:32:00.000+03:00",
    updated_at: "2025-12-25T08:32:00.000+03:00"
  },
  {
    id: "1a2b3c4d-0004-0000-0000-000000000004",
    name: "Creative Economy",
    short_name: "CreatEco",
    description: "Develop creative skills in arts, media, design, and content creation to thrive in the creative sector.",
    track_image: "https://img.icons8.com/fluency/48/000000/creativity.png",
    created_at: "2025-12-25T08:33:00.000+03:00",
    updated_at: "2025-12-25T08:33:00.000+03:00"
  },
  {
    id: "1a2b3c4d-0005-0000-0000-000000000005",
    name: "IT Technician",
    short_name: "ITTech",
    description: "Acquire technical IT skills, including hardware, software, networking, and troubleshooting for career growth.",
    track_image: "https://img.icons8.com/fluency/48/000000/computer-support.png",
    created_at: "2025-12-25T08:34:00.000+03:00",
    updated_at: "2025-12-25T08:34:00.000+03:00"
  }
];

export default function TracksPage() {
  return (
    <div className="px-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Available Tracks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col p-6"
          >
            {/* Track Info with small icon */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={track.track_image}
                alt={track.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{track.name}</h2>
                <p className="text-gray-500">{track.description}</p>
              </div>
            </div>

            {/* Select Button */}
            <button
              className="mt-auto bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Select Track
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}