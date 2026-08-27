const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = require('./produto')

const Estoque = db.define('estoque', {
    codEstoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidadeDisponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    quantidadeMinima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    localizacao: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    ultimaAtualizacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Produto,
            key: 'codProduto'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'estoque'
})

module.exports = Estoque