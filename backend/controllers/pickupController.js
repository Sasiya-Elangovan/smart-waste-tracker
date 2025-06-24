const Pickup = require('../models/Pickup');

exports.createPickup = async (req, res) => {
    const pickup = new Pickup(req.body);
    try {
        const savedPickup = await pickup.save();
        res.status(201).json(savedPickup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find();
        res.status(200).json(pickups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

exports.updatePickup = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Pickup.findByIdAndUpdate(
      id,
      {
        houseNumber: req.body.houseNumber,
        date: req.body.date,
        wasteType: req.body.wasteType,
        feedback: req.body.feedback
      },
      { new: true } 
    );

    if (!updated) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePickup = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pickup.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Pickup not found" });
    }
    res.status(200).json({ message: "Pickup deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPickupById = async (req, res) => {
    const { id } = req.params;
    try {
        const pickup = await Pickup.findById(id);
        if (!pickup) {
            return res.status(404).json({ message: "Pickup not found" });
        }
        res.status(200).json(pickup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





