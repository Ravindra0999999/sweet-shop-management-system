const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let app;
let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  app = require('../app');
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

async function registerAndLogin(role = 'user') {
  const email = role === 'admin' ? 'admin@example.com' : 'user@example.com';
  await request(app).post('/api/auth/register').send({ name: 'Test', email, password: 'pass123', role });
  const res = await request(app).post('/api/auth/login').send({ email, password: 'pass123' });
  return res.body.token;
}

test('protected create sweet requires auth', async () => {
  const res = await request(app).post('/api/sweets').send({ name: 'Ladoo', category: 'Traditional', price: 50, quantity: 10 });
  expect(res.status).toBe(401);
});

test('create and purchase flow', async () => {
  const token = await registerAndLogin('user');
  const create = await request(app).post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Barfi', category: 'Milk', price: 30, quantity: 2 });
  expect(create.status).toBe(201);
  const id = create.body._id;

  const buy1 = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`);
  expect(buy1.status).toBe(200);
  expect(buy1.body.quantity).toBe(1);

  const buy2 = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`);
  expect(buy2.status).toBe(200);
  expect(buy2.body.quantity).toBe(0);

  const buy3 = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`);
  expect(buy3.status).toBe(400);
});

test('admin can restock and delete', async () => {
  const adminToken = await registerAndLogin('admin');
  const create = await request(app).post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Gulab', category: 'Syrup', price: 25, quantity: 0 });
  expect(create.status).toBe(201);
  const id = create.body._id;

  const restock = await request(app).post(`/api/sweets/${id}/restock`)
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ amount: 5 });
  expect(restock.status).toBe(200);
  expect(restock.body.quantity).toBe(5);

  const del = await request(app).delete(`/api/sweets/${id}`).set('Authorization', `Bearer ${adminToken}`);
  expect(del.status).toBe(204);
});
test('search sweets by name', async () => {
  const token = await registerAndLogin('user');

  await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Peda', category: 'Milk', price: 20, quantity: 5 });

  const res = await request(app).get('/api/sweets/search?q=Peda');
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe('Peda');
});

