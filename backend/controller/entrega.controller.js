const Entrega = require('../models/entrega')

const criar = async (req, res) => {
    const { idPedido, transportadora, codigoRastreio } = req.body
    try {
        const entrega = await Entrega.create({
            idPedido,
            transportadora,
            codigoRastreio,
            statusEntrega: 'PREPARANDO'
        })
        res.status(201).json(entrega)
    } catch (err) {
        console.error('Erro ao criar entrega:', err)
        res.status(500).json({ message: 'Erro ao criar entrega' })
    }
}

const atualizarStatus = async (req, res) => {
    const id = req.params.id
    const { statusEntrega, dataEnvio, dataEntregaRealizada } = req.body
    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) return res.status(404).json({ message: 'Entrega não encontrada' })
        await Entrega.update(
            { statusEntrega, dataEnvio, dataEntregaRealizada },
            { where: { codEntrega: id } }
        )
        res.status(200).json({ message: 'Entrega atualizada com sucesso' })
    } catch (err) {
        console.error('Erro ao atualizar entrega:', err)
        res.status(400).json({ message: 'Erro ao atualizar entrega' })
    }
}

const consultarpedido = async (req, res) => {
    const idPedido = req.params.idPedido
    try {
        const entrega = await Entrega.findOne({ where: { idPedido } })
        res.status(200).json(entrega)
    } catch (err) {
        console.error('Erro ao listar entrega:', err)
        res.status(400).json({ message: 'Erro ao listar entrega' })
    }
}

module.exports = { criar, atualizarStatus, consultarpedido }