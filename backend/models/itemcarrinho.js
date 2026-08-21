const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Carrinho = require('./Carrinho')
const Produto = require('./Produto')

const ItemCarrinho = db.define('item_carrinho', {
    codItemCarrinho: {
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
    idCarrinho: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carrinho,
            key: 'codCarrinho'
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
    tableName: 'itens_carrinho'
})

module.exports = ItemCarrinho