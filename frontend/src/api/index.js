const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const login = async (email, password) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const register = async (name, email, password, role) => {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  return res.json();
};


export const fetchSweets = async (token) => {
  const res = await fetch(`${BASE}/api/sweets`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return res.json();
};

export const purchaseSweet = async (id, token) => {
  const res = await fetch(`${BASE}/api/sweets/${id}/purchase`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const searchSweets = async (query) => {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${BASE}/api/sweets/search?${params}`);
  return res.json();
};

export const updateSweet = async (id, data, token) => {
  const res = await fetch(`${BASE}/api/sweets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const addSweet = async (data, token) => {
  const res = await fetch(`${BASE}/api/sweets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteSweet = async (id, token) => {
  await fetch(`${BASE}/api/sweets/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
};
