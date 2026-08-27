const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = require('./produto')

const MovimentacaoEstoque = db.define('movimentacao_estoque', {
    codMovimentacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoMovimentacao: {
        type: DataTypes.ENUM('ENTRADA', 'SAIDA'),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataMovimentacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    motivo: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'codProduto'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'movimentacoes_estoque'
})

module.exports = MovimentacaoEstoque