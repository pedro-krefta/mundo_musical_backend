const Avaliacao = require('../models/avaliacao')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Avaliacao.create(valores)
        res.status(200).json({ message: 'Avaliação cadastrada com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar avaliação:', err)
        res.status(500).json({ message: 'Erro ao cadastrar avaliação' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Avaliacao.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar avaliações:', err)
        res.status(400).json({ message: 'Erro ao listar avaliações' })
    }
}

const listarPorProduto = async (req, res) => {
    const idProduto = req.params.idProduto
    try {
        const dados = await Avaliacao.findAll({ where: { idProduto } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar avaliações do produto:', err)
        res.status(400).json({ message: 'Erro ao listar avaliações' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Avaliacao.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Avaliação não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar avaliação:', err)
        res.status(400).json({ message: 'Erro ao consultar avaliação' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Avaliacao.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Avaliação não encontrada' })
        await Avaliacao.destroy({ where: { codAvaliacao: id } })
        res.status(200).json({ message: 'Avaliação excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir avaliação:', err)
        res.status(400).json({ message: 'Erro ao excluir avaliação' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Avaliacao.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Avaliação não encontrada' })
        await Avaliacao.update(valores, { where: { codAvaliacao: id } })
        dados = await Avaliacao.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar avaliação:', err)
        res.status(400).json({ message: 'Erro ao atualizar avaliação' })
    }
}

module.exports = { cadastrar, listar, listarPorProduto, consultarPK, apagar, atualizar }