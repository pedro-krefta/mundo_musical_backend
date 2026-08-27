const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Categoria = require('./categoria')
const Marca = require('./marca')
const Fornecedor = require('./fornecedor')

const Produto = db.define('produto', {
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeProduto: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    dataCadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Categoria,
            key: 'codCategoria'
        },
        onDelete: 'SET NULL'
    },
    idMarca: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Marca,
            key: 'codMarca'
        },
        onDelete: 'SET NULL'
    },
    idFornecedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Fornecedor,
            key: 'codFornecedor'
        },
        onDelete: 'SET NULL'
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto