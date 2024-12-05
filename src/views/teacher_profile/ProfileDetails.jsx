import React from 'react';
import Card from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineMail,
} from 'react-icons/hi';

function TeacherProfileDetails({ data }) {
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <Loading loading={true} />
      </div>
    );
  }

  const { name, phoneNumber, employeeType, cnic, joiningDate, monthlySalary, otherInfo } = data;

  return (
    <Card>
      <div>
        <h3>{name}</h3>
        <p className="mt-1">Employee Type: {employeeType}</p>
        <p className="mt-1">Monthly Salary: ${monthlySalary}</p>

        <div className="my-5 h-px w-full bg-neutral-300"></div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2">
            <HiOutlinePhone className="text-lg" />
            <p>{phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineMail className="text-lg" />
            <p>{otherInfo.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineLocationMarker className="text-lg" />
            <p>{otherInfo.lastAddress}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineCalendar className="text-lg" />
            <p><strong>Joining Date:</strong> {new Date(joiningDate).toDateString()}</p>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-neutral-300"></div>

        <div className="space-y-5">
          <h4>Other Information</h4>
          <p><strong>Father's Name:</strong> {otherInfo.fatherName}</p>
          <p><strong>Gender:</strong> {otherInfo.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(otherInfo.dateOfBirth).toDateString()}</p>
          <p><strong>CNIC:</strong> {cnic}</p>
          <p><strong>Blood Group:</strong> {otherInfo.bloodGroup}</p>
          <p><strong>Religion:</strong> {otherInfo.religion}</p>
          <p><strong>Education:</strong> {otherInfo.education}</p>
          <p><strong>Experience:</strong> {otherInfo.experience}</p>
        </div>
      </div>
    </Card>
  );
}

export default TeacherProfileDetails;
