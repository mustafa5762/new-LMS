import React from 'react';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';

const { Tr, Th, Td, THead, TBody } = Table;

const TeacherAttendanceReport = () => {
  // Dummy data for the past week's attendance
  const attendanceData = [
    { date: '2024-11-23', status: 'Present' },
    { date: '2024-11-24', status: 'Present' },
    { date: '2024-11-25', status: 'Absent' },
    { date: '2024-11-26', status: 'Leave' },
    { date: '2024-11-27', status: 'Present' },
    { date: '2024-11-28', status: 'Present' },
    { date: '2024-11-29', status: 'Absent' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Weekly Attendance Report</h2>
      <p className="text-sm text-gray-600">
        Below is the attendance record for Mustafa Zahid, Employee Type: Teacher, Monthly Salary: $34.
      </p>

      <Card className="mt-8">
        <h5 className="text-xl font-semibold">Attendance Report</h5>
        <Table className="mt-6">
          <THead>
            <Tr>
              <Th>#</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {attendanceData.map((record, index) => (
              <Tr key={record.date}>
                <Td>{index + 1}</Td>
                <Td>{record.date}</Td>
                <Td>{record.status}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
};

export default TeacherAttendanceReport;
