import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import { FaBullhorn, FaStickyNote, FaRegBell } from 'react-icons/fa';

function AllNotices() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/notices'); // Replace with your actual API endpoint

  // Define gradient classes and icons
  const gradientClasses = [
    'bg-gradient-to-br from-yellow-600 to-yellow-400',
    'bg-gradient-to-r from-orange-600 to-orange-400',
    'bg-gradient-to-r from-teal-600 to-teal-400',
    'bg-gradient-to-r from-pink-600 to-pink-400',
    'bg-gradient-to-r from-gray-600 to-gray-400',
  ];

  const noticeIcons = [
    <FaBullhorn />,
    <FaStickyNote />,
    <FaRegBell />,
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Notices</h2>
      <p className="text-gray-600">
        Stay updated with the latest notices and announcements.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8">
        {data.map((notice, index) => (
          <Card
            key={notice._id}
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
              {noticeIcons[index % noticeIcons.length]}
            </div>

            {/* Card content */}
            <div className="mt-4 text-left relative z-10">
              <h2 className="text-white drop-shadow-lg text-lg font-semibold">
                {notice.noticeTitle}
              </h2>
              <p className="text-white mt-1 opacity-80 font-medium drop-shadow-lg">
                {notice.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllNotices;
