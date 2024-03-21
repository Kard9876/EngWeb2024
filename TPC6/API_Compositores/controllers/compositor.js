var Compositor = require('../models/compositor')

module.exports.list =  () => {
    return Compositor.find().sort({_id: 1}).exec()
}

module.exports.listPeriod = periodo => {
    return Compositor.find({periodo: periodo}).sort({_id: 1}).exec()
}

module.exports.findById = id => {
    return Compositor.findOne({_id: id}).exec()
}

module.exports.create = periodo => {
    return Compositor.create(periodo)
}

module.exports.update = (id, compositor) => {
    return Compositor.updateOne({_id: id}, compositor)
}

module.exports.delete = id => {
    return Compositor.deleteOne({_id: id})
}