const Pagamento = require('../models/pagamento')

const criar = async (req, res) => {
    const { idPedido, formaPagamento, valorPago } = req.body
    try {
        const pagamento = await Pagamento.create({
            idPedido,
            formaPagamento,
            valorPago,
            statusPagamento: 'PENDENTE'
        })
        res.status(201).json(pagamento)
    } catch (err) {
        console.error('Erro ao criar pagamento:', err)
        res.status(500).json({ message: 'Erro ao criar pagamento' })
    }
}

const atualizarStatus = async (req, res) => {
    const id = req.params.id
    const { statusPagamento } = req.body
    try {
        const pagamento = await Pagamento.findByPk(id)
        if (!pagamento) return res.status(404).json({ message: 'Pagamento não encontrado' })
        await Pagamento.update({ statusPagamento }, { where: { codPagamento: id } })
        res.status(200).json({ message: 'Status do pagamento atualizado' })
    } catch (err) {
        console.error('Erro ao atualizar pagamento:', err)
        res.status(400).json({ message: 'Erro ao atualizar pagamento' })
    }
}

const consultarpedido = async (req, res) => {
    const idPedido = req.params.idPedido
    try {
        const pagamento = await Pagamento.findOne({ where: { idPedido } })
        res.status(200).json(pagamento)
    } catch (err) {
        console.error('Erro ao listar pagamento:', err)
        res.status(400).json({ message: 'Erro ao listar pagamento' })
    }
}

module.exports = { criar, atualizarStatus, consultarpedido }