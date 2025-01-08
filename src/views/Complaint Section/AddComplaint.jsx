import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import useRead from '../../utils/hooks/useRead';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  subject: Yup.string().required('Subject selection is required'),
  description: Yup.string().required('Description is required'),
});

const AddComplaint = () => {
  const { create, loading: creating, error: createError } = useCreate(
    'https://lms.webarchitectslab.com/api/query-complaints'
  );
  const { data: subjects, loading: loadingSubjects, error: subjectsError } = useRead(
    'https://lms.webarchitectslab.com/api/subjects'
  );

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      subject: values.subject,
      description: values.description,
    };
    await create(postData);
    resetForm();
  };

  if (loadingSubjects) return <p>Loading subjects...</p>;
  if (subjectsError) return <p>Error loading subjects: {subjectsError}</p>;
  if (createError) return <p>Error creating complaint: {createError}</p>;

  return (
    <div>
      <h2>Submit a Complaint</h2>
      <p>Submit your complaint about a subject or related matter.</p>
      <Card className="mt-8">
        <h5>Add New Complaint</h5>
        <Formik
          initialValues={{
            subject: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 mt-6 gap-6">
              <div>
                <label>Subject</label>
                <Select
                  name="subject"
                  placeholder="Select Subject"
                  options={subjects.map((subject) => ({
                    value: subject._id,
                    label: subject.name,
                  }))}
                  onChange={(selectedOption) => formik.setFieldValue('subject', selectedOption.value)}
                  onBlur={formik.handleBlur}
                  className="mt-1.5"
                  isInvalid={formik.touched.subject && formik.errors.subject}
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.subject}</p>
                )}
              </div>

              <div>
                <label>Description</label>
                <TextArea
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

              <div className="mt-6">
                <Button
                  loading={creating}
                  variant="twoTone"
                  className="w-full"
                  onClick={formik.handleSubmit}
                >
                  Add Complaint
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddComplaint;
