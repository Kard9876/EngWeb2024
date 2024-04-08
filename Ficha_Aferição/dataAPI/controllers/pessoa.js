const Pessoa = require('../models/pessoa')

module.exports.list = () => {
    return Pessoa.find().sort({ _id: 1 }).exec()
}

module.exports.findById = id => {
    return Pessoa.findOne({ _id: id }).exec()
}

module.exports.modalidadesList = async () => {
    let pessoas = await Pessoa.find({},{desportos: 1, _id: 0}).exec(); 
    
    return Array.from(new Set(pessoas.map((a) => a.desportos).flat())).sort();
}

module.exports.modalidade = async (id) => {
    let pessoas = await Pessoa.find({desportos: id}).exec(); 
    
    // Objeto completo do atleta
    // return Array.from(new Set(pessoas)).sort((p1, p2) => p1.nome.localeCompare(p2.nome));

    // Apenas o nome do objeto
    return Array.from(new Set(pessoas.map(p => p.nome))).sort((p1, p2) => p1.localeCompare(p2));
}

module.exports.create = pessoa => {
    return Pessoa.create(pessoa)
}

module.exports.update = (id, pessoa) => {
    return Pessoa.updateOne({ _id: id }, pessoa)
}

module.exports.delete = id => {
    return Pessoa.deleteOne({ _id: id })
}