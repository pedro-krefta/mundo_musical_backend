const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Pedido = require('./Pedido')

const Pagamento = db.define('pagamento', {
    codPagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formaPagamento: {
        type: DataTypes.ENUM('CARTAO', 'BOLETO', 'PIX'),
        allowNull: false
    },
    valorPago: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    statusPagamento: {
        type: DataTypes.ENUM('PENDENTE', 'APROVADO', 'RECUSADO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    dataPagamento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
    tableName: 'pagamentos'
})

module.exports = Pagamento