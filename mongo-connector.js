const mongoose = require('mongoose');
const models= require('./models');

const MONGO_URL = 'mongodb://mongo:27017/cms-database';


module.exports = async () => {
    mongoose.Promise = global.Promise;
    const db = await mongoose.connect(MONGO_URL);
    return {...models};
};