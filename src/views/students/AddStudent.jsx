import React from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { HiOutlineUser, HiOutlinePhone, HiOutlineIdentification, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import useCreate from '../../utils/hooks/useCreate';
import Select from '@/components/ui/Select';

const employeeTypeOptions = [
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Other', label: 'Other' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

function AddNewEmployee() {
  // Use custom hook to POST data to the server
  const { create, loading, error } = useCreate('https://lms.webarchitectslab.com/api/students');

// Formik initialization
const formik = useFormik({
    initialValues: {
      name: '',
      class: '',
      rollNo: '',
      contactNumber: '',
      city: '',
      admissionDate: '',
      dateOfBirth: '',
      cnicOrBForm: '',
      isOrphan: '',
      gender: '',
      previousSchool: '',
      religion: '',
      bloodGroup: '',
      address: '',
      fatherName: '',
      fatherCnic: '',
      fatherOccupation: '',
      fatherEducation: '',
      fatherPhoneNo: '',
      fatherProfession: '',
      motherName: '',
      motherCnic: '',
      motherOccupation: '',
      motherEducation: '',
      motherPhoneNo: '',
      motherProfession: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      class: Yup.string().required('Class is required'),
      rollNo: Yup.string().required('Roll No is required'),
      contactNumber: Yup.string().required('Contact Number is required'),
      city: Yup.string().required('City is required'),
      admissionDate: Yup.date().required('Admission Date is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      cnicOrBForm: Yup.string().required('CNIC / B.Form is required'),
      isOrphan: Yup.boolean().required('Orphan status is required'),
      gender: Yup.string().required('Gender is required'),
      previousSchool: Yup.string().required('Previous School is required'),
      religion: Yup.string().required('Religion is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      address: Yup.string().required('Address is required'),
      fatherName: Yup.string().required('Father\'s Name is required'),
      fatherCnic: Yup.string().required('Father\'s CNIC is required'),
      fatherOccupation: Yup.string().required('Father\'s Occupation is required'),
      fatherEducation: Yup.string().required('Father\'s Education is required'),
      fatherPhoneNo: Yup.string().required('Father\'s Phone No is required'),
      fatherProfession: Yup.string().required('Father\'s Profession is required'),
      motherName: Yup.string().required('Mother\'s Name is required'),
      motherCnic: Yup.string().required('Mother\'s CNIC is required'),
      motherOccupation: Yup.string().required('Mother\'s Occupation is required'),
      motherEducation: Yup.string().required('Mother\'s Education is required'),
      motherPhoneNo: Yup.string().required('Mother\'s Phone No is required'),
      motherProfession: Yup.string().required('Mother\'s Profession is required'),
    }),
    onSubmit: (values) => {
      const postData = {
        studentDetails: {
          name: values.name,
          rollNo: values.rollNo,
          class: '66ddcca80496a4e64a857c3d',
          contactNumber: values.contactNumber,
          city: values.city,
          admissionDate: values.admissionDate,
        },
        otherDetails: {
          dateOfBirth: values.dateOfBirth,
          cnicOrBForm: values.cnicOrBForm,
          isOrphan: values.isOrphan==='True' ? true : false,
          gender: values.gender,
          previousSchool: values.previousSchool,
          religion: values.religion,
          bloodGroup: values.bloodGroup,
          address: values.address
        },
        fatherDetails: {
          name: values.fatherName,
          cnic: values.fatherCnic,
          occupation: values.fatherCnic,
          education: values.fatherEducation,
          phoneNo:values.fatherPhoneNo,
          profession: values.fatherProfession,
        },
        motherDetails: {
          name: values.motherName,
          cnic: values.motherCnic,
          occupation: values.motherCnic,
          education: values.motherEducation,
          phoneNo:values.motherPhoneNo,
          profession: values.motherProfession,
        },
      }
      create(postData);  // Send the post data
    },
  });
  

  return (
    <div>
      <h2>Add New Student</h2>
      <p>Enter the Student details below:</p>

      <div className="grid grid-cols-1 gap-10 mt-10">
{/* Basic Information Card */}
<Card>
  <h5>Basic Information</h5>
  <form onSubmit={formik.handleSubmit}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
      <div>
        <label>Name</label>
        <Input
          name="name"
          placeholder="Enter Name"
          prefix={<HiOutlineUser className="text-lg" />}
          className="mt-1.5"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.name && formik.errors.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label>Roll Number</label>
        <Input
          name="rollNo"
          placeholder="Enter Roll Number"
          prefix={<HiOutlineIdentification className="text-lg" />}
          className="mt-1.5"
          value={formik.values.rollNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.rollNo && formik.errors.rollNo}
        />
        {formik.touched.rollNo && formik.errors.rollNo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.rollNo}</p>
        )}
      </div>

      <div>
        <label>Class</label>
        <Input
          name="class"
          placeholder="Enter Class"
          className="mt-1.5"
          value={formik.values.class}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.class && formik.errors.class}
        />
        {formik.touched.class && formik.errors.class && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.class}</p>
        )}
      </div>

      <div>
        <label>Contact Number</label>
        <Input
          name="contactNumber"
          placeholder="Enter Contact Number"
          prefix={<HiOutlinePhone className="text-lg" />}
          className="mt-1.5"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.contactNumber && formik.errors.contactNumber}
        />
        {formik.touched.contactNumber && formik.errors.contactNumber && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.contactNumber}</p>
        )}
      </div>

      <div>
        <label>City</label>
        <Input
          name="city"
          placeholder="Enter City"
          className="mt-1.5"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.city && formik.errors.city}
        />
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
        )}
      </div>

      <div>
        <label>Admission Date</label>
        <Input
          name="admissionDate"
          type="date"
          className="mt-1.5"
          value={formik.values.admissionDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.admissionDate && formik.errors.admissionDate}
        />
        {formik.touched.admissionDate && formik.errors.admissionDate && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.admissionDate}</p>
        )}
      </div>
    </div>
  </form>
