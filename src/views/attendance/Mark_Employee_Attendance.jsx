import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Select from '@/components/ui/Select';
import useCreate from '../../utils/hooks/useCreate'; // Assuming you have a custom useCreate hook

const { Tr, Th, Td, THead, TBody } = Table;

const MarkEmployeeAttendance = () => {
  const [employeeType, setEmployeeType] = useState('');
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [errors, setErrors] = useState({});

  const { create, loading: submitting, error: createError } = useCreate('https://lms.webarchitectslab.com/api/eattendance');

  // Fetch employees based on selected employee type
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!employeeType) return;

      try {
        const { data } = await axios.get(
          `https://lms.webarchitectslab.com/api/employees/search?employeeType=${employeeType}`
        );
        setEmployees(data);
        setAttendance(data.map((employee) => ({ employee: employee._id, status: '' }))); // Initialize attendance state
        setErrors((prev) => ({ ...prev, employees: '' })); // Clear employeeType error
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [employeeType]);

  // Handle employeeType selection
  const handleEmployeeTypeChange = (type) => {
    setEmployeeType(type);
    setEmployees([]);
    setAttendance([]);
    setErrors({}); // Clear errors
  };

  // Handle status change for an employee
  const handleStatusChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate employee attendance
    const invalidAttendance = attendance.some((entry) => !entry.status);
    if (invalidAttendance) {
      newErrors.attendance = 'Please mark attendance for all employees.';
    }

    // Set errors if any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit attendance data
    const postData = { attendance };
    await create(postData); // Using the custom hook to handle the submission
    setEmployees([]);
    setAttendance([]);
  };

  return (
    <div>
      <h2>Mark Employee Attendance</h2>
      <p>Select the type of employees and mark their attendance below.</p>

      {/* Employee Type Selection */}
      <Card className="mt-4">
        <h5>Select Employee Type</h5>
        <Select
          placeholder="Select Employee Type"
          options={[
            { value: 'Teacher', label: 'Teacher' },
            { value: 'Admin', label: 'Admin' },
            { value: 'Support Staff', label: 'Support Staff' },
          ]}
          onChange={(option) => handleEmployeeTypeChange(option.value)}
          className="mt-2"
        />
        {errors.employees && <p className="text-red-500 text-xs mt-1">{errors.employees}</p>}
      </Card>

      {/* Employee Attendance Form */}
      {employees.length > 0 ? (
        <Card className="mt-8">
          <h5>Employee Attendance Form</h5>
          <form className="grid grid-cols-1 mt-6 gap-6" onSubmit={handleSubmit}>
            <Table>
              <THead>
                <Tr>
                  <Th>#</Th>
                  <Th>Employee Name</Th>
                  <Th>Designation</Th>
                  <Th>Status</Th>
                </Tr>
              </THead>
              <TBody>
                {employees.map((employee, index) => (
                  <Tr key={employee._id}>
                    <Td>{index + 1}</Td>
                    <Td>{employee.name}</Td>
                    <Td>{employee.employeeType}</Td>
                    <Td>
                      <Select
                        placeholder="Select Status"
                        options={[
                          { value: 'Present', label: 'Present' },
                          { value: 'Absent', label: 'Absent' },
                          { value: 'Leave', label: 'Leave' },
                        ]}
                        onChange={(option) => {
                          handleStatusChange(index, option.value);
                          setErrors((prev) => ({ ...prev, attendance: '' })); // Clear attendance error
                        }}
                        className="mt-1.5"
                      />
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
            {errors.attendance && <p className="text-red-500 text-xs mt-1">{errors.attendance}</p>}

            {/* Submit Button */}
            <div className="mt-6">
              <Button loading={submitting} variant="twoTone" className="w-full" type="submit">
                Submit Attendance
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        employeeType &&
        !employees.length && (
          <p className="mt-6 text-gray-600">No employees found for the selected type.</p>
        )
      )}
    </div>
  );
};

export default MarkEmployeeAttendance;
