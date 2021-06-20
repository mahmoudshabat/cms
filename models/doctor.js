const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    specialization: String,
    isCurrentlyBusy: Boolean,
}, { usePushEach: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;