</Card>

{/* Additional Information Card */}
<Card>
  <h5>Additional Information</h5>
  <form onSubmit={formik.handleSubmit}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
      <div>
        <label>Date of Birth</label>
        <Input
          name="dateOfBirth"
          type="date"
          className="mt-1.5"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.dateOfBirth}</p>
        )}
      </div>

      <div>
        <label>CNIC / B.Form</label>
        <Input
          name="cnicOrBForm"
          placeholder="Enter CNIC / B.Form"
          prefix={<HiOutlineIdentification className="text-lg" />}
          className="mt-1.5"
          value={formik.values.cnicOrBForm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.cnicOrBForm && formik.errors.cnicOrBForm}
        />
        {formik.touched.cnicOrBForm && formik.errors.cnicOrBForm && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.cnicOrBForm}</p>
        )}
      </div>

      <div>
        <label>Is Orphan</label>
        <Select
          name="isOrphan"
          placeholder="Select Orphan Status"
          options={[
            { value: 'True', label: 'Yes' },
            { value: 'False', label: 'No' },
          ]}
          onChange={selectedOption => formik.setFieldValue('isOrphan', selectedOption.value)}
          onBlur={formik.handleBlur}
          className="mt-1.5"
          isInvalid={formik.touched.isOrphan && formik.errors.isOrphan}
        />
        {formik.touched.isOrphan && formik.errors.isOrphan && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.isOrphan}</p>
        )}
      </div>

      <div>
        <label>Gender</label>
        <Select
          name="gender"
          placeholder="Select Gender"
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Memale', label: 'Female' },
          ]}
          onChange={selectedOption => formik.setFieldValue('gender', selectedOption.value)}
          onBlur={formik.handleBlur}
          className="mt-1.5"
          isInvalid={formik.touched.gender && formik.errors.gender}
        />
        {formik.touched.gender && formik.errors.gender && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
        )}
      </div>

      <div>
        <label>Previous School</label>
        <Input
          name="previousSchool"
          placeholder="Enter Previous School"
          className="mt-1.5"
          value={formik.values.previousSchool}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.previousSchool && formik.errors.previousSchool}
        />
        {formik.touched.previousSchool && formik.errors.previousSchool && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.previousSchool}</p>
        )}
      </div>

      <div>
        <label>Religion</label>
        <Input
          name="religion"
          placeholder="Enter Religion"
          className="mt-1.5"
          value={formik.values.religion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.religion && formik.errors.religion}
        />
        {formik.touched.religion && formik.errors.religion && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.religion}</p>
        )}
      </div>

      <div>
        <label>Blood Group</label>
        <Input
          name="bloodGroup"
          placeholder="Enter Blood Group"
          className="mt-1.5"
          value={formik.values.bloodGroup}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.bloodGroup && formik.errors.bloodGroup}
        />
        {formik.touched.bloodGroup && formik.errors.bloodGroup && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.bloodGroup}</p>
        )}
      </div>

      <div>
        <label>Address</label>
        <Input
          name="address"
          placeholder="Enter Address"
          className="mt-1.5"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.address && formik.errors.address}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
        )}
      </div>
    </div>
  </form>
</Card>

