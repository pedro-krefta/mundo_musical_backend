const ItemCarrinho = require('../models/itemcarrinho')

const ItemCarrinho = require('../models/itemcarrinho')
const Carrinho = require('../models/carrinho')
const Produto = require('../models/produto')

const cadastrar = async (req, res) => {
    try {
        const { idCarrinho, idProduto, quantidade } = req.body

        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ message: 'Quantidade inválida!' })
        }

        const carrinho = await Carrinho.findByPk(idCarrinho)
        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado!' })
        }

        const produto = await Produto.findByPk(idProduto)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }

        const itemExistente = await ItemCarrinho.findOne({
            where: { idCarrinho, idProduto }
        })

        if (itemExistente) {
            itemExistente.quantidade += quantidade
            itemExistente.precoUnitario = produto.preco
            await itemExistente.save()

            return res.status(200).json({
                message: 'Quantidade atualizada no carrinho!',
                item: itemExistente
            })
        }

        const novoItem = await ItemCarrinho.create({
            idCarrinho,
            idProduto,
            quantidade,
            precoUnitario: produto.preco
        })

        return res.status(201).json({
            message: 'Item adicionado ao carrinho!',
            item: novoItem
        })

    } catch (err) {
        console.error('Erro ao adicionar item:', err)
        return res.status(500).json({ message: 'Erro ao adicionar item ao carrinho' })
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