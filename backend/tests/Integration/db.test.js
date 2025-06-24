
const Pickup = require('../../models/Pickup');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
jest.setTimeout(15000); 

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('Create and find a pickup in DB', async () => {
  const data = { houseNumber: '456Z', date: new Date(), status: 'pending' };
  await Pickup.create(data);
  const result = await Pickup.findOne({ houseNumber: '456Z' });
  expect(result.status).toBe('pending');
});
