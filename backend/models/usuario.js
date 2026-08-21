const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    tipoUsuario: {
        type: DataTypes.ENUM('CLIENTE', 'VENDEDOR', 'ADMIN'),
        allowNull: false,
        defaultValue: 'CLIENTE'
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    dataCadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
})

module.exports = Usuario