const express = require('express');
const router = express.Router();
const controller = require('../controllers/pickupController');

router.post('/', controller.createPickup);
router.get('/', controller.getPickups);
router.get('/:id', controller.getPickupById);
router.put('/:id', controller.updatePickup);
router.delete('/:id', controller.deletePickup); 

module.exports = router;
