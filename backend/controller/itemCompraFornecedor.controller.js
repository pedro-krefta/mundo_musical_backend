const ItemCompraFornecedor = require('../models/itemcomprafornecedor')

const listarPorCompra = async (req, res) => {
    const idCompra = req.params.idCompra
    try {
        const itens = await ItemCompraFornecedor.findAll({ where: { idCompra } })
        res.status(200).json(itens)
    } catch (err) {
        console.error('Erro ao listar itens da compra:', err)
        res.status(400).json({ message: 'Erro ao listar itens da compra' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const item = await ItemCompraFornecedor.findByPk(id)
        if (!item) return res.status(404).json({ message: 'Item não encontrado' })
        res.status(200).json(item)
    } catch (err) {
        console.error('Erro ao consultar item:', err)
        res.status(400).json({ message: 'Erro ao consultar item' })
    }
}

module.exports = { listarPorCompra, consultarPK }