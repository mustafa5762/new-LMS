import { useState } from 'react';
import toast from '@/components/ui/toast';
import Notification from '@/components/ui/Notification'

const openNotification = (type, placement, message) => {
  toast.push(
    <Notification
      closable
      title={type.charAt(0).toUpperCase() + type.slice(1)}
      type={type}
    >
      {message}
    </Notification>, 
    { placement: placement }
  );
};

const useCreate = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create data');
      }
      
      const result = await response.json();

      // Show success notification
      openNotification('success', 'bottom-start', 'Data created successfully');

      return result;
    } catch (err) {
      setError(err.message);

      // Show error notification
      openNotification('danger', 'bottom-start', err.message);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export default useCreate;
