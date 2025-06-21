const mongoose=require('mongoose');
const pickupSchema = new mongoose.Schema({
    houseNumber:String,
    date:Date,
    wasteType:String,
    status:String,
    feedback:String,});
module.exports=mongoose.model('Pickup', pickupSchema);