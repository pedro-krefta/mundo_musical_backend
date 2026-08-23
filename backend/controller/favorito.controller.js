const Favorito = require('../models/favorito')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Favorito.create(valores)
        res.status(200).json({ message: 'Produto adicionado aos favoritos com sucesso' })
    } catch (err) {
        console.error('Erro ao adicionar favorito:', err)
        res.status(500).json({ message: 'Erro ao adicionar favorito' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Favorito.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar favoritos:', err)
        res.status(400).json({ message: 'Erro ao listar favoritos' })
    }
}

const listarPorUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario
    try {
        const dados = await Favorito.findAll({ where: { idUsuario } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar favoritos do usuário:', err)
        res.status(400).json({ message: 'Erro ao listar favoritos' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Favorito.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Favorito não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar favorito:', err)
        res.status(400).json({ message: 'Erro ao consultar favorito' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Favorito.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Favorito não encontrado' })
        await Favorito.destroy({ where: { codFavorito: id } })
        res.status(200).json({ message: 'Favorito removido com sucesso' })
    } catch (err) {
        console.error('Erro ao remover favorito:', err)
        res.status(400).json({ message: 'Erro ao remover favorito' })
    }
}

const atualizar = async (req, res) => {
    // Favorito normalmente não precisa de atualização
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Favorito.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Favorito não encontrado' })
        await Favorito.update(valores, { where: { codFavorito: id } })
        dados = await Favorito.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar favorito:', err)
        res.status(400).json({ message: 'Erro ao atualizar favorito' })
    }
}

module.exports = { cadastrar, listar, listarPorUsuario, consultarPK, apagar, atualizar }