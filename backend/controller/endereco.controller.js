const Endereco = require('../models/endereco')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        await Endereco.create(valores)
        res.status(200).json({ message: 'Endereço cadastrado com sucesso' })
    } catch (err) {
        console.error('Erro ao cadastrar endereço:', err)
        res.status(500).json({ message: 'Erro ao cadastrar endereço' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Endereco.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar endereços:', err)
        res.status(400).json({ message: 'Erro ao listar endereços' })
    }
}

const listarPorUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario
    try {
        const dados = await Endereco.findAll({ where: { idUsuario } })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar endereços por usuário:', err)
        res.status(400).json({ message: 'Erro ao listar endereços' })
    }
}

const consultarPK = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Endereco.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Endereço não encontrado' })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar endereço:', err)
        res.status(400).json({ message: 'Erro ao consultar endereço' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Endereco.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Endereço não encontrado' })
        await Endereco.destroy({ where: { codEndereco: id } })
        res.status(200).json({ message: 'Endereço excluído com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir endereço:', err)
        res.status(400).json({ message: 'Erro ao excluir endereço' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Endereco.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Endereço não encontrado' })
        await Endereco.update(valores, { where: { codEndereco: id } })
        dados = await Endereco.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar endereço:', err)
        res.status(400).json({ message: 'Erro ao atualizar endereço' })
    }
}

module.exports = { cadastrar, listar, listarPorUsuario, consultarPK, apagar, atualizar }