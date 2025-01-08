import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import useRead from '../../utils/hooks/useRead';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  reportTitle: Yup.string().required('Report title is required'),
  studentName: Yup.string().required('Student selection is required'),
  description: Yup.string().required('Description is required'),
});

const AddReport = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/reports');
  const { data: students, loading: loadingStudents, error: studentsError } = useRead('https://lms.webarchitectslab.com/api/students');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      reportTitle: values.reportTitle,
      studentName: values.studentName,
      description: values.description,
    };
    await create(postData);
    resetForm();
  };

  if (loadingStudents) return <p>Loading students...</p>;
  if (studentsError) return <p>Error loading students: {studentsError}</p>;
  if (createError) return <p>Error creating report: {createError}</p>;

  return (
    <div>
      <h2>All Reports</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <Card className="mt-8">
        <h5>Add New Report</h5>
        <Formik
          initialValues={{
            reportTitle: '',
            studentName: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Report Title</label>
                <Input
                  name="reportTitle"
                  placeholder="Enter Report Title"
                  className="mt-1.5"
                  value={formik.values.reportTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.reportTitle && formik.errors.reportTitle}
                />
                {formik.touched.reportTitle && formik.errors.reportTitle && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.reportTitle}</p>
                )}
              </div>

              <div>
                <label>Student</label>
                <Select
                  name="studentName"
                  placeholder="Select Student"
                  options={students.map((student) => ({
                    value: student._id,
                    label: student.studentDetails.name,
                  }))}
                  onChange={(selectedOption) => formik.setFieldValue('studentName', selectedOption.value)}
                  onBlur={formik.handleBlur}
                  className="mt-1.5"
                  isInvalid={formik.touched.studentName && formik.errors.studentName}
                />
                {formik.touched.studentName && formik.errors.studentName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.studentName}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label>Description</label>
                <Input
                  name="description"
                  placeholder="Enter Description"
                  className="mt-1.5"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.description && formik.errors.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                )}
              </div>

              <div className="mt-6 lg:col-span-2">
                <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                  Add Report
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddReport;
