import React, { useState } from 'react';
import Select from '@/components/ui/Select';
import DatePicker from '@/components/ui/DatePicker';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import useRead from '../../utils/hooks/useRead';
import { format } from 'date-fns'; // For formatting the date

const { Tr, Th, Td, THead, TBody } = Table;

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [formData, setFormData] = useState({
    classId: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch classes data
  const { data: classes = [] } = useRead('https://lms.webarchitectslab.com/api/classes');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.classId) newErrors.classId = 'Class is required.';
    if (!formData.date) newErrors.date = 'Date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const fetchAttendance = async () => {
    setLoading(true); // Start loading

    // Format date to ISO 8601 (YYYY-MM-DD)
    const formattedDate = format(new Date(formData.date), 'yyyy-MM-dd');

    const url = `https://lms.webarchitectslab.com/api/attendance/${formData.classId}?date=${formattedDate}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }
      const data = await response.json();
      setAttendanceRecords(data.attendance); // Store attendance data
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setAttendanceRecords([]); // Optionally clear the records in case of an error
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetchAttendance();
    }
  };

  return (
    <div>
      <h2>View Attendance</h2>
      <Card className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1.5">Class</label>
            <Select
              placeholder="Select Class"
              options={classes.map((classItem) => ({
                value: classItem._id,
                label: classItem.name,
              }))}
              onChange={(option) => handleInputChange('classId', option.value)}
              className="mt-1.5"
            />
            {errors.classId && <p className="text-red-500">{errors.classId}</p>}
          </div>
          <div className="mb-4">
            <label className="mb-1.5">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => handleInputChange('date', date)}
              className="mt-1.5"
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>
          <Button type="submit" variant="twoTone" className="mt-4">
            View Attendance
          </Button>
        </form>

        {/* Display Attendance Records */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          attendanceRecords?.length > 0 && (
            <div className="mt-12">
              <h5 className="mb-5">Attendance Records</h5>
              <Table>
                <THead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Student Name</Th>
                    <Th>Father Name</Th>
                    <Th>Status</Th>
                  </Tr>
                </THead>
                <TBody>
                  {attendanceRecords.map((record) => (
                    <Tr key={record._id}>
                      <Td>{new Date(formData.date).toLocaleDateString()}</Td>
                      <Td>{record.student.studentDetails.name}</Td>
                      <Td>{record.student.fatherDetails.name}</Td>
                      <Td>{record.status}</Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </div>
          )
        )}
      </Card>
    </div>
  );
};

export default ViewAttendance;
