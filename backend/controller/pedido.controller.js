const Pedido = require('../models/pedido')
const ItemPedido = require('../models/itempedido')
const Estoque = require('../models/estoque')
const Produto = require('../models/produto')
const Pagamento = require('../models/pagamento')
const Entrega = require('../models/entrega')
const Usuario = require('../models/usuario')
const conn = require('../db/conn')

const cadastrar = async (req, res) => {
    const { itens, ...dadosPedido } = req.body
    const t = await conn.transaction()
    try {
        const pedido = await Pedido.create(dadosPedido, { transaction: t })

        if (Array.isArray(itens) && itens.length > 0) {
            for (const item of itens) {
                const { idProduto, quantidade, precoUnitario } = item

                const estoque = await Estoque.findOne({ where: { idProduto }, transaction: t })
                if (estoque) {
                    if (estoque.quantidadeDisponivel < quantidade) {
                        throw new Error(`Estoque insuficiente para o produto ${idProduto}`)
                    }
                    estoque.quantidadeDisponivel -= quantidade
                    await estoque.save({ transaction: t })
                }

                await ItemPedido.create({
                    idPedido: pedido.codPedido,
                    idProduto,
                    quantidade,
                    precoUnitario
                }, { transaction: t })
            }
        }

        await t.commit()

        const pedidoCompleto = await Pedido.findByPk(pedido.codPedido, {
            include: [{ model: ItemPedido, as: 'itensDoPedido' }]
        })

        res.status(201).json({ message: 'Pedido criado com sucesso', pedido: pedidoCompleto })
    } catch (err) {
        await t.rollback()
        console.error('Erro ao criar pedido:', err)
        res.status(500).json({ message: err.message || 'Erro ao criar pedido' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Pedido.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar pedidos:', err)
        res.status(400).json({ message: 'Erro ao listar pedidos' })
    }
}

const listarPorUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario
    try {
        const dados = await Pedido.findAll({ where: { idUsuario } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar pedidos do usuário:', err)
        res.status(400).json({ message: 'Erro ao listar pedidos' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Pedido.findByPk(id, {
            include: [
                { model: ItemPedido, as: 'itensDoPedido' },
                { model: Pagamento, as: 'pagamentoDoPedido' },
                { model: Entrega, as: 'entregaDoPedido' }
            ]
        })
        if (!dados) return res.status(404).json({ message: 'Pedido não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar pedido:', err)
        res.status(400).json({ message: 'Erro ao consultar pedido' })
    }
}

const consultarCompleto = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Pedido.findByPk(id, {
            include: [
                {
                    model: ItemPedido,
                    as: 'itensDoPedido',
                    include: [{ model: Produto, as: 'produtoDoItemPedido' }]
                },
                { model: Pagamento, as: 'pagamentoDoPedido' },
                { model: Entrega, as: 'entregaDoPedido' },
                { model: Usuario, as: 'usuarioDoPedido', attributes: { exclude: ['senha'] } }
            ]
        })
        if (!dados) return res.status(404).json({ message: 'Pedido não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar pedido completo:', err)
        res.status(400).json({ message: 'Erro ao consultar pedido completo' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Pedido.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Pedido não encontrado' })
        await Pedido.destroy({ where: { codPedido: id } })
        res.status(200).json({ message: 'Pedido excluído com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir pedido:', err)
        res.status(400).json({ message: 'Erro ao excluir pedido' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Pedido.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Pedido não encontrado' })
        await Pedido.update(valores, { where: { codPedido: id } })
        dados = await Pedido.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err)
        res.status(400).json({ message: 'Erro ao atualizar pedido' })
    }
}

module.exports = { cadastrar, listar, listarPorUsuario, consultarPK, consultarCompleto, apagar, atualizar }