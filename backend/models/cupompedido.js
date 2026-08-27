const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Cupom = require('./cupom')
const Pedido = require('./pedido')

const CupomPedido = db.define('cupom_pedido', {
    codCupomPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valorDescontoAplicado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idCupom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cupom,
            key: 'codCupom'
        },
        onDelete: 'CASCADE'
    },
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'codPedido'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'cupons_pedido'
})

module.exports = CupomPedido