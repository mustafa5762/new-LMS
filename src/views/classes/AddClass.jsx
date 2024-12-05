import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import useRead from '../../utils/hooks/useRead';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card'
import { HiOutlineUser } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  teacher: Yup.string().required('Teacher selection is required'),
});

const AddClass = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/classes');
  const { data: teachers, loading: loadingTeachers, error: teachersError } = useRead('https://lms.webarchitectslab.com/api/employees/search?employeeType=Teacher');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
        name: values.name,
        employee: values.teacher
    }
    await create(postData);
    resetForm();
  };

  if (loadingTeachers) return <p>Loading teachers...</p>;
  if (teachersError) return <p>Error loading teachers: {teachersError}</p>;
  if (createError) return <p>Error creating class: {createError}</p>;

  return (
    <div>
        <h2>All Classes</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
        <Card className="mt-8">
            <h5>Add New Class</h5>
            <Formik
                initialValues={{
                    name: '',
                    teacher: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {(formik) => (
                    <Form className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6'>
                    <div className=''>
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
                        <label>Teacher</label>
                        <Select
                        name="teacher"
                        placeholder="Select Teacher"
                        options={teachers.map((teacher) => ({
                            value: teacher._id,
                            label: teacher.name,
                        }))}
                        onChange={(selectedOption) => formik.setFieldValue('teacher', selectedOption.value)}
                        onBlur={formik.handleBlur}
                        className="mt-1.5"
                        isInvalid={formik.touched.teacher && formik.errors.teacher}
                        />
                        {formik.touched.teacher && formik.errors.teacher && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.teacher}</p>
                        )}
                    </div>

                    <div className="mt-6 lg:col-span-2">
                        <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                            Add Class
                        </Button>
                    </div>
                </Form>
            )}
            </Formik>
        </Card>
    </div>
  );
};

export default AddClass;