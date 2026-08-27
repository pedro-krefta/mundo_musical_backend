const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Marca = db.define('marca', {
    codMarca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeMarca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    paisOrigem: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'marcas'
})
 
module.exports = Marca