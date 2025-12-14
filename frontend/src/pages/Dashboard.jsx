import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  fetchSweets,
  purchaseSweet,
  searchSweets,
  addSweet,
  deleteSweet,
  updateSweet
} from '../api';
import AdminSweetForm from '../components/AdminSweetForm';
import SweetCard from '../components/SweetCard';

export default function Dashboard() {
  const { token, user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const isAdmin = user?.role === 'admin';

  // Load all sweets
  const load = async () => {
    setLoading(true);
    const list = await fetchSweets(token);
    setSweets(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  //  Debounced search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (search.trim() === '') {
        load();
      } else {
        const list = await searchSweets({ q: search });
        setSweets(list);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  //  Purchase sweet
  const handlePurchase = async (id) => {
    if (!token) {
      alert('Please login to purchase sweets');
      return;
    }

    const res = await purchaseSweet(id, token);
    if (res._id) {
      setSweets(sweets.map(s => (s._id === id ? res : s)));
    } else {
      alert(res.message || 'Purchase failed');
    }
  };

  const handleUpdate = async (data) => {
  const updated = await updateSweet(data._id, data, token);
  setSweets(sweets.map(s => s._id === updated._id ? updated : s));
};

  //  Admin: add sweet
  const handleAddSweet = async (data) => {
    const sweet = await addSweet(data, token);
    setSweets([...sweets, sweet]);
  };

  // Admin: delete sweet
  const handleDelete = async (id) => {
    await deleteSweet(id, token);
    setSweets(sweets.filter(s => s._id !== id));
  };

  if (loading) {
    return <div className="container">Loading sweets...</div>;
  }

  return (
    <div className="container">
      <h2>🍬 Sweet Shop</h2>

      {!user && <p className="info">Login to purchase sweets</p>}

      {/* Search */}
      <input
        placeholder="Search sweets by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Admin add sweet */}
      {isAdmin && <AdminSweetForm onSubmit={handleAddSweet} />}

     <div className="grid">
  {sweets.length === 0 && <p>No sweets available</p>}
  {sweets.map(s => (
    <SweetCard
      key={s._id}
      sweet={s}
      onPurchase={handlePurchase}
      onDelete={isAdmin ? handleDelete : null}
      onUpdate={isAdmin ? handleUpdate : null}
    />
  ))}
</div>

    </div>
  );
}
