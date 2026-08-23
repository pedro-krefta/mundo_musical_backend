const Carrinho = require('../models/Carrinho')

// Criar carrinho para um usuário
const criar = async (req, res) => {
    const { idUsuario } = req.body
    try {
        const carrinho = await Carrinho.create({
            idUsuario,
            status: 'ATIVO'
        })
        res.status(201).json(carrinho)
    } catch (err) {
        console.error('Erro ao criar carrinho:', err)
        res.status(500).json({ message: 'Erro ao criar carrinho' })
    }
}

// Buscar carrinho ativo do usuário
const buscarAtivo = async (req, res) => {
    const idUsuario = req.params.idUsuario
    try {
        const carrinho = await Carrinho.findOne({
            where: { idUsuario, status: 'ATIVO' }
        })
        if (!carrinho) return res.status(404).json({ message: 'Carrinho ativo não encontrado' })
        res.status(200).json(carrinho)
    } catch (err) {
        console.error('Erro ao buscar carrinho:', err)
        res.status(400).json({ message: 'Erro ao buscar carrinho' })
    }
}

// Finalizar ou abandonar carrinho
const atualizarStatus = async (req, res) => {
    const id = req.params.id
    const { status } = req.body
    try {
        const carrinho = await Carrinho.findByPk(id)
        if (!carrinho) return res.status(404).json({ message: 'Carrinho não encontrado' })
        await Carrinho.update({ status }, { where: { codCarrinho: id } })
        res.status(200).json({ message: 'Status do carrinho atualizado' })
    } catch (err) {
        console.error('Erro ao atualizar carrinho:', err)
        res.status(400).json({ message: 'Erro ao atualizar carrinho' })
    }
}

module.exports = { criar, buscarAtivo, atualizarStatus }