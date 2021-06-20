const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
});