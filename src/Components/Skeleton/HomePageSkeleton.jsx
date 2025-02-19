import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomePageSkeleton = () => {
  return (
    <div className="space-y-8 px-4 sm:px-8 lg:px-16 mt-16">
      {/* Banner Section Skeleton */}
      <div className="h-64 sm:h-80 rounded-lg overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Card Section Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 border rounded-2xl shadow-lg"
          >
            <Skeleton height={180} width="100%" borderRadius={12} />
            <div className="mt-4 space-y-2">
              <Skeleton height={20} width="70%" />
              <Skeleton height={15} width="50%" />
            </div>
          </div>
        ))}
      </div>

      {/* Normal Section Skeleton */}
      <div className="space-y-4">
        <Skeleton height={30} width="60%" />
        <Skeleton height={15} width="80%" />
        <Skeleton height={15} width="90%" />
        <Skeleton height={15} width="75%" />
      </div>
    </div>
  );
};

export default HomePageSkeleton;
