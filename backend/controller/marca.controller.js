const Marca = require('../models/marca')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Marca.create(valores)
        res.status(200).json({ message: 'Marca cadastrada com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar marca:', err)
        res.status(500).json({ message: 'Erro ao cadastrar marca' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Marca.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar marcas:', err)
        res.status(400).json({ message: 'Erro ao listar marcas' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Marca.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Marca não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar marca:', err)
        res.status(400).json({ message: 'Erro ao consultar marca' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Marca.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Marca não encontrada' })
        await Marca.destroy({ where: { codMarca: id } })
        res.status(200).json({ message: 'Marca excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir marca:', err)
        res.status(400).json({ message: 'Erro ao excluir marca' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Marca.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Marca não encontrada' })
        await Marca.update(valores, { where: { codMarca: id } })
        dados = await Marca.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar marca:', err)
        res.status(400).json({ message: 'Erro ao atualizar marca' })
    }
}

module.exports = { cadastrar, listar, consultarPK, apagar, atualizar }