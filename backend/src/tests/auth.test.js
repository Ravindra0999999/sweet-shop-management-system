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

test('register then login', async () => {
  const reg = await request(app).post('/api/auth/register').send({
    name: 'Ravindra', email: 'ravi@example.com', password: 'pass123'
  });
  expect(reg.status).toBe(201);

  const login = await request(app).post('/api/auth/login').send({
    email: 'ravi@example.com', password: 'pass123'
  });
  expect(login.status).toBe(200);
  expect(login.body).toHaveProperty('token');
});
