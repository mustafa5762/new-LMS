import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import { FaExclamationCircle, FaClipboardList, FaQuestionCircle } from 'react-icons/fa';

function AllComplaints() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/query-complaints'); // Replace with your actual API endpoint

  // Define gradient classes and icons
  const gradientClasses = [
    'bg-gradient-to-br from-red-600 to-red-400',
    'bg-gradient-to-r from-blue-600 to-blue-400',
    'bg-gradient-to-r from-green-600 to-green-400',
    'bg-gradient-to-r from-purple-600 to-purple-400',
    'bg-gradient-to-r from-indigo-600 to-indigo-400',
  ];

  const complaintIcons = [
    <FaExclamationCircle />,
    <FaClipboardList />,
    <FaQuestionCircle />,
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Complaints</h2>
      <p className="text-gray-600">
        Browse through the complaints submitted by users.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8">
        {data.map((complaint, index) => (
          <Card
            key={complaint._id}
            className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md relative overflow-hidden`}
          >
            {/* Block pattern */}
            <div
              className="absolute inset-0 grid grid-cols-4 gap-1 opacity-5"
              style={{
                background: `rgba(255, 255, 255, 0.01)`,
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white w-full h-full"></div>
              ))}
            </div>

            {/* Icon */}
            <div className="absolute top-4 right-4 text-4xl text-white opacity-70">
              {complaintIcons[index % complaintIcons.length]}
            </div>

            {/* Card content */}
            <div className="mt-4 text-left relative z-10">
              <h2 className="text-white drop-shadow-lg text-lg font-semibold">
                {complaint.subject.name}
              </h2>
              <p className="text-white mt-1 opacity-80 font-medium drop-shadow-lg">
                {complaint.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllComplaints;
