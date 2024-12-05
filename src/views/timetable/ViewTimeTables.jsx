import React, { useState } from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

function AllTimetables() {
  const [selectedClass, setSelectedClass] = useState(null);
  const { data: classes, loading: loadingClasses, error: classesError } = useRead('https://lms.webarchitectslab.com/api/classes');
  const { data: timetables, loading: loadingTimetables, error: timetablesError } = useRead(
    selectedClass ? `https://lms.webarchitectslab.com/api/timetable/specific?classId=${selectedClass}` : null
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

  if (loadingClasses) return <p>Loading classes...</p>;
  if (classesError) return <p>Error loading classes: {classesError}</p>;

  return (
    <div>
      <h2>View Timetable by Class</h2>
      <p>Select a class to view its timetable.</p>

      <div className="mt-4">
        <label>Class</label>
        <Select
          name="class"
          placeholder="Select Class"
          options={classes.map((classItem) => ({
            value: classItem._id,
            label: classItem.name,
          }))}
          onChange={(selectedOption) => setSelectedClass(selectedOption.value)}
          className="mt-1.5"
        />
      </div>

      {selectedClass && (
        <div className="mt-8">
          {loadingTimetables ? (
            <p>Loading timetable...</p>
          ) : timetablesError ? (
            <p>Error loading timetable: {timetablesError}</p>
          ) : timetables.length === 0 ? (
            <p>No timetables found for the selected class.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:gap-6 mt-8">
              {timetables.map((timetable, index) => (
                <Card
                  key={timetable._id}
                  className={`${gradientClasses[index % gradientClasses.length]} text-white p-6 rounded-lg shadow-md`}
                >
                  <div className="mt-4 text-left">
                    <h2 className="text-white drop-shadow-2xl">Subject: {timetable.subject?.name}</h2>
                    <h5 className="text-white mt-1 opacity-80 font-medium drop-shadow-2xl">Teacher: {timetable.teacher?.name}</h5>
                    <p className="mt-2">Start Time: {timetable.startTime}</p>
                    <p>End Time: {timetable.endTime}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AllTimetables;
