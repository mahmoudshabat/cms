const mongoose = require('mongoose')

const cashierSchema = mongoose.Schema({
});

const Cashier = mongoose.model("Cashier", cashierSchema);

module.exports = Cashier;