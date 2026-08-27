const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Pedido = require('./pedido')

const Entrega = db.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transportadora: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    codigoRastreio: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    statusEntrega: {
        type: DataTypes.ENUM('PREPARANDO', 'ENVIADO', 'ENTREGUE'),
        allowNull: false,
        defaultValue: 'PREPARANDO'
    },
    dataEnvio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dataEntregaPrevista: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    dataEntregaRealizada: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Pedido,
            key: 'codPedido'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega