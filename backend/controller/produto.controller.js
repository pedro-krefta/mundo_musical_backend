const Produto = require('../models/produto')
const Categoria = require('../models/categoria')
const Marca = require('../models/marca')
const Fornecedor = require('../models/fornecedor')
const ImagemProduto = require('../models/imagemProduto')
const EspecificacaoProduto = require('../models/especificacaoproduto')
const Estoque = require('../models/estoque')
const Avaliacao = require('../models/avaliacao')

const cadastrar = async(req,res)=>{
    const valores = req.body
    try{
        await Produto.create(valores)
        return res.status(200).json({message: 'produto cadastrado com sucesso'})

    }catch(err){
        console.error('erro ao cadastrar',err)
        return res.status(500).json({message: 'erro ao cadastrar usuario'})
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Produto.findAll({
            include: [
                { model: Categoria, as: 'categoriaDoProduto' },
                { model: Marca, as: 'marcaDoProduto' },
                { model: Fornecedor, as: 'fornecedorDoProduto' }
            ]
        })
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao listar'})
        console.error('erro ao listar',err)
    }
}

const consultarPK = async(req,res)=>{
    const id = req.params.id

    try{
        const dados = await Produto.findByPk(id, {
            include: [
                { model: ImagemProduto, as: 'imagensDoProduto' },
                { model: EspecificacaoProduto, as: 'especificacoesDoProduto' },
                { model: Estoque, as: 'estoqueDoProduto' }
            ]
        })
        if(!dados) return res.status(404).json({message: 'Produto não encontrado'})
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao consultar'})
        console.error('erro ao consultar',err)
    }
}

const consultarCompleto = async(req,res)=>{
    const id = req.params.id
    try{
        const dados = await Produto.findByPk(id, {
            include: [
                { model: ImagemProduto, as: 'imagensDoProduto' },
                { model: EspecificacaoProduto, as: 'especificacoesDoProduto' },
                { model: Estoque, as: 'estoqueDoProduto' },
                { model: Avaliacao, as: 'avaliacoesDoProduto' },
                { model: Categoria, as: 'categoriaDoProduto' },
                { model: Marca, as: 'marcaDoProduto' },
                { model: Fornecedor, as: 'fornecedorDoProduto' }
            ]
        })
        if(!dados) return res.status(404).json({message: 'Produto não encontrado'})
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao consultar produto completo'})
        console.error('erro ao consultar produto completo',err)
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    console.log(nome)

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
            return res.status(404).json({message: 'produto não encontrado'})
        }
        await Produto.destroy({where: {codProduto: id}})
        res.status(200).json({message: 'produto excluido com sucesso'})
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
            return res.status(404).json({message: 'produto não encontrado'})
        }
        await Produto.update(valores, {where: {codProduto: id}})
        dados = await Produto.findByPk(id)
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar',err)
    }
}

module.exports = {cadastrar , listar , consultarPK , consultarNome , consultarCompleto , apagar , atualizar }