const bcrypt = require('bcrypt')
const validator = require('validator')
const { cpf: cpfValidator } = require('cpf-cnpj-validator')
const Usuario = require('../models/usuario');

const cadastrar = async(req,res)=>{
    try{

    const { nome, email, senha, cpf, telefone, tipoUsuario, dataNascimento } = req.body;

   if(!validator.isEmail(email)){
    return res.status(400).json({message: 'email invalido'})
   }

   if(!cpfValidator.isValid(cpf)){
    return res.status(400).json({message: 'CPF invalido'})
   }

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
        console.error('erro ao cadastrar',err)
        return res.status(500).json({message: 'erro ao cadastrar usuario'})
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao listar'})
        console.error('erro ao listar',err)
    }
}

const consultarPK = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try{
        const dados = await Usuario.findByPk(id)
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao consultar'})
        console.error('erro ao consultar',err)
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    console.log(id)

    try{
        const dados = await Usuario.findOne({where: {nome: nome}})
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao consultar'})
        console.error('erro ao consultar',err)
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try{
        const dados = await Usuario.findByPk(id)
        if(!dados){
            res.status(400).json({message: 'erro ao achar usuario'})
        }
        await Usuario.destroy({where: {codUsuario: id}})
        res.status(200).json({message: 'usuario excluido com sucesso'})
    }catch(err){
        res.status(400).json({message: 'erro ao apagar'})
        console.error('erro ao apagar',err)
    }
}

const atualizar = async(req,res)=>{
    const valores = req.body
    const id = req.params.id
    try{
        let dados = await Usuario.findByPk(id)
        if(!dados){
            res.status(400).json({message: 'erro ao achar usuario'})
        }
        await Usuario.update(valores, {where: {codUsuario: id}})
        dados = await Usuario.findByPk(id)
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar',err)
    }
}

module.exports = {cadastrar  , listar , consultarPK , consultarNome , apagar , atualizar }