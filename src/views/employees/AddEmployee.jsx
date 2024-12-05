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
  const { create, loading, error } = useCreate('https://lms.webarchitectslab.com/api/employees');

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      employeeType: '',
      cnicOrBForm: '',
      joiningDate: '',
      monthlySalary: '',
      fatherName: '',
      gender: '',
      dateOfBirth: '',
      education: '',
      experience: '',
      email: '',
      religion: '',
      bloodGroup: '',
      experiencedIn: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      employeeType: Yup.string().required('Employee Type is required'),
      cnicOrBForm: Yup.string().required('CNIC / B.Form is required'),
      joiningDate: Yup.date().required('Joining Date is required'),
      monthlySalary: Yup.number().required('Monthly Salary is required'),
      fatherName: Yup.string().required('Father Name is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      education: Yup.string().required('Education is required'),
      experience: Yup.string().required('Experience is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      religion: Yup.string().required('Religion is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      experiencedIn: Yup.string().required('Experienced In is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: (values) => {
      const postData = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        employeeType: values.employeeType,
        cnic: values.cnicOrBForm,
        joiningDate: values.joiningDate,
        monthlySalary: values.monthlySalary,
        otherInfo: {
            fatherName: values.fatherName,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
            education: values.education,
            experience: values.experience,
            email: values.email,
            religion: values.religion,
            bloodGroup: values.bloodGroup,
            experiencedIn: values.experiencedIn,
            lastAddress: values.address,
      }
    }
      create(postData);
    },
  });

  return (
    <div>
      <h2>Add New Employee</h2>
      <p>Enter the employee details below:</p>

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
                <label>Phone Number</label>
                <Input
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  prefix={<HiOutlinePhone className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label>Employee Type</label>
                <Select
                  name="employeeType"
                  placeholder="Select Employee Type"
                  options={employeeTypeOptions}
                  onChange={selectedOption => formik.setFieldValue('employeeType', selectedOption.value)}
                  onBlur={formik.handleBlur}
                  className="mt-1.5"
                  isInvalid={formik.touched.employeeType && formik.errors.employeeType}
                />
                {formik.touched.employeeType && formik.errors.employeeType && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.employeeType}</p>
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
                <label>Joining Date</label>
                <Input
                  name="joiningDate"
                  type="date"
                  className="mt-1.5"
                  value={formik.values.joiningDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.joiningDate && formik.errors.joiningDate}
                />
                {formik.touched.joiningDate && formik.errors.joiningDate && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.joiningDate}</p>
                )}
              </div>

              <div>
                <label>Monthly Salary</label>
                <Input
                  name="monthlySalary"
                  placeholder="Enter Monthly Salary"
                  prefix={<HiOutlineCurrencyDollar className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.monthlySalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.monthlySalary && formik.errors.monthlySalary}
                />
                {formik.touched.monthlySalary && formik.errors.monthlySalary && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.monthlySalary}</p>
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* Other Info Card */}
        <Card>
          <h5>Other Info</h5>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
            <div>
              <label>Father Name</label>
              <Input
                name="fatherName"
                placeholder="Enter Father Name"
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
              <label>Gender</label>
              <Select
                name="gender"
                placeholder="Select Gender"
                options={genderOptions}
                
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
              <label>Education</label>
              <Input
                name="education"
                placeholder="Education"
                className="mt-1.5"
                value={formik.values.education}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.education && formik.errors.education}
              />
              {formik.touched.education && formik.errors.education && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.education}</p>
              )}
            </div>

            <div>
              <label>Experience</label>
              <Input
                name="experience"
                placeholder="Experience"
                className="mt-1.5"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.experience && formik.errors.experience}
              />
              {formik.touched.experience && formik.errors.experience && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.experience}</p>
              )}
            </div>

            <div>
              <label>Email</label>
              <Input
                name="email"
                placeholder="Email"
                className="mt-1.5"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label>Religion</label>
              <Input
                name="religion"
                placeholder="Religion"
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
                placeholder="Blood Group"
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
              <label>Experienced In</label>
              <Input
                name="experiencedIn"
                placeholder="Experienced In"
                className="mt-1.5"
                value={formik.values.experiencedIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.experiencedIn && formik.errors.experiencedIn}
              />
              {formik.touched.experiencedIn && formik.errors.experiencedIn && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.experiencedIn}</p>
              )}
            </div>

            <div className='lg:col-span-3'>
              <label>Address</label>
              <Input
                name="address"
                placeholder="Address"
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

          {/* Submit Button */}
          <div className="mt-6">
            <Button loading={loading} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
              Add Employee
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
