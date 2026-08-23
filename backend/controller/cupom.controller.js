const Cupom = require('../models/cupom')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Cupom.create(valores)
        res.status(200).json({ message: 'Cupom cadastrado com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar cupom:', err)
        res.status(500).json({ message: 'Erro ao cadastrar cupom' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Cupom.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar cupons:', err)
        res.status(400).json({ message: 'Erro ao listar cupons' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Cupom.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Cupom não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar cupom:', err)
        res.status(400).json({ message: 'Erro ao consultar cupom' })
    }
}

const consultarCodigo = async (req, res) => {
    const codigo = req.params.codigo
    try {
        const dados = await Cupom.findOne({ where: { codigoCupom: codigo } })
        if (!dados) return res.status(404).json({ message: 'Cupom não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar cupom por código:', err)
        res.status(400).json({ message: 'Erro ao consultar cupom' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Cupom.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Cupom não encontrado' })
        await Cupom.destroy({ where: { codCupom: id } })
        res.status(200).json({ message: 'Cupom excluído com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir cupom:', err)
        res.status(400).json({ message: 'Erro ao excluir cupom' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Cupom.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Cupom não encontrado' })
        await Cupom.update(valores, { where: { codCupom: id } })
        dados = await Cupom.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar cupom:', err)
        res.status(400).json({ message: 'Erro ao atualizar cupom' })
    }
}

module.exports = { cadastrar, listar, consultarPK, consultarCodigo, apagar, atualizar }