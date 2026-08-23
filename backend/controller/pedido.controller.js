const Pedido = require('../models/pedido')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Pedido.create(valores)
        res.status(200).json({ message: 'Pedido criado com sucesso' })
    } catch (err) {
        console.error('Erro ao criar pedido:', err)
        res.status(500).json({ message: 'Erro ao criar pedido' })
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
        const dados = await Pedido.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Pedido não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar pedido:', err)
        res.status(400).json({ message: 'Erro ao consultar pedido' })
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

module.exports = { cadastrar, listar, listarPorUsuario, consultarPK, apagar, atualizar }