{/* Father's Information Card */}
<Card>
  <h5>Father's Information</h5>
  <form onSubmit={formik.handleSubmit}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
      <div>
        <label>Father's Name</label>
        <Input
          name="fatherName"
          placeholder="Enter Father's Name"
          className="mt-1.5"
          value={formik.values.fatherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherName && formik.errors.fatherName}
        />
        {formik.touched.fatherName && formik.errors.fatherName && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherName}</p>
        )}
      </div>

      <div>
        <label>Father's CNIC</label>
        <Input
          name="fatherCnic"
          placeholder="Enter Father's CNIC"
          className="mt-1.5"
          value={formik.values.fatherCnic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherCnic && formik.errors.fatherCnic}
        />
        {formik.touched.fatherCnic && formik.errors.fatherCnic && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherCnic}</p>
        )}
      </div>

      <div>
        <label>Occupation</label>
        <Input
          name="fatherOccupation"
          placeholder="Enter Occupation"
          className="mt-1.5"
          value={formik.values.fatherOccupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherOccupation && formik.errors.fatherOccupation}
        />
        {formik.touched.fatherOccupation && formik.errors.fatherOccupation && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherOccupation}</p>
        )}
      </div>

      <div>
        <label>Education</label>
        <Input
          name="fatherEducation"
          placeholder="Enter Education"
          className="mt-1.5"
          value={formik.values.fatherEducation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherEducation && formik.errors.fatherEducation}
        />
        {formik.touched.fatherEducation && formik.errors.fatherEducation && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherEducation}</p>
        )}
      </div>

      <div>
        <label>Phone Number</label>
        <Input
          name="fatherPhoneNo"
          placeholder="Enter Phone Number"
          className="mt-1.5"
          value={formik.values.fatherPhoneNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherPhoneNo && formik.errors.fatherPhoneNo}
        />
        {formik.touched.fatherPhoneNo && formik.errors.fatherPhoneNo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherPhoneNo}</p>
        )}
      </div>

      <div>
        <label>Profession</label>
        <Input
          name="fatherProfession"
          placeholder="Enter Profession"
          className="mt-1.5"
          value={formik.values.fatherProfession}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.fatherProfession && formik.errors.fatherProfession}
        />
        {formik.touched.fatherProfession && formik.errors.fatherProfession && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.fatherProfession}</p>
        )}
      </div>
    </div>
  </form>
</Card>


{/* Mother's Information Card */}
<Card>
  <h5>Mother's Information</h5>
  <form onSubmit={formik.handleSubmit}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
      <div>
        <label>Mother's Name</label>
        <Input
          name="motherName"
          placeholder="Enter Mother's Name"
          className="mt-1.5"
          value={formik.values.motherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherName && formik.errors.motherName}
        />
        {formik.touched.motherName && formik.errors.motherName && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherName}</p>
        )}
      </div>

      <div>
        <label>Mother's CNIC</label>
        <Input
          name="motherCnic"
          placeholder="Enter Mother's CNIC"
          className="mt-1.5"
          value={formik.values.motherCnic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherCnic && formik.errors.motherCnic}
        />
        {formik.touched.motherCnic && formik.errors.motherCnic && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherCnic}</p>
        )}
      </div>

      <div>
        <label>Occupation</label>
        <Input
          name="motherOccupation"
          placeholder="Enter Occupation"
          className="mt-1.5"
          value={formik.values.motherOccupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherOccupation && formik.errors.motherOccupation}
        />
        {formik.touched.motherOccupation && formik.errors.motherOccupation && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherOccupation}</p>
        )}
      </div>

      <div>
        <label>Education</label>
        <Input
          name="motherEducation"
          placeholder="Enter Education"
          className="mt-1.5"
          value={formik.values.motherEducation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherEducation && formik.errors.motherEducation}
        />
        {formik.touched.motherEducation && formik.errors.motherEducation && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherEducation}</p>
        )}
      </div>

      <div>
        <label>Phone Number</label>
        <Input
          name="motherPhoneNo"
          placeholder="Enter Phone Number"
          className="mt-1.5"
          value={formik.values.motherPhoneNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherPhoneNo && formik.errors.motherPhoneNo}
        />
        {formik.touched.motherPhoneNo && formik.errors.motherPhoneNo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherPhoneNo}</p>
        )}
      </div>

      <div>
        <label>Profession</label>
        <Input
          name="motherProfession"
          placeholder="Enter Profession"
          className="mt-1.5"
          value={formik.values.motherProfession}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.motherProfession && formik.errors.motherProfession}
        />
        {formik.touched.motherProfession && formik.errors.motherProfession && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.motherProfession}</p>
        )}
      </div>
    </div>
  </form>
            {/* Submit Button */}
            <div className="mt-6">
            <Button loading={loading} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
              Add Student
            </Button>
          </div>

          {/* Show error if any */}
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}
</Card>


      </div>
    </div>
  );
}

export default AddNewEmployee;
