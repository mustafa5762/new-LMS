import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  examEventName: Yup.string().required('Exam event name is required'),
  date: Yup.date().required('Date is required').typeError('Invalid date format'),
});

const AddDateSheet = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/date-sheets');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      examEventName: values.examEventName,
      date: values.date,
    };
    await create(postData);
    resetForm();
  };

  if (createError) return <p>Error creating date sheet: {createError}</p>;

  return (
    <div>
      <h2>All Date Sheets</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <Card className="mt-8">
        <h5>Add New Date Sheet</h5>
        <Formik
          initialValues={{
            examEventName: '',
            date: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Exam Event Name</label>
                <Input
                  name="examEventName"
                  placeholder="Enter Exam Event Name"
                  className="mt-1.5"
                  value={formik.values.examEventName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.examEventName && formik.errors.examEventName}
                />
                {formik.touched.examEventName && formik.errors.examEventName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.examEventName}</p>
                )}
              </div>

              <div>
                <label>Date</label>
                <Input
                  name="date"
                  type="date"
                  className="mt-1.5"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.date && formik.errors.date}
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                )}
              </div>

              <div className="mt-6 lg:col-span-2">
                <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                  Add Date Sheet
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddDateSheet;
