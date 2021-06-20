const mongoose = require('mongoose');

const requestedAppointmentsSchema = mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    message: String,

}, {usePushEach: true});

const RequestedAppointment = mongoose.model("RequestedAppointment", requestedAppointmentsSchema);

module.exports = RequestedAppointment;