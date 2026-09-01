const {DataTypes } = require('sequelize')
const db = require('./db/conn')

const Usuario = db.define('usuario',{
    codUSuario: {
        type: DataTypes.INTEGER,
        
    }
})