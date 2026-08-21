const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const usuarioController = require('./controller/usuario.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.post('/usuario', usuarioController.cadastrar)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'teste de aplicação rodando'})
})


conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão com o banco de dados!',err.message || err)
})
