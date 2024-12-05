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
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
  class: Yup.string().required('Class selection is required'),
  subject: Yup.string().required('Subject selection is required'),
  teacher: Yup.string().required('Teacher selection is required'),
});

const CreateTimetable = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/timetable');
  const { data: classes, loading: loadingClasses, error: classesError } = useRead('https://lms.webarchitectslab.com/api/classes');
  const { data: subjects, loading: loadingSubjects, error: subjectsError } = useRead('https://lms.webarchitectslab.com/api/subjects');
  const { data: teachers, loading: loadingTeachers, error: teachersError } = useRead('https://lms.webarchitectslab.com/api/employees/search?employeeType=Teacher');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      startTime: values.startTime,
      endTime: values.endTime,
      class: values.class,
      subject: values.subject,
      teacher: values.teacher,
    };
    await create(postData);
    resetForm();
  };

  if (loadingClasses || loadingSubjects || loadingTeachers) return <p>Loading data...</p>;
  if (classesError) return <p>Error loading classes: {classesError}</p>;
  if (subjectsError) return <p>Error loading subjects: {subjectsError}</p>;
  if (teachersError) return <p>Error loading teachers: {teachersError}</p>;

  return (
    <div>
      <h2>Create Timetable</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, deleniti.</p>
      <Card className="mt-8">
        <h5>Add New Timetable Entry</h5>
        <Formik
          initialValues={{
            startTime: '',
            endTime: '',
            class: '',
            subject: '',
            teacher: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Start Time</label>
                <Input
                  name="startTime"
                  placeholder="Enter Start Time"
                  className="mt-1.5"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.startTime && formik.errors.startTime}
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.startTime}</p>
                )}
              </div>

              <div>
                <label>End Time</label>
                <Input
                  name="endTime"
                  placeholder="Enter End Time"
                  className="mt-1.5"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.endTime && formik.errors.endTime}
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.endTime}</p>
                )}
              </div>

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
                  Add Timetable Entry
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default CreateTimetable;
