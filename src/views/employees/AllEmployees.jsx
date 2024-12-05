import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function AllEmployees() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/employees'); // Replace with your actual API endpoint

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Employees</h2>
      <p>Enter the employee details below:</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8'>
        {data.map((employee) => (
          <Card 
            key={employee._id} 
          >
            <div className="flex justify-center">
                <img className='rounded-full' src="/img/avatars/male.png" alt="" />
            </div>
            <div className="mt-4 text-center">
                <h5>{employee.name}</h5>
                <p>{employee.employeeType}</p>
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

export default AllEmployees;
