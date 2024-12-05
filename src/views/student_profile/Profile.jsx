import React from 'react';
import useRead from '../../utils/hooks/useRead';
import StudentProfileDetails from './ProfileDetails';

function StudentProfile() {
  // Fetch the student details using the custom hook
  const { data: studentData, loading, error } = useRead('https://lms.webarchitectslab.com/api/students/66ded51e8fd1e09bdf7916c6');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Student Profile</h2>
      <p>Details of the student are shown below:</p>
      <div className="mt-8">
        <StudentProfileDetails data={studentData} />
      </div>
    </div>
  );
}

export default StudentProfile;
