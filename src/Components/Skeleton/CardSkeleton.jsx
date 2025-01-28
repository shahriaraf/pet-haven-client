import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-40 mb-20">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-4 border border-gray-300 rounded-2xl shadow-lg bg-white"
        >
          <Skeleton height={180} width="100%" borderRadius={12} />
          <div className="mt-4">
            <Skeleton height={20} width="70%" />
          </div>
          <div className="mt-2">
            <Skeleton height={15} width="50%" />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Skeleton height={30} width="40%" />
            <Skeleton height={30} width="30%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
