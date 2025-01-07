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
  homeworkTitle: Yup.string().required('Homework title is required'),
  classGrade: Yup.string().required('Class grade is required'),
  dueDate: Yup.date().required('Due date is required').typeError('Invalid date'),
});

const AddHomework = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/homework');
  const { data: classes, loading: loadingClasses, error: classesError } = useRead('https://lms.webarchitectslab.com/api/classes');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      homeworkTitle: values.homeworkTitle,
      classGrade: values.classGrade,
      dueDate: values.dueDate,
    };
    await create(postData);
    resetForm();
  };

  if (loadingClasses) return <p>Loading classes...</p>;
  if (classesError) return <p>Error loading classes: {classesError}</p>;
  if (createError) return <p>Error creating homework: {createError}</p>;

  return (
    <div>
      <h2>All Homework</h2>
      <p>Manage and assign homework for your classes. Fill in the details below to add new homework.</p>
      <Card className="mt-8">
        <h5>Add New Homework</h5>
        <Formik
          initialValues={{
            homeworkTitle: '',
            classGrade: '',
            dueDate: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Homework Title</label>
                <Input
                  name="homeworkTitle"
                  placeholder="Enter Homework Title"
                  className="mt-1.5"
                  value={formik.values.homeworkTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.homeworkTitle && formik.errors.homeworkTitle}
                />
                {formik.touched.homeworkTitle && formik.errors.homeworkTitle && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.homeworkTitle}</p>
                )}
              </div>

              <div>
                <label>Class Grade</label>
                <Select
                  name="classGrade"
                  placeholder="Select Class Grade"
                  options={classes.map((classItem) => ({
                    value: classItem._id,
                    label: classItem.name,
                  }))}
                  onChange={(selectedOption) => formik.setFieldValue('classGrade', selectedOption.value)}
                  onBlur={formik.handleBlur}
                  className="mt-1.5"
                  isInvalid={formik.touched.classGrade && formik.errors.classGrade}
                />
                {formik.touched.classGrade && formik.errors.classGrade && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.classGrade}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label>Due Date</label>
                <Input
                  type="date"
                  name="dueDate"
                  placeholder="Enter Due Date"
                  className="mt-1.5"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.dueDate && formik.errors.dueDate}
                />
                {formik.touched.dueDate && formik.errors.dueDate && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.dueDate}</p>
                )}
              </div>

              <div className="mt-6 lg:col-span-2">
                <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                  Add Homework
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddHomework;
