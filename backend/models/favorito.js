const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./usuario')
const Produto = require('./produto')

const Favorito = db.define('favorito', {
    codFavorito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataAdicionado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'codUsuario'
        },
        onDelete: 'CASCADE'
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'codProduto'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'favoritos',
    indexes: [
        {
            unique: true,
            fields: ['idUsuario', 'idProduto']
        }
    ]
})

module.exports = Favorito