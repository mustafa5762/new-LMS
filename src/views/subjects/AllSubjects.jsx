import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';

function AllSubjects() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/subjects'); // Replace with your actual API endpoint

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
      <h2>All Subjects</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8'>
        {data.map((subject, index) => (
          <Card 
            key={subject._id} 
            className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md`}
          >
            <div className="mt-4 text-left">
              <h2 className="text-white drop-shadow-2xl">{subject.name}</h2>
              <h5 className="text-white mt-1 opacity-80 font-medium drop-shadow-2xl">{subject?.teacher?.name}</h5>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllSubjects;
