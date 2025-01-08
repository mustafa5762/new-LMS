import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker'; // Assuming you have a DatePicker component
import Card from '@/components/ui/Card';
import { HiOutlineCalendar, HiOutlinePencilAlt } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Validation schema
const validationSchema = Yup.object({
  eventName: Yup.string().required('Event Name is required'),
  date: Yup.date().required('Date is required').nullable(),
});

const AddSport = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/sports');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      eventName: values.eventName,
      date: values.date,
    };
    await create(postData);
    resetForm();
  };

  if (createError) return <p>Error creating sport event: {createError}</p>;

  return (
    <div>
      <h2>Sports Events</h2>
      <p>Manage sports events for the organization.</p>
      <Card className="mt-8">
        <h5>Add New Sport Event</h5>
        <Formik
          initialValues={{
            eventName: '',
            date: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 mt-6 gap-6">
              <div>
                <label>Event Name</label>
                <Input
                  name="eventName"
                  placeholder="Enter Event Name"
                  prefix={<HiOutlinePencilAlt className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.eventName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.eventName && formik.errors.eventName}
                />
                {formik.touched.eventName && formik.errors.eventName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.eventName}</p>
                )}
              </div>

              <div>
                <label>Date</label>
                <DatePicker
                  name="date"
                  placeholder="Select Date"
                  className="mt-1.5"
                  selected={formik.values.date}
                  onChange={(date) => formik.setFieldValue('date', date)}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.date && formik.errors.date}
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                )}
              </div>

              <div className="mt-6">
                <Button loading={creating} variant="twoTone" className="w-full" onClick={formik.handleSubmit}>
                  Add Sport Event
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddSport;
