const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./usuario')

const Carrinho = db.define('carrinho', {
    codCarrinho: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('ATIVO', 'FINALIZADO', 'ABANDONADO'),
        allowNull: false,
        defaultValue: 'ATIVO'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'codUsuario'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'carrinhos'
})

module.exports = Carrinho