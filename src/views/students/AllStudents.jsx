import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function AllStudents() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/students'); // Replace with your actual API endpoint

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Students</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8'>
        {data.map((student) => (
          <Card 
            key={student._id} 
          >
            <div className="flex justify-center">
                <img className='rounded-full' src="/img/avatars/male.png" alt="" />
            </div>
            <div className="mt-4 text-center">
                <h5>{student.studentDetails.name}</h5>
                <p>{student.studentDetails.class.name}</p>
            </div>
            <div className="mt-6">
                <Button variant="twoTone" className="w-full">
                    View Details
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllStudents;
