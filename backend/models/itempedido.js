const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Pedido = require('./pedido')
const Produto = require('./produto')

const ItemPedido = db.define('item_pedido', {
    codItemPedido: {
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
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'codPedido'
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
    tableName: 'itens_pedido'
})

module.exports = ItemPedido