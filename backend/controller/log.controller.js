const Log = require('../models/log')

const cadastrar = async (req, res) => {
    const { acao, tabelaAfetada, detalhes, idUsuario } = req.body
    try {
        const log = await Log.create({ acao, tabelaAfetada, detalhes, idUsuario })
        res.status(201).json(log)
    } catch (err) {
        console.error('Erro ao registrar log:', err)
        res.status(500).json({ message: 'Erro ao registrar log' })
    }
}

const listar = async (req, res) => {
    try {
        const logs = await Log.findAll({
            order: [['dataHora', 'DESC']]
        })
        res.status(200).json(logs)
    } catch (err) {
        console.error('Erro ao listar logs:', err)
        res.status(400).json({ message: 'Erro ao listar logs' })
    }
}

const listarPorUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario
    try {
        const logs = await Log.findAll({
            where: { idUsuario },
            order: [['dataHora', 'DESC']]
        })
        res.status(200).json(logs)
    } catch (err) {
        console.error('Erro ao listar logs do usuário:', err)
        res.status(400).json({ message: 'Erro ao listar logs' })
    }
}

module.exports = { cadastrar, listar, listarPorUsuario }