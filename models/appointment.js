const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    date: Date,
    description: String,
}, { usePushEach: true });

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment;