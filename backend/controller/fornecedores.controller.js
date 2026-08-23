const Fornecedor = require('../models/Fornecedor')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Fornecedor.create(valores)
        res.status(200).json({ message: 'Fornecedor cadastrado com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar fornecedor:', err)
        res.status(500).json({ message: 'Erro ao cadastrar fornecedor' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Fornecedor.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar fornecedores:', err)
        res.status(400).json({ message: 'Erro ao listar fornecedores' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Fornecedor.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Fornecedor não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar fornecedor:', err)
        res.status(400).json({ message: 'Erro ao consultar fornecedor' })
    }
}

const consultarCnpj = async (req, res) => {
    const cnpj = req.params.cnpj
    try {
        const dados = await Fornecedor.findOne({ where: { cnpj } })
        if (!dados) return res.status(404).json({ message: 'Fornecedor não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar fornecedor por CNPJ:', err)
        res.status(400).json({ message: 'Erro ao consultar fornecedor' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Fornecedor.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Fornecedor não encontrado' })
        await Fornecedor.destroy({ where: { codFornecedor: id } })
        res.status(200).json({ message: 'Fornecedor excluído com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir fornecedor:', err)
        res.status(400).json({ message: 'Erro ao excluir fornecedor' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Fornecedor.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Fornecedor não encontrado' })
        await Fornecedor.update(valores, { where: { codFornecedor: id } })
        dados = await Fornecedor.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar fornecedor:', err)
        res.status(400).json({ message: 'Erro ao atualizar fornecedor' })
    }
}

module.exports = { cadastrar, listar, consultarPK, consultarCnpj, apagar, atualizar }