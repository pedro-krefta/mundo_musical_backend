const Categoria = require('../models/categoria')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Categoria.create(valores)
        res.status(200).json({ message: 'Categoria cadastrada com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar categoria:', err)
        res.status(500).json({ message: 'Erro ao cadastrar categoria' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Categoria.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar categorias:', err)
        res.status(400).json({ message: 'Erro ao listar categorias' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Categoria.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Categoria não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar categoria:', err)
        res.status(400).json({ message: 'Erro ao consultar categoria' })
    }
}

const consultarNome = async (req, res) => {
    const nome = req.params.nome
    try {
        const dados = await Categoria.findOne({ where: { nomeCategoria: nome } })
        if (!dados) return res.status(404).json({ message: 'Categoria não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar categoria por nome:', err)
        res.status(400).json({ message: 'Erro ao consultar categoria' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Categoria.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Categoria não encontrada' })
        await Categoria.destroy({ where: { codCategoria: id } })
        res.status(200).json({ message: 'Categoria excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir categoria:', err)
        res.status(400).json({ message: 'Erro ao excluir categoria' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Categoria.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Categoria não encontrada' })
        await Categoria.update(valores, { where: { codCategoria: id } })
        dados = await Categoria.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar categoria:', err)
        res.status(400).json({ message: 'Erro ao atualizar categoria' })
    }
}

module.exports = { cadastrar, listar, consultarPK, consultarNome, apagar, atualizar }