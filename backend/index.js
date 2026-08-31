const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


const JWT_SECRET = 'minha_chave_secreta_de_estudo_123'
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido!' })
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido!' })
    }

    const token = parts[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.usuario = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' })
    }
}

const UsuarioController = require('./controller/usuario.controller')
const EnderecoController = require('./controller/endereco.controller')
const FornecedorController = require('./controller/fornecedores.controller')
const CategoriaController = require('./controller/categoria.controller')
const MarcaController = require('./controller/marca.controller')
const ProdutoController = require('./controller/produto.controller')
const ImagemProdutoController = require('./controller/imagemProduto.controller')
const EspecificacaoProdutoController = require('./controller/especificacaoProduto.controller')
const EstoqueController = require('./controller/estoque.controller')
const MovimentacaoEstoqueController = require('./controller/movimentacaoEstoque.controller')
const CarrinhoController = require('./controller/carrinho.controller')
const ItemCarrinhoController = require('./controller/itemCarrinho.controller')
const PedidoController = require('./controller/pedido.controller')
const ItemPedidoController = require('./controller/itemPedido.controller')
const PagamentoController = require('./controller/pagamento.controller')
const EntregaController = require('./controller/entrega.controller')
const AvaliacaoController = require('./controller/avaliacao.controller')
const CupomController = require('./controller/cupom.controller')
const CupomPedidoController = require('./controller/cupomPedido.controller')
const FavoritoController = require('./controller/favorito.controller')
const LogController = require('./controller/log.controller')
const CompraFornecedorController = require('./controller/compraFornecedor.controller')
const ItemCompraFornecedorController = require('./controller/itemCompraFornecedor.controller')


app.post('/login', UsuarioController.login)
app.post('/usuarios', UsuarioController.cadastrar)

app.get('/usuarios',authMiddleware, UsuarioController.listar)
app.get('/usuarios/:id',authMiddleware, UsuarioController.consultarPK)
app.delete('/usuarios/:id', authMiddleware,UsuarioController.apagar)
app.put('/usuarios/:id',authMiddleware, UsuarioController.atualizar)

app.post('/enderecos',authMiddleware, EnderecoController.cadastrar)
app.get('/enderecos', authMiddleware,EnderecoController.listar)
app.get('/enderecos/:id',authMiddleware, EnderecoController.consultarPK)
app.delete('/enderecos/:id',authMiddleware, EnderecoController.apagar)
app.put('/enderecos/:id', authMiddleware,EnderecoController.atualizar)

app.post('/fornecedores',authMiddleware, FornecedorController.cadastrar)
app.get('/fornecedores', authMiddleware,FornecedorController.listar)
app.get('/fornecedores/:id',authMiddleware, FornecedorController.consultarPK)
app.delete('/fornecedores/:id', authMiddleware,FornecedorController.apagar)
app.put('/fornecedores/:id',authMiddleware, FornecedorController.atualizar)

app.post('/categorias',authMiddleware, CategoriaController.cadastrar)
app.get('/categorias',authMiddleware, CategoriaController.listar)
app.get('/categorias/:id',authMiddleware, CategoriaController.consultarPK)
app.delete('/categorias/:id',authMiddleware, CategoriaController.apagar)
app.put('/categorias/:id', authMiddleware,CategoriaController.atualizar)

app.post('/marcas',authMiddleware, MarcaController.cadastrar)
app.get('/marcas',authMiddleware, MarcaController.listar)
app.get('/marcas/:id',authMiddleware, MarcaController.consultarPK)
app.delete('/marcas/:id',authMiddleware, MarcaController.apagar)
app.put('/marcas/:id', authMiddleware,MarcaController.atualizar)

app.post('/produtos',authMiddleware, ProdutoController.cadastrar)
app.get('/produtos', authMiddleware,ProdutoController.listar)
app.get('/produtos/:id',authMiddleware, ProdutoController.consultarPK)
app.delete('/produtos/:id',authMiddleware, ProdutoController.apagar)
app.put('/produtos/:id',authMiddleware, ProdutoController.atualizar)

