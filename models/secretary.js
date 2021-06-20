const mongoose = require('mongoose');

const secretarySchema = mongoose.Schema({
});

const Secretary = mongoose.model('Secretary', secretarySchema)

module.exports = Secretary;