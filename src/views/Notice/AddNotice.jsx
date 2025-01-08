import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  noticeTitle: Yup.string().required('Notice Title is required'),
  description: Yup.string().required('Description is required'),
});

const AddNotice = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/notices');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      noticeTitle: values.noticeTitle,
      description: values.description,
    };
    await create(postData);
    resetForm();
  };

  if (createError) return <p>Error creating notice: {createError}</p>;

  return (
    <div>
      <h2>Notice Board</h2>
      <p>Manage notices for the organization.</p>
      <Card className="mt-8">
        <h5>Add New Notice</h5>
        <Formik
          initialValues={{
            noticeTitle: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 mt-6 gap-6">
              <div>
                <label>Notice Title</label>
                <Input
                  name="noticeTitle"
                  placeholder="Enter Notice Title"
                  prefix={<HiOutlinePencilAlt className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.noticeTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.noticeTitle && formik.errors.noticeTitle}
                />
                {formik.touched.noticeTitle && formik.errors.noticeTitle && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.noticeTitle}</p>
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
                <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                  Add Notice
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddNotice;