app.post('/imagens-produto',authMiddleware, ImagemProdutoController.cadastrar)
app.get('/produtos/:id/imagens', authMiddleware,ImagemProdutoController.listarPorProduto)
app.delete('/imagens-produto/:id',authMiddleware, ImagemProdutoController.apagar)
=
app.post('/especificacoes-produto',authMiddleware, EspecificacaoProdutoController.cadastrar)
app.get('/produtos/:id/especificacoes',authMiddleware, EspecificacaoProdutoController.listarPorProduto)

app.get('/estoque',authMiddleware, EstoqueController.listar)
app.get('/produtos/:id/estoque',authMiddleware, EstoqueController.buscarPorProduto)
app.put('/estoque/:id',authMiddleware,EstoqueController.atualizarQuantidade)

app.post('/movimentacoes-estoque',authMiddleware, MovimentacaoEstoqueController.cadastrar)
app.get('/produtos/:id/movimentacoes',authMiddleware, MovimentacaoEstoqueController.listarPorProduto)

app.post('/carrinhos',authMiddleware, CarrinhoController.criar)
app.get('/usuarios/:id/carrinhos',authMiddleware, CarrinhoController.buscarAtivo)
app.get('/carrinhos/:id',authMiddleware, CarrinhoController.atualizarStatus)

app.post('/itens-carrinho',authMiddleware,ItemCarrinhoController.cadastrar)

app.post('/pedidos',authMiddleware, PedidoController.cadastrar)
app.get('/pedidos',authMiddleware, PedidoController.listar)
app.get('/pedidos/:id',authMiddleware, PedidoController.consultarPK)
app.put('/pedidos/:id', authMiddleware,PedidoController.atualizar)
app.delete('/pedidos/:id',authMiddleware, PedidoController.apagar)

app.post('/pagamentos',authMiddleware, PagamentoController.criar)
app.get('/pagamentos',authMiddleware, PagamentoController.consultarpedido)
app.put('/pedidos/:id/pagamento',authMiddleware,PagamentoController.atualizarStatus)

app.post('/entregas',authMiddleware, EntregaController.criar)
app.get('/pedidos/:id/entrega',authMiddleware, EntregaController.consultarpedido)
app.get('/pedidos/:id',authMiddleware, EntregaController.atualizarStatus)

app.post('/avaliacoes', authMiddleware,AvaliacaoController.cadastrar)
app.get('/produtos/:id/avaliacoes', authMiddleware,AvaliacaoController.listarPorProduto)

app.post('/cupons',authMiddleware, CupomController.cadastrar)
app.get('/cupons',authMiddleware, CupomController.listar)
app.get('/cupons/:id',authMiddleware, CupomController.consultarCodigo)

app.post('/cupons-pedido',authMiddleware, CupomPedidoController.aplicar)

app.post('/favoritos',authMiddleware, FavoritoController.cadastrar)
app.get('/usuarios/:id/favoritos',authMiddleware, FavoritoController.listarPorUsuario)
app.delete('/favoritos/:id',authMiddleware, FavoritoController.apagar)

app.post('/logs',authMiddleware, LogController.listarPorUsuario)
app.get('/logs',authMiddleware, LogController.listar)

app.post('/compras-fornecedor',authMiddleware, CompraFornecedorController.cadastrar)
app.get('/fornecedores/:id/compras',authMiddleware, CompraFornecedorController.listar)
app.get('/compras-fornecedor/:id',authMiddleware, CompraFornecedorController.consultarPK)

app.get('/itemcompras-forncedores',authMiddleware, ItemCompraFornecedorController.listarPorCompra)
app.get('/itemcompras-forncedor/:id',authMiddleware, ItemCompraFornecedorController.consultarPK)

app.get('/itempedido',authMiddleware, ItemPedidoController.listarPorPedido)
app.get('/itempedido/:id',authMiddleware, ItemPedidoController.consultarPK)

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
