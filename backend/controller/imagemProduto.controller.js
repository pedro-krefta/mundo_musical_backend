const ImagemProduto = require('../models/imagemproduto')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await ImagemProduto.create(valores)
        res.status(200).json({ message: 'Imagem cadastrada com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar imagem:', err)
        res.status(500).json({ message: 'Erro ao cadastrar imagem' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await ImagemProduto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar imagens:', err)
        res.status(400).json({ message: 'Erro ao listar imagens' })
    }
}

const listarPorProduto = async (req, res) => {
    const idProduto = req.params.idProduto
    try {
        const dados = await ImagemProduto.findAll({ where: { idProduto } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar imagens do produto:', err)
        res.status(400).json({ message: 'Erro ao listar imagens' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await ImagemProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Imagem não encontrada' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar imagem:', err)
        res.status(400).json({ message: 'Erro ao consultar imagem' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await ImagemProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Imagem não encontrada' })
        await ImagemProduto.destroy({ where: { codImagem: id } })
        res.status(200).json({ message: 'Imagem excluída com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir imagem:', err)
        res.status(400).json({ message: 'Erro ao excluir imagem' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await ImagemProduto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Imagem não encontrada' })
        await ImagemProduto.update(valores, { where: { codImagem: id } })
        dados = await ImagemProduto.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar imagem:', err)
        res.status(400).json({ message: 'Erro ao atualizar imagem' })
    }
}

module.exports = { cadastrar, listar, listarPorProduto, consultarPK, apagar, atualizar }