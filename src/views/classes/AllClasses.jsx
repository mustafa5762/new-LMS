import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import { FaBook, FaChalkboardTeacher, FaCode, FaLanguage, FaFlask, FaMusic, FaPaintBrush } from 'react-icons/fa';

function AllSubjects() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/classes'); // Replace with your actual API endpoint

  // Define gradient classes and icons
  const gradientClasses = [
    'bg-gradient-to-br from-indigo-600 to-indigo-400',
    'bg-gradient-to-r from-green-600 to-green-400',
    'bg-gradient-to-r from-red-600 to-red-400',
    'bg-gradient-to-r from-amber-600 to-amber-400',
    'bg-gradient-to-r from-blue-600 to-blue-400',
    'bg-gradient-to-r from-purple-600 to-purple-400',
    'bg-gradient-to-r from-cyan-600 to-cyan-400',
  ];

  const subjectIcons = [
    <FaBook />,
    <FaChalkboardTeacher />,
    <FaCode />,
    <FaLanguage />,
    <FaFlask />,
    <FaMusic />,
    <FaPaintBrush />,
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Classes</h2>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8">
        {data.map((classe, index) => (
          <Card
            key={classe._id}
            className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md relative overflow-hidden`}
          >
            {/* Block pattern */}
            <div
              className="absolute inset-0 grid grid-cols-4  gap-1 opacity-5"
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
              {subjectIcons[index % subjectIcons.length]}
            </div>

            {/* Card content */}
            <div className="mt-4 text-left relative z-10">
              <h2 className="text-white drop-shadow-lg text-xg font-semibold">
                {classe.name}
              </h2>
              <h5 className="text-white mt-1 opacity-80 font-medium drop-shadow-lg">
                {classe?.employee?.name}
              </h5>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllSubjects;
