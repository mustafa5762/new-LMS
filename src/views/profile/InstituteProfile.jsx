import React, { useEffect } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { HiOutlineUser, HiOutlineGlobe, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineSpeakerphone, HiOutlineFlag } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button'

// Import your CRUD hooks
import useRead from '../../utils/hooks/useRead';
import useUpdate from '../../utils/hooks/useUpdate';
import InstituteProfileDetails from './InstituteProfileDetails';

function InstituteProfile() {
  // Fetch the institute profile using the custom hook
  const { data: instituteData, loading: reading, error: readError } = useRead('https://lms.webarchitectslab.com/api/institutes/67068f816b75403b02565263');
  
  // Update function from your reusable hook
  const { update, loading: updating, error: updateError } = useUpdate('https://lms.webarchitectslab.com/api/institutes');

  // Formik form initialization
  const formik = useFormik({
    initialValues: {
      name: '',
      slogan: '',
      contactNumber: '',
      website: '',
      address: '',
      country: '',
      city: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Institute Name is required'),
      slogan: Yup.string().required('Slogan is required'),
      contactNumber: Yup.string().required('Contact is required'),
      website: Yup.string().url('Invalid URL format').required('Website URL is required'),
      address: Yup.string().required('Address is required'),
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required')
    }),
    onSubmit: (values) => {
      update(instituteData._id, values);
    },
    enableReinitialize: true, // To update form values when fetching data is completed
  });

  // Populate the form with fetched data when available
  useEffect(() => {
    if (instituteData) {
      formik.setValues({
        name: instituteData.name || '',
        slogan: instituteData.slogan || '',
        contactNumber: instituteData.contactNumber || '',
        website: instituteData.website || '',
        address: instituteData.address || '',
        country: instituteData.country || '',
        city: instituteData.city || ''
      });
    }
  }, [instituteData]);

  if (reading) {
    return <p>Loading...</p>;
  }

  if (readError) {
    return <p>Error: {readError}</p>;
  }

  return (
    <div>
      <h2>Institute Profile</h2>
      <p>Manage and update the details of the institute below:</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <Card>
            <h5>Update Institute Profile</h5>
            <form onSubmit={formik.handleSubmit}>
              
              {/* Name */}
              <div className="mt-6">
                <label>Name of Institute</label>
                <Input
                  name="name"
                  placeholder="Enter Institute Name"
                  prefix={<HiOutlineUser className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.name && formik.errors.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                ) : null}
              </div>

              {/* Slogan */}
              <div className="mt-6">
                <label>Slogan Line of Institute</label>
                <Input
                  name="slogan"
                  placeholder="Enter Institute Slogan Line"
                  prefix={<HiOutlineSpeakerphone className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.slogan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.slogan && formik.errors.slogan}
                />
                {formik.touched.slogan && formik.errors.slogan ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.slogan}</p>
                ) : null}
              </div>

              {/* Contact Number */}
              <div className="mt-6">
                <label>Contact of Institute</label>
                <Input
                  name="contactNumber"
                  placeholder="Enter Institute Contact"
                  prefix={<HiOutlinePhone className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.contactNumber && formik.errors.contactNumber}
                />
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.contactNumber}</p>
                ) : null}
              </div>

              {/* Website */}
              <div className="mt-6">
                <label>Website URL</label>
                <Input
                  name="website"
                  placeholder="Enter Institute Website"
                  prefix={<HiOutlineGlobe className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.website && formik.errors.website}
                />
                {formik.touched.website && formik.errors.website ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.website}</p>
                ) : null}
              </div>

              {/* Address */}
              <div className="mt-6">
                <label>Address</label>
                <Input
                  name="address"
                  placeholder="Enter Institute Address"
                  prefix={<HiOutlineLocationMarker className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.address && formik.errors.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
                ) : null}
              </div>

              {/* Country */}
              <div className="mt-6">
                <label>Country</label>
                <Input
                  name="country"
                  placeholder="Enter Country"
                  prefix={<HiOutlineFlag className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.country && formik.errors.country}
                />
                {formik.touched.country && formik.errors.country ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.country}</p>
                ) : null}
              </div>

              {/* City */}
              <div className="mt-6">
                <label>City</label>
                <Input
                  name="city"
                  placeholder="Enter City"
                  prefix={<HiOutlineLocationMarker className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.city && formik.errors.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button loading={updating} variant="twoTone" className="w-full">
                    Update Profile
                </Button>
              </div>

              {/* Show update error if any */}
              {updateError && <p className="text-red-500 mt-2">Error: {updateError}</p>}
            </form>
          </Card>
        </div>
        <div>
            <InstituteProfileDetails reading={reading} updating={updating} data={instituteData}/>
        </div>
      </div>
    </div>
  );
}

export default InstituteProfile;
