const EspecificacaoProduto = require('../models/especificacaoproduto')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await EspecificacaoProduto.create(valores)
        res.status(200).json({ message: 'Especificação cadastrada com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar especificação:', err)
        res.status(500).json({ message: 'Erro ao cadastrar especificação' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await EspecificacaoProduto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar especificações:', err)
        res.status(400).json({ message: 'Erro ao listar especificações' })
    }
}

const listarPorProduto = async (req, res) => {
    const idProduto = req.params.idProduto
    try {
        const dados = await EspecificacaoProduto.findAll({ where: { idProduto } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar especificações do produto:', err)
        res.status(400).json({ message: 'Erro ao listar especificações' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await EspecificacaoProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Especificação não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar especificação:', err)
        res.status(400).json({ message: 'Erro ao consultar especificação' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await EspecificacaoProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Especificação não encontrada' })
        await EspecificacaoProduto.destroy({ where: { codEspecificacao: id } })
        res.status(200).json({ message: 'Especificação excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir especificação:', err)
        res.status(400).json({ message: 'Erro ao excluir especificação' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await EspecificacaoProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Especificação não encontrada' })
        await EspecificacaoProduto.update(valores, { where: { codEspecificacao: id } })
        dados = await EspecificacaoProduto.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar especificação:', err)
        res.status(400).json({ message: 'Erro ao atualizar especificação' })
    }
}

module.exports = { cadastrar, listar, listarPorProduto, consultarPK, apagar, atualizar }