const mongoose = require('mongoose');


const personSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    gender: String,
    username: String,
    password: String,
    type: {
        type: String,
        enum: ['admin', 'patient', 'doctor', 'secretary', 'cashier']
    }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;


