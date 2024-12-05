import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';

function SingleClassTimetable() {
  // Replace with the specific class ID
  const classId = '66ddcca80496a4e64a857c3d';
  const { data: timetables, loading: loadingTimetables, error: timetablesError } = useRead(
    `https://lms.webarchitectslab.com/api/timetable/specific?classId=${classId}`
  );

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

  if (loadingTimetables) {
    return <p>Loading timetable...</p>;
  }

  if (timetablesError) {
    return <p>Error loading timetable: {timetablesError.message}</p>;
  }

  if (!timetables || timetables.length === 0) {
    return <p>No timetables found for the selected class.</p>;
  }

  return (
    <div>
      <h2>Class Timetable</h2>
      <p>Below is the timetable for your class:</p>

      <div className="grid grid-cols-2 gap-3 lg:gap-6 mt-8">
        {timetables.map((timetable, index) => (
          <Card
            key={timetable._id}
            className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md`}
          >
            <div className="mt-4 text-left">
              <h2 className="text-white drop-shadow-2xl">Subject: {timetable.subject?.name || 'N/A'}</h2>
              <h5 className="text-white mt-1 opacity-80 font-medium drop-shadow-2xl">
                Teacher: {timetable.teacher?.name || 'N/A'}
              </h5>
              <p className="mt-2">Start Time: {timetable.startTime || 'N/A'}</p>
              <p>End Time: {timetable.endTime || 'N/A'}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SingleClassTimetable;
