const Carrinho = require('../models/carrinho')

const criar = async (req, res) => {
    const { idUsuario } = req.body
    try {
        const carrinhoExistente = await Carrinho.findOne({
            where: { idUsuario, status: 'ATIVO' }
        })

        if (carrinhoExistente) {
            return res.status(200).json({
                message: 'Carrinho ativo já existe. Reaproveitando...',
                carrinho: carrinhoExistente
            })
        }

        const carrinho = await Carrinho.create({
            idUsuario,
            status: 'ATIVO'
        })
        res.status(201).json({
            message: 'Carrinho criado com sucesso!',
            carrinho
        })
    } catch (err) {
        console.error('Erro ao criar carrinho:', err)
        res.status(500).json({ message: 'Erro ao criar carrinho' })
    }
}

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

const atualizarStatus = async (req, res) => {
    const id = req.params.id
    const { status } = req.body
    try {
        const carrinho = await Carrinho.findByPk(id)
        if (!carrinho) return res.status(404).json({ message: 'Carrinho não encontrado' })

        carrinho.status = status
        await carrinho.save()

        res.status(200).json({
            message: 'Status do carrinho atualizado',
            carrinho
        })
    } catch (err) {
        console.error('Erro ao atualizar carrinho:', err)
        res.status(400).json({ message: 'Erro ao atualizar carrinho' })
    }
}

module.exports = { criar, buscarAtivo, atualizarStatus }