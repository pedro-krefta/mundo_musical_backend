const Log = require('../models/log')

// Listar todos os logs
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

// Listar logs de um usuário
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

module.exports = { listar, listarPorUsuario }