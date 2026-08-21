const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const CompraFornecedor = require('./CompraFornecedor')
const Produto = require('./Produto')

const ItemCompraFornecedor = db.define('item_compra_fornecedor', {
    codItemCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idCompra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CompraFornecedor,
            key: 'codCompra'
        },
        onDelete: 'CASCADE'
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
    tableName: 'itens_compra_fornecedor'
})

module.exports = ItemCompraFornecedor