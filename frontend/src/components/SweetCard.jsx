import React, { useState } from 'react';

export default function SweetCard({ sweet, onPurchase, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...sweet });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="category" value={form.category} onChange={handleChange} />
          <input name="price" type="number" value={form.price} onChange={handleChange} />
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} />

          <button onClick={() => { onUpdate(form); setEditing(false); }}>
            Save
          </button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{sweet.name}</h3>
          <p>{sweet.category}</p>
          <p>₹ {sweet.price}</p>
          <p>Stock: {sweet.quantity}</p>

          <button onClick={() => onPurchase(sweet._id)} disabled={sweet.quantity === 0}>
            Purchase
          </button>

          {onDelete && (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={() => onDelete(sweet._id)}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
