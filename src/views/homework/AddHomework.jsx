import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import useRead from '../../utils/hooks/useRead';
import Input from '@/components/ui/Input';
// import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import { HiOutlineDocumentText } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  class: Yup.string().required('Class selection is required'),
});

const AddHomework = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/homework');
  const { data: classes, loading: loadingClasses, error: classesError } = useRead('https://lms.webarchitectslab.com/api/classes');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      title: values.title,
      description: values.description,
      class: values.class,
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
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <Card className="mt-8">
        <h5>Add New Homework</h5>
        <Formik
          initialValues={{
            title: '',
            description: '',
            class: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Title</label>
                <Input
                  name="title"
                  placeholder="Enter Title"
                  prefix={<HiOutlineDocumentText className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.title && formik.errors.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                )}
              </div>

              {/* <div className="lg:col-span-2">
                <label>Description</label>
                <Textarea
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
              </div> */}

              <div>
                <label>Class</label>
                <Select
                  name="class"
                  placeholder="Select Class"
                  options={classes.map((classItem) => ({
                    value: classItem._id,
                    label: classItem.name,
                  }))}
                  onChange={(selectedOption) => formik.setFieldValue('class', selectedOption.value)}
                  onBlur={formik.handleBlur}
                  className="mt-1.5"
                  isInvalid={formik.touched.class && formik.errors.class}
                />
                {formik.touched.class && formik.errors.class && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.class}</p>
                )}
              </div>

              <div className="mt-6 lg:col-span-2">
                <Button
                  loading={creating}
                  variant="twoTone"
                  className="w-full"
                  onClick={formik.handleSubmit}
                >
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
