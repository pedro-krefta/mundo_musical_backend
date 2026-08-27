const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = require('./produto')

const ImagemProduto = db.define('imagem_produto', {
    codImagem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    urlImagem: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ordemExibicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    imagemPrincipal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    tableName: 'imagens_produto'
})

module.exports = ImagemProduto