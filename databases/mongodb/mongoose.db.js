const mongoose = require('mongoose')
const cfg = require('../../config/app.config')

mongoose.connect(cfg.mongoDNS, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(err);
    process.exit();
});

const db = mongoose.connection

module.exports = db
