import React from 'react';
import useCreate from '../hooks/useCreate';
import useRead from '../hooks/useRead';
import useUpdate from '../hooks/useUpdate';
import useDelete from '../hooks/useDelete';

const YourComponent = () => {
  const { create, loading: creating, error: createError } = useCreate('https://api.example.com/items');
  const { data, loading: reading, error: readError } = useRead('https://api.example.com/items');
  const { update, loading: updating, error: updateError } = useUpdate('https://api.example.com/items');
  const { remove, loading: deleting, error: deleteError } = useDelete('https://api.example.com/items');

  const handleCreate = async () => {
    await create({ name: 'New Item' });
  };

  const handleUpdate = async (id) => {
    await update(id, { name: 'Updated Item' });
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  if (creating || reading || updating || deleting) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Items</h1>
      {createError && <p>Error: {createError}</p>}
      {readError && <p>Error: {readError}</p>}
      {updateError && <p>Error: {updateError}</p>}
      {deleteError && <p>Error: {deleteError}</p>}

      <button onClick={handleCreate}>Create Item</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdate(item.id)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
