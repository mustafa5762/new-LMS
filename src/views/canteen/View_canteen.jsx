import React from 'react';
import useRead from '../../utils/hooks/useRead';
import Card from '@/components/ui/Card';

function AllProducts() {
  const { data, loading, error } = useRead('https://lms.webarchitectslab.com/api/canteen-products'); // Replace with your actual API endpoint

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Products</h2>
      <p>Explore our diverse range of products listed below.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 mt-8">
        {data.map((product, index) => (
          <Card
            key={product._id}
            className={`text-white p-4 rounded-lg`}
          >
            <div className="text-left space-y-4">
              <h2 className="text-neutral-900 drop-shadow-2xl">{product.name}</h2>
              <h5 className="text-neutral-900 mt-1 opacity-80 font-medium drop-shadow-2xl">
                Price: ${product.price}
              </h5>
              <p className="text-neutral-900 mt-1 opacity-70">
                Stock: {product.stock} units
              </p>
              <p className="text-neutral-900 mt-2 opacity-90">{product.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
