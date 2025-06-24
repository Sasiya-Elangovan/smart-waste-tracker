const Pickup = require('../../models/Pickup');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const pickupRoutes = require('../../routes/pickupRoutes');
jest.setTimeout(15000); 


const app = express();
app.use(express.json());
app.use('/api/pickups', pickupRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop(); 
  }
});



test('POST /api/pickups should create a pickup', async () => {
  const res = await request(app)
    .post('/api/pickups')
    .send({
      houseNumber: '789A',
      date: '2025-06-23',
      wasteType: 'dry',
      status: 'pending',
      feedback: 'None',
    });
  expect(res.statusCode).toBe(201);
  expect(res.body.houseNumber).toBe('789A');
});
