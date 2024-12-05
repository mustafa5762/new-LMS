import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import useCreate  from '../../utils/hooks/useCreate'; // Assuming you have a custom useCreate hook

const { Tr, Th, Td, THead, TBody } = Table;

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(true);

  const { create, loading: submitting, error: createError } = useCreate('https://lms.webarchitectslab.com/api/attendance'); // Use your useCreate hook

  // Fetch classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get('https://lms.webarchitectslab.com/api/classes');
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  // Fetch students when a class is selected
  const fetchStudents = async (classId) => {
    try {
      const { data } = await axios.get(`https://lms.webarchitectslab.com/api/students?classId=${classId}`);
      setStudents(data);
      setAttendance(data.map((student) => ({ student: student._id, status: '' }))); // Reset attendance state
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate class selection
    if (!selectedClass) {
      newErrors.class = 'Class selection is required.';
    }

    // Validate student attendance
    const invalidAttendance = attendance.some((entry) => !entry.status);
    if (invalidAttendance) {
      newErrors.attendance = 'Please mark attendance for all students.';
    }

    // Set errors if any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit attendance data
    const postData = { classId: selectedClass, attendance };
    await create(postData); // Using the custom hook to handle the submission
    setSelectedClass('');
    setStudents([]);
    setAttendance([]);
  };

  // Handle status change for a student
  const handleStatusChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <p>Select a class and mark attendance for each student.</p>
      <Card className="mt-8">
        <h5>Attendance Form</h5>
        <form className="grid grid-cols-1 mt-6 gap-6" onSubmit={handleSubmit}>
          {/* Class Selection */}
          <div>
            <label>Class</label>
            <Select
              placeholder="Select Class"
              options={classes.map((classItem) => ({
                value: classItem._id,
                label: classItem.name,
              }))}
              onChange={(option) => {
                setSelectedClass(option.value);
                fetchStudents(option.value);
                setErrors((prev) => ({ ...prev, class: '' })); // Clear class error
              }}
              className="mt-1.5"
              isLoading={loadingClasses}
            />
            {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
          </div>

          {/* Students Table */}
          {students.length > 0 && (
            <Table>
              <THead>
                <Tr>
                  <Th>#</Th>
                  <Th>Student Name</Th>
                  <Th>Father Name</Th>
                  <Th>Status</Th>
                </Tr>
              </THead>
              <TBody>
                {students.map((student, index) => (
                  <Tr key={student._id}>
                    <Td>{index + 1}</Td>
                    <Td>{student.studentDetails.name}</Td>
                    <Td>{student.fatherDetails.name}</Td>
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
          )}
          {errors.attendance && <p className="text-red-500 text-xs mt-1">{errors.attendance}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <Button loading={submitting} variant="twoTone" className="w-full" type="submit">
              Submit Attendance
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Attendance;
