var mongoose = require('mongoose')

var periodoSchema = new mongoose.Schema({
    _id: String,
    start: Number,
    end: Number
}, {collection: 'Periodos', versionKey: false})

module.exports = mongoose.model('periodo', periodoSchema)