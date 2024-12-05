import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCreate from '../../utils/hooks/useCreate';
import useRead from '../../utils/hooks/useRead';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { HiOutlineTag, HiOutlineCurrencyDollar, HiOutlineClipboardList } from 'react-icons/hi';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  stock: Yup.number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  description: Yup.string().required('Description is required'),
});

const AddProduct = () => {
  const { create, loading: creating, error: createError } = useCreate('https://lms.webarchitectslab.com/api/canteen-products');

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      name: values.name,
      price: parseFloat(values.price),
      stock: parseInt(values.stock, 10),
      description: values.description,
    };

    await create(postData);
    resetForm();
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <p>Fill in the details below to add a new product to the inventory.</p>
      <Card className="mt-8">
        <h5>Add Product Details</h5>
        <Formik
          initialValues={{
            name: '',
            price: '',
            stock: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
              <div>
                <label>Name</label>
                <Input
                  name="name"
                  placeholder="Enter Product Name"
                  prefix={<HiOutlineTag className="text-lg" />}
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
                <label>Price</label>
                <Input
                  name="price"
                  placeholder="Enter Product Price"
                  prefix={<HiOutlineCurrencyDollar className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.price && formik.errors.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                )}
              </div>

              <div>
                <label>Stock</label>
                <Input
                  name="stock"
                  placeholder="Enter Stock Quantity"
                  prefix={<HiOutlineClipboardList className="text-lg" />}
                  className="mt-1.5"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.stock && formik.errors.stock}
                />
                {formik.touched.stock && formik.errors.stock && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.stock}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label>Description</label>
                <Input
                  name="description"
                  placeholder="Enter Product Description"
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

              <div className="mt-6 lg:col-span-2">
                <Button
                  loading={creating}
                  variant="twoTone"
                  className="w-full"
                  onClick={formik.handleSubmit}
                >
                  Add Product
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
      {createError && <p className="text-red-500 mt-4">Error adding product: {createError}</p>}
    </div>
  );
};

export default AddProduct;
