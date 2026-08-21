const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cupom = db.define('cupom', {
    codCupom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigoCupom: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    tipoDesconto: {
        type: DataTypes.ENUM('PERCENTUAL', 'VALOR_FIXO'),
        allowNull: false
    },
    valorDesconto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    dataValidade: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    quantidadeUsoMaxima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'cupons'
})

module.exports = Cupom