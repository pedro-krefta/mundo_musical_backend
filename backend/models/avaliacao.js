const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = require('./produto')
const Usuario = require('./usuario')

const Avaliacao = db.define('avaliacao', {
    codAvaliacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dataAvaliacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'codProduto'
        },
        onDelete: 'CASCADE'
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
    tableName: 'avaliacoes'
})

module.exports = Avaliacao