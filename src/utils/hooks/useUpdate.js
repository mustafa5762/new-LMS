import { useState } from 'react';

const useUpdate = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export default useUpdate;
