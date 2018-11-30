var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cwSchema = new Schema({
    id : String,
    title: String,
    write: String,
    pass: String,
    type: String,
    pro: String,
    sub: String
});

module.exports = mongoose.model('cw', cwSchema);
//
