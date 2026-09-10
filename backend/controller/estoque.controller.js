const Estoque = require('../models/estoque')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const estoque = await Estoque.create(valores)
        res.status(201).json({ message: 'Estoque cadastrado com sucesso', estoque })
    } catch (err) {
        console.error('Erro ao cadastrar estoque:', err)
        res.status(500).json({ message: 'Erro ao cadastrar estoque' })
    }
}

const listar = async (req, res) => {
    try {
        const estoques = await Estoque.findAll()
        res.status(200).json(estoques)
    } catch (err) {
        console.error('Erro ao listar estoques:', err)
        res.status(400).json({ message: 'Erro ao listar estoques' })
    }
}

const buscarPorProduto = async (req, res) => {
    const idProduto = req.params.idProduto
    try {
        const estoque = await Estoque.findOne({ where: { idProduto } })
        if (!estoque) return res.status(404).json({ message: 'Estoque não encontrado' })
        res.status(200).json(estoque)
    } catch (err) {
        console.error('Erro ao buscar estoque:', err)
        res.status(400).json({ message: 'Erro ao buscar estoque' })
    }
}

const atualizarQuantidade = async (req, res) => {
    const id = req.params.id
    const { quantidadeDisponivel } = req.body
    try {
        const estoque = await Estoque.findByPk(id)
        if (!estoque) return res.status(404).json({ message: 'Estoque não encontrado' })
        await Estoque.update({ quantidadeDisponivel }, { where: { codEstoque: id } })
        res.status(200).json({ message: 'Quantidade atualizada com sucesso' })
    } catch (err) {
        console.error('Erro ao atualizar estoque:', err)
        res.status(400).json({ message: 'Erro ao atualizar estoque' })
    }
}

module.exports = { cadastrar, listar, buscarPorProduto, atualizarQuantidade }