const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./usuario')

const Log = db.define('log', {
    codLog: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    acao: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    tabelaAfetada: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    detalhes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: 'codUsuario'
        },
        onDelete: 'SET NULL'
    }
}, {
    timestamps: false,
    tableName: 'logs'
})

module.exports = Log