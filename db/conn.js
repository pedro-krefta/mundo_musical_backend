const {Sequelize} = require('sequelize')

const db = new Sequelize('db_loja','root','senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3000
})

module.exports = db