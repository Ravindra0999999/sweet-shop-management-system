import React, { useState } from 'react';

export default function AdminSweetForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h3>Add Sweet</h3>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" type="number" onChange={handleChange} />
      <button onClick={() => onSubmit(form)}>Add</button>
    </div>
  );
}
