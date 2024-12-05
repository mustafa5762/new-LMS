import React from 'react';
import useRead from '../../utils/hooks/useRead';
import TeacherProfileDetails from './ProfileDetails';

function StudentProfile() {
  // Fetch the student details using the custom hook
  const { data: teacherData, loading, error } = useRead('https://lms.webarchitectslab.com/api/employees/66ddbe508bf8e58d694eb3da');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Teacher Profile</h2>
      <p>Details of the teacher are shown below:</p>
      <div className="mt-8">
        <TeacherProfileDetails data={teacherData} />
      </div>
    </div>
  );
}

export default StudentProfile;
