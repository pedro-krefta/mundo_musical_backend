const ItemPedido = require('../models/itempedido')

// Listar itens de um pedido
const listarPorPedido = async (req, res) => {
    const idPedido = req.params.idPedido
    try {
        const itens = await ItemPedido.findAll({ where: { idPedido } })
        res.status(200).json(itens)
    } catch (err) {
        console.error('Erro ao listar itens do pedido:', err)
        res.status(400).json({ message: 'Erro ao listar itens do pedido' })
    }
}

// Consultar um item específico
const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const item = await ItemPedido.findByPk(id)
        if (!item) return res.status(404).json({ message: 'Item não encontrado' })
        res.status(200).json(item)
    } catch (err) {
        console.error('Erro ao consultar item:', err)
        res.status(400).json({ message: 'Erro ao consultar item' })
    }
}

module.exports = { listarPorPedido, consultarPK }