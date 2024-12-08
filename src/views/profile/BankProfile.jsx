import React, { useEffect } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { HiOutlineOfficeBuilding, HiOutlineCash } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';

// Import your CRUD hooks
import useRead from '../../utils/hooks/useRead';
import useUpdate from '../../utils/hooks/useUpdate';
import BankDetails from './BankDetails';

function BankProfile() {
  const { data: bankData, loading: reading, error: readError } = useRead('https://lms.webarchitectslab.com/api/bank-info/671976fb66d8fb3dc77de501');
  const { update, loading: updating, error: updateError } = useUpdate('https://lms.webarchitectslab.com/api/bank-info');

  const formik = useFormik({
    initialValues: {
      bankName: '',
      branch: '',
      accountNumber: '',
      IBAN: '',
      accountTitle: '',
      branchCode: '',
    },
    validationSchema: Yup.object({
      bankName: Yup.string().required('Bank Name is required'),
      branch: Yup.string().required('Branch Name is required'),
      accountNumber: Yup.string().required('Account Number is required'),
      IBAN: Yup.string().required('IBAN is required'),
      accountTitle: Yup.string().required('Account Title is required'),
      branchCode: Yup.string().required('Branch Code is required'),
    }),
    onSubmit: (values) => {
      update(bankData._id, values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (bankData) {
      formik.setValues({
        bankName: bankData.bankName || '',
        branch: bankData.branch || '',
        accountNumber: bankData.accountNumber || '',
        IBAN: bankData.IBAN || '',
        accountTitle: bankData.accountTitle || '',
        branchCode: bankData.branchCode || '',
      });
    }
  }, [bankData]);

  if (reading) {
    return <p>Loading...</p>;
  }

  if (readError) {
    return <p>Error: {readError}</p>;
  }

  return (
    <div>
      <h2>Bank Profile</h2>
      <p>Manage and update your bank details below:</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <Card>
            <h5>Update Bank Details</h5>
            <form onSubmit={formik.handleSubmit}>
              {/* Existing fields */}
              <div className="mt-6">
                <label>Bank Name</label>
                <Input
                  name="bankName"
                  placeholder="Enter Bank Name"
                  prefix={<HiOutlineOfficeBuilding className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.bankName && formik.errors.bankName}
                />
                {formik.touched.bankName && formik.errors.bankName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.bankName}</p>
                )}
              </div>

               {/* Branch Name */}
               <div className="mt-6">
                <label>Branch Name</label>
                <Input
                  name="branch"
                  placeholder="Enter Branch Name"
                  prefix={<HiOutlineOfficeBuilding className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.branch && formik.errors.branch}
                />
                {formik.touched.branch && formik.errors.branch ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.branch}</p>
                ) : null}
              </div>

              {/* Account Number */}
              <div className="mt-6">
                <label>Account Number</label>
                <Input
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  prefix={<HiOutlineCash className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.accountNumber && formik.errors.accountNumber}
                />
                {formik.touched.accountNumber && formik.errors.accountNumber ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.accountNumber}</p>
                ) : null}
              </div>

              {/* New fields */}
              <div className="mt-6">
                <label>IBAN</label>
                <Input
                  name="IBAN"
                  placeholder="Enter IBAN"
                  className="mt-1.5"
                  value={formik.values.IBAN}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.IBAN && formik.errors.IBAN}
                />
                {formik.touched.IBAN && formik.errors.IBAN && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.IBAN}</p>
                )}
              </div>

              <div className="mt-6">
                <label>Account Title</label>
                <Input
                  name="accountTitle"
                  placeholder="Enter Account Title"
                  className="mt-1.5"
                  value={formik.values.accountTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.accountTitle && formik.errors.accountTitle}
                />
                {formik.touched.accountTitle && formik.errors.accountTitle && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.accountTitle}</p>
                )}
              </div>

              <div className="mt-6">
                <label>Branch Code</label>
                <Input
                  name="branchCode"
                  placeholder="Enter Branch Code"
                  className="mt-1.5"
                  value={formik.values.branchCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.branchCode && formik.errors.branchCode}
                />
                {formik.touched.branchCode && formik.errors.branchCode && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.branchCode}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button loading={updating} variant="twoTone" className="w-full">
                  Update Bank Details
                </Button>
              </div>

              {/* Show update error if any */}
              {updateError && <p className="text-red-500 mt-2">Error: {updateError}</p>}
            </form>
          </Card>
        </div>
        <div>
          <BankDetails reading={reading} updating={updating} data={bankData} />
        </div>
      </div>
    </div>
  );
}

export default BankProfile;
