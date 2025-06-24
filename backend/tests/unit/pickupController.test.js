const pickupController = require('../../controllers/pickupController');
const Pickup = require('../../models/Pickup');
jest.mock('../../models/Pickup');

describe('createPickup', () => {
  it('should create and return a pickup', async () => {
    const mockReq = { body: { houseNumber: '123A' } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockSave = jest.fn().mockResolvedValue(mockReq.body);
    Pickup.mockImplementation(() => ({ save: mockSave }));

    await pickupController.createPickup(mockReq, mockRes);

    expect(mockSave).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
  });

  it('should handle error on createPickup', async () => {
    const mockReq = { body: { houseNumber: '123A' } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockSave = jest.fn().mockRejectedValue(new Error('Save failed'));
    Pickup.mockImplementation(() => ({ save: mockSave }));

    await pickupController.createPickup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Save failed' });
  });
});

describe('getPickups', () => {
  it('should return all pickups', async () => {
    const pickups = [{ houseNumber: '123A' }];
    Pickup.find.mockResolvedValue(pickups);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.getPickups(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pickups);
  });

  it('should handle error on getPickups', async () => {
    Pickup.find.mockRejectedValue(new Error('Fetch failed'));

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.getPickups(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetch failed' });
  });
});

describe('getPickupById', () => {
  it('should return a pickup by ID', async () => {
    const pickup = { houseNumber: '123A' };
    Pickup.findById.mockResolvedValue(pickup);

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.getPickupById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pickup);
  });

  it('should return 404 if pickup not found', async () => {
    Pickup.findById.mockResolvedValue(null);

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.getPickupById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pickup not found' });
  });

  it('should handle error on getPickupById', async () => {
    Pickup.findById.mockRejectedValue(new Error('Fetch failed'));

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.getPickupById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetch failed' });
  });
});

describe('updatePickup', () => {
  it('should update and return the pickup', async () => {
    const updated = { houseNumber: '123A', status: 'done' };
    Pickup.findByIdAndUpdate.mockResolvedValue(updated);

    const req = {
      params: { id: '1' },
      body: { houseNumber: '123A', date: '2025-06-21', wasteType: 'wet', feedback: 'ok' },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.updatePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('should return 404 if pickup not found on update', async () => {
    Pickup.findByIdAndUpdate.mockResolvedValue(null);

    const req = { params: { id: '123' }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.updatePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pickup not found' });
  });

  it('should handle error on updatePickup', async () => {
    Pickup.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

    const req = { params: { id: '123' }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.updatePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Update failed' });
  });
});

describe('deletePickup', () => {
  it('should delete a pickup', async () => {
    Pickup.findByIdAndDelete.mockResolvedValue(true);

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.deletePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pickup deleted successfully' });
  });

  it('should return 404 if pickup not found on delete', async () => {
    Pickup.findByIdAndDelete.mockResolvedValue(null);

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.deletePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pickup not found' });
  });

  it('should handle error on deletePickup', async () => {
    Pickup.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await pickupController.deletePickup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Delete failed' });
  });
});
