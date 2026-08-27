const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./usuario')
const Endereco = require('./endereco')

const Pedido = db.define('pedido', {
    codPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    statusPedido: {
        type: DataTypes.ENUM('PENDENTE', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'codUsuario'
        },
        onDelete: 'CASCADE'
    },
    idEndereco: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Endereco,
            key: 'codEndereco'
        },
        onDelete: 'SET NULL'
    }
}, {
    timestamps: false,
    tableName: 'pedidos'
})

module.exports = Pedido