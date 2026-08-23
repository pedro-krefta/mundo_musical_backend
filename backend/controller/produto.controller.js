const Produto = require('../models/produto')

const cadastrar = async(req,res)=>{
    const valores = req.body
    try{
        await Produto.create(valores)
        return res.status(200).json({message: 'produto cadastrado com sucesso'})

    }catch(err){
        return res.status(500).json({message: 'erro ao cadastrar usuario'})
        console.error('erro ao cadastrar',err)
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Produto.findAll()
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
        const dados = await Produto.findByPk(id)
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
        const dados = await Produto.findOne({where: {nome: nome}})
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
        const dados = await Produto.findByPk(id)
        if(!dados){
            res.status(400).json({message: 'erro ao achar usuario'})
        }
        await Produto.destroy({where: {codProduto: id}})
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
        let dados = await Produto.findByPk(id)
        if(!dados){
            res.status(400).json({message: 'erro ao achar usuario'})
        }
        await Produto.update(valores, {where: {codProduto: id}})
        dados = await Produto.findByPk(id)
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar',err)
    }
}

module.exports = {cadastrar , listar , consultarPK , consultarNome , apagar , atualizar }