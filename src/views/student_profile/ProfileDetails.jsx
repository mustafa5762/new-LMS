import React from 'react';
import Card from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
} from 'react-icons/hi';

function StudentProfileDetails({ data }) {
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <Loading loading={true} />
      </div>
    );
  }

  const { studentDetails, otherDetails, fatherDetails, motherDetails } = data;

  return (
    <Card>
      <div>
        <h3>{studentDetails.name}</h3>
        <p className="mt-1">Roll No: {studentDetails.rollNo}</p>
        <p className="mt-1">Class: {studentDetails.class.name}</p>

        <div className="my-5 h-px w-full bg-neutral-300"></div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2">
            <HiOutlinePhone className="text-lg" />
            <p>{studentDetails.contactNumber}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineLocationMarker className="text-lg" />
            <p>{otherDetails.address}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineCalendar className="text-lg" />
            <p><strong>Admission Date:</strong> {new Date(studentDetails.admissionDate).toDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineUser className="text-lg" />
            <p><strong>Father's Name:</strong> {fatherDetails.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineUser className="text-lg" />
            <p><strong>Mother's Name:</strong> {motherDetails.name}</p>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-neutral-300"></div>

        <div className="space-y-5">
            <h4>Other Details</h4>
            <p><strong>Date of Birth:</strong> {new Date(otherDetails.dateOfBirth).toDateString()}</p>
            <p><strong>CNIC/B-Form:</strong> {otherDetails.cnicOrBForm}</p>
            <p><strong>Blood Group:</strong> {otherDetails.bloodGroup}</p>
            <p><strong>Religion:</strong> {otherDetails.religion}</p>
            <p><strong>Previous School:</strong> {otherDetails.previousSchool}</p>
        </div>
      </div>
    </Card>
  );
}

export default StudentProfileDetails;
