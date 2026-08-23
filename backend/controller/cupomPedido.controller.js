const CupomPedido = require('../models/cupompedido')

// Aplicar cupom em um pedido
const aplicar = async (req, res) => {
    const { idCupom, idPedido, valorDescontoAplicado } = req.body
    try {
        const cupomPedido = await CupomPedido.create({
            idCupom,
            idPedido,
            valorDescontoAplicado
        })
        res.status(201).json(cupomPedido)
    } catch (err) {
        console.error('Erro ao aplicar cupom:', err)
        res.status(500).json({ message: 'Erro ao aplicar cupom' })
    }
}

// Listar cupons aplicados em um pedido
const listarPorPedido = async (req, res) => {
    const idPedido = req.params.idPedido
    try {
        const cupons = await CupomPedido.findAll({ where: { idPedido } })
        res.status(200).json(cupons)
    } catch (err) {
        console.error('Erro ao listar cupons do pedido:', err)
        res.status(400).json({ message: 'Erro ao listar cupons do pedido' })
    }
}

// Remover cupom de um pedido
const remover = async (req, res) => {
    const id = req.params.id
    try {
        const cupomPedido = await CupomPedido.findByPk(id)
        if (!cupomPedido) return res.status(404).json({ message: 'Cupom não encontrado' })
        await CupomPedido.destroy({ where: { codCupomPedido: id } })
        res.status(200).json({ message: 'Cupom removido com sucesso' })
    } catch (err) {
        console.error('Erro ao remover cupom:', err)
        res.status(400).json({ message: 'Erro ao remover cupom' })
    }
}

module.exports = { aplicar, listarPorPedido, remover }