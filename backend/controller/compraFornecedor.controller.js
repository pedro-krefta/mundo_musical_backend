const CompraFornecedor = require('../models/comprafornecedor')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await CompraFornecedor.create(valores)
        res.status(200).json({ message: 'Compra registrada com sucesso' })
    } catch (err) {
        console.error('Erro ao registrar compra:', err)
        res.status(500).json({ message: 'Erro ao registrar compra' })
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

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await CompraFornecedor.findByPk(id)
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

module.exports = { cadastrar, listar, consultarPK, apagar, atualizar }