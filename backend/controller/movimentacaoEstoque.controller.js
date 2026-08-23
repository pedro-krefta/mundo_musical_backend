const MovimentacaoEstoque = require('../models/movimentacaoestoque')

// Registrar movimentação
const registrar = async (req, res) => {
    const { idProduto, tipoMovimentacao, quantidade, motivo } = req.body
    try {
        const movimentacao = await MovimentacaoEstoque.create({
            idProduto,
            tipoMovimentacao,
            quantidade,
            motivo
        })
        res.status(201).json(movimentacao)
    } catch (err) {
        console.error('Erro ao registrar movimentação:', err)
        res.status(500).json({ message: 'Erro ao registrar movimentação' })
    }
}

// Listar movimentações de um produto
const listarPorProduto = async (req, res) => {
    const idProduto = req.params.idProduto
    try {
        const movimentacoes = await MovimentacaoEstoque.findAll({
            where: { idProduto },
            order: [['dataMovimentacao', 'DESC']]
        })
        res.status(200).json(movimentacoes)
    } catch (err) {
        console.error('Erro ao listar movimentações:', err)
        res.status(400).json({ message: 'Erro ao listar movimentações' })
    }
}

module.exports = { registrar, listarPorProduto }