const {Sequelize} = require('sequelize')

const db = new Sequelize('db_loja','root','Ek106549',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db