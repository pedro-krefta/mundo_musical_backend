const CompraFornecedor = require('../models/comprafornecedor')
const ItemCompraFornecedor = require('../models/itemcomprafornecedor')
const Estoque = require('../models/estoque')
const conn = require('../db/conn')

const cadastrar = async (req, res) => {
    const { itens, ...dadosCompra } = req.body
    const t = await conn.transaction()
    try {
        const compra = await CompraFornecedor.create(dadosCompra, { transaction: t })

        if (Array.isArray(itens) && itens.length > 0) {
            for (const item of itens) {
                const { idProduto, quantidade, precoUnitario } = item

                await ItemCompraFornecedor.create({
                    idCompra: compra.codCompra,
                    idProduto,
                    quantidade,
                    precoUnitario
                }, { transaction: t })

                const estoque = await Estoque.findOne({ where: { idProduto }, transaction: t })
                if (estoque) {
                    estoque.quantidadeDisponivel += quantidade
                    await estoque.save({ transaction: t })
                }
            }
        }

        await t.commit()

        const compraCompleta = await CompraFornecedor.findByPk(compra.codCompra, {
            include: [{ model: ItemCompraFornecedor, as: 'itensDaCompra' }]
        })

        res.status(201).json({ message: 'Compra registrada com sucesso', compra: compraCompleta })
    } catch (err) {
        await t.rollback()
        console.error('Erro ao registrar compra:', err)
        res.status(500).json({ message: err.message || 'Erro ao registrar compra' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await CompraFornecedor.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar compras:', err)
        res.status(400).json({ message: 'Erro ao listar compras' })
    }
}


const listarPorFornecedor = async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    try {
        const dados = await CompraFornecedor.findAll({
            where: { idFornecedor },
            include: [{ model: ItemCompraFornecedor, as: 'itensDaCompra' }]
        })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar compras do fornecedor:', err)
        res.status(400).json({ message: 'Erro ao listar compras do fornecedor' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await CompraFornecedor.findByPk(id, {
            include: [{ model: ItemCompraFornecedor, as: 'itensDaCompra' }]
        })
        if (!dados) return res.status(404).json({ message: 'Compra não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar compra:', err)
        res.status(400).json({ message: 'Erro ao consultar compra' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await CompraFornecedor.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Compra não encontrada' })
        await CompraFornecedor.destroy({ where: { codCompra: id } })
        res.status(200).json({ message: 'Compra excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir compra:', err)
        res.status(400).json({ message: 'Erro ao excluir compra' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await CompraFornecedor.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Compra não encontrada' })
        await CompraFornecedor.update(valores, { where: { codCompra: id } })
        dados = await CompraFornecedor.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar compra:', err)
        res.status(400).json({ message: 'Erro ao atualizar compra' })
    }
}

module.exports = { cadastrar, listar, listarPorFornecedor, consultarPK, apagar, atualizar }