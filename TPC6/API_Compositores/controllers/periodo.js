var Periodo = require('../models/periodo')

module.exports.list = () => {
    return Periodo.find().sort({_id: 1}).exec()
}

module.exports.findById = id => {
    return Periodo.findOne({_id: id}).exec()
}

module.exports.create = periodo => {
    return Periodo.create(periodo)
}

module.exports.update = (id, periodo) => {
    return Periodo.updateOne({_id: id}, periodo)
}

module.exports.delete = id => {
    return Periodo.deleteOne({_id: id})
}