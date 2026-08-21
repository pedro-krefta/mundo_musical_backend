const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')

const cadastrar = async(req,res)=>{
    try{

    const { nome, email, senha, cpf, telefone, tipoUsuario, dataNascimento } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
    cpf,
    telefone,
    tipoUsuario,
    dataNascimento
});
        return res.status(200).json({message: 'usuario cadastrado com sucesso'})

    }catch(err){
        return res.status(500).json({message: 'erro ao cadastrar usuario'})
        console.error('erro ao cadastrar',err)
    }
}

module.exports = {cadastrar}