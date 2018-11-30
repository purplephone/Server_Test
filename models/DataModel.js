var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    _id: String,
    date: String,
    tdate: String,
    subname: String
});

module.exports = mongoose.model('data', dataSchema);
