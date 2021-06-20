const mongoose = require('mongoose');

const waitingListSchema = mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
}, { usePushEach: true });

const WaitingList= mongoose.model("WaitingList", waitingListSchema);

module.exports = WaitingList;