export function TrackSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col p-10 animate-pulse w-full">
      
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-gray-200 rounded-full" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      {/* Button */}
      
      <div className="mt-auto h-10 bg-gray-200 rounded-lg" />
    </div>
  );
}