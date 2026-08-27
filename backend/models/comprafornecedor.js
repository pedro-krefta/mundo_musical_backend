const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Fornecedor = require('./fornecedor')

const CompraFornecedor = db.define('compra_fornecedor', {
    codCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.ENUM('PENDENTE', 'RECEBIDA', 'CANCELADA'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    idFornecedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Fornecedor,
            key: 'codFornecedor'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'compras_fornecedor'
})

module.exports = CompraFornecedor