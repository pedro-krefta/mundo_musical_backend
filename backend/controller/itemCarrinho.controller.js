const ItemCarrinho = require('../models/itemcarrinho')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await ItemCarrinho.create(valores)
        res.status(200).json({ message: 'Item adicionado ao carrinho com sucesso' })
    } catch (err) {
        console.error('Erro ao adicionar item ao carrinho:', err)
        res.status(500).json({ message: 'Erro ao adicionar item ao carrinho' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await ItemCarrinho.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar itens do carrinho:', err)
        res.status(400).json({ message: 'Erro ao listar itens do carrinho' })
    }
}

const listarPorCarrinho = async (req, res) => {
    const idCarrinho = req.params.idCarrinho
    try {
        const dados = await ItemCarrinho.findAll({ where: { idCarrinho } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar itens do carrinho:', err)
        res.status(400).json({ message: 'Erro ao listar itens do carrinho' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await ItemCarrinho.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Item não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar item:', err)
        res.status(400).json({ message: 'Erro ao consultar item' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await ItemCarrinho.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Item não encontrado' })
        await ItemCarrinho.destroy({ where: { codItemCarrinho: id } })
        res.status(200).json({ message: 'Item removido do carrinho com sucesso' })
    } catch (err) {
        console.error('Erro ao remover item:', err)
        res.status(400).json({ message: 'Erro ao remover item' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await ItemCarrinho.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Item não encontrado' })
        await ItemCarrinho.update(valores, { where: { codItemCarrinho: id } })
        dados = await ItemCarrinho.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar item:', err)
        res.status(400).json({ message: 'Erro ao atualizar item' })
    }
}

module.exports = { cadastrar, listar, listarPorCarrinho, consultarPK, apagar, atualizar }