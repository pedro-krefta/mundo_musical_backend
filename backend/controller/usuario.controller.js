const bcrypt = require('bcrypt')
const validator = require('validator')
const { cpf: cpfValidator } = require('cpf-cnpj-validator')
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken')

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

const JWT_SECRET = 'minha_chave_secreta_de_estudo_123'

const login = async (req, res) => {
    try {
        const { email, senha } = req.body

        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) {
            return res.status(404).json({ message: 'E-mail não cadastrado!' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta!' })
        }


        if (!usuario.ativo) {
            return res.status(403).json({ message: 'Usuário desativado!' })
        }

        const token = jwt.sign(
            {
                codUsuario: usuario.codUsuario,
                nome: usuario.nome,
                tipoUsuario: usuario.tipoUsuario
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        )

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            usuario: {
                codUsuario: usuario.codUsuario,
                nome: usuario.nome,
                email: usuario.email,
                tipoUsuario: usuario.tipoUsuario
            }
        })
    } catch (err) {
        console.error('Erro ao fazer login:', err)
        return res.status(500).json({ message: 'Erro interno ao realizar login!' })
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

module.exports = {cadastrar ,login , listar ,  consultarPK , consultarNome , apagar , atualizar }