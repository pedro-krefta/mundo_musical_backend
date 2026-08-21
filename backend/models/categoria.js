const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Categoria = db.define('categoria', {
    codCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    idCategoriaPai: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categorias',
            key: 'codCategoria'
        }
    }
}, {
    timestamps: false,
    tableName: 'categorias'
})

module.exports = Categoria