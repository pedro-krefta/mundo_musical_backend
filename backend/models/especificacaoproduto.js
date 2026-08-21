const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = require('./Produto')

const EspecificacaoProduto = db.define('especificacao_produto', {
    codEspecificacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeEspecificacao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    valorEspecificacao: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'codProduto'
        }
    }
}, {
    timestamps: false,
    tableName: 'especificacoes_produto'
})

module.exports = EspecificacaoProduto