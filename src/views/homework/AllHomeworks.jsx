import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import { HiOutlineDocumentText } from 'react-icons/hi';

function AllHomeworks() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/homework'); // Replace with your actual API endpoint

  // Define gradient classes
  const gradientClasses = [
    'bg-gradient-to-br from-indigo-600 to-indigo-400',
    'bg-gradient-to-r from-green-600 to-green-400',
    'bg-gradient-to-r from-red-600 to-red-400',
    'bg-gradient-to-r from-amber-600 to-amber-400',
    'bg-gradient-to-r from-blue-600 to-blue-400',
    'bg-gradient-to-r from-purple-600 to-purple-400',
    'bg-gradient-to-r from-cyan-600 to-cyan-400',
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Homeworks</h2>
      <p className="text-gray-600">
        Browse through all the homework assignments.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8">
        {data.map((homework, index) => (
          <Card
            key={homework._id}
            className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md relative overflow-hidden`}
          >
            {/* Block pattern */}
            <div
              className="absolute inset-0 grid grid-cols-4 gap-1 opacity-5"
              style={{ background: `rgba(255, 255, 255, 0.01)` }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white w-full h-full"></div>
              ))}
            </div>

            {/* Icon */}
            <div className="absolute top-4 right-4 text-4xl text-white opacity-70">
              <HiOutlineDocumentText />
            </div>

            {/* Card content */}
            <div className="mt-4 text-left relative z-10">
              <h2 className="text-white drop-shadow-lg text-xl font-semibold">
                {homework.title}
              </h2>
              <h5 className="text-white mt-1 opacity-80 font-medium drop-shadow-lg">
                {homework?.class?.name || 'No Class Assigned'}
              </h5>
              <p className="text-white mt-2 opacity-70">
                {homework.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllHomeworks;
