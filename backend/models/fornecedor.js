const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Fornecedor = db.define('fornecedor', {
    codFornecedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    razaoSocial: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(18),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    contatoResponsavel: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'fornecedores'
})

module.exports = Fornecedor