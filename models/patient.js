const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    balance: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            patientId: mongoose.Schema.Types.ObjectId,
            doctorId: mongoose.Schema.Types.ObjectId,
            amount: Number,
            description: String,
            date: { type: Date, default: Date.now }
        }
    ],
    prescriptions: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            doctorId: mongoose.Schema.Types.ObjectId,
            description: String,
            date: { type: Date, default: Date.now }
        }
    ],
    paid: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            patientId: mongoose.Schema.Types.ObjectId,
            doctorId: mongoose.Schema.Types.ObjectId,
            amount: Number,
            description: String,
            date: { type: Date, default: Date.now }
        }
    ],

}, { usePushEach: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
