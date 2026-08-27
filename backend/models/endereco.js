const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./usuario')

const Endereco = db.define('endereco', {
    codEndereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logradouro: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    tipoEndereco: {
        type: DataTypes.ENUM('ENTREGA', 'COBRANCA'),
        allowNull: false,
        defaultValue: 'ENTREGA'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'codUsuario'
        }
    }
}, {
    timestamps: false,
    tableName: 'enderecos'
})

module.exports = Endereco