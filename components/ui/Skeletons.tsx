"use client";

interface Props {
  className?: string;
  rounded?: string;
}

export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`shimmer rounded-lg ${className}`} aria-hidden="true" />
  );
}

export function SkeletonCard({ className = "" }: Props) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm ${className}`}
      aria-label="Loading..."
      role="status"
    >
      {/* Avatar */}
      <div className="shimmer w-full aspect-[4/3] rounded-xl mb-4" />
      {/* Name line */}
      <div className="shimmer h-5 w-3/4 rounded-lg mb-2" />
      {/* Sub line */}
      <div className="shimmer h-4 w-1/2 rounded-lg mb-4" />
      {/* Tag pills */}
      <div className="flex gap-2">
        <div className="shimmer h-6 w-16 rounded-full" />
        <div className="shimmer h-6 w-20 rounded-full" />
        <div className="shimmer h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonProfile({ className = "" }: Props) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
      role="status"
      aria-label="Loading profile..."
    >
      {/* Cover */}
      <div className="shimmer h-40 w-full" />
      {/* Body */}
      <div className="p-6 -mt-12">
        <div className="shimmer w-24 h-24 rounded-full border-4 border-white mb-4 shadow" />
        <div className="shimmer h-7 w-48 rounded-lg mb-2" />
        <div className="shimmer h-4 w-32 rounded-lg mb-6" />
        <div className="space-y-3">
          <div className="shimmer h-4 w-full rounded-lg" />
          <div className="shimmer h-4 w-5/6 rounded-lg" />
          <div className="shimmer h-4 w-4/6 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonMatchGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
