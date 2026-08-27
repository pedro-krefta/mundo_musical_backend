const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// Importação dos controllers (você já tem)
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

// ========== USUÁRIOS ==========
app.post('/usuarios', UsuarioController.cadastrar)
app.get('/usuarios', UsuarioController.listar)
app.get('/usuarios/:id', UsuarioController.consultarPK)
app.delete('/usuarios/:id', UsuarioController.apagar)
app.put('/usuarios/:id', UsuarioController.atualizar)

// ========== ENDEREÇOS ==========
app.post('/enderecos', EnderecoController.cadastrar)
app.get('/enderecos', EnderecoController.listar)
app.get('/enderecos/:id', EnderecoController.consultarPK)
app.delete('/enderecos/:id', EnderecoController.apagar)
app.put('/enderecos/:id', EnderecoController.atualizar)

// ========== FORNECEDORES ==========
app.post('/fornecedores', FornecedorController.cadastrar)
app.get('/fornecedores', FornecedorController.listar)
app.get('/fornecedores/:id', FornecedorController.consultarPK)
app.delete('/fornecedores/:id', FornecedorController.apagar)
app.put('/fornecedores/:id', FornecedorController.atualizar)

// ========== CATEGORIAS ==========
app.post('/categorias', CategoriaController.cadastrar)
app.get('/categorias', CategoriaController.listar)
app.get('/categorias/:id', CategoriaController.consultarPK)
app.delete('/categorias/:id', CategoriaController.apagar)
app.put('/categorias/:id', CategoriaController.atualizar)

// ========== MARCAS ==========
app.post('/marcas', MarcaController.cadastrar)
app.get('/marcas', MarcaController.listar)
app.get('/marcas/:id', MarcaController.consultarPK)
app.delete('/marcas/:id', MarcaController.apagar)
app.put('/marcas/:id', MarcaController.atualizar)

// ========== PRODUTOS ==========
app.post('/produtos', ProdutoController.cadastrar)
app.get('/produtos', ProdutoController.listar)
app.get('/produtos/:id', ProdutoController.consultarPK)
app.delete('/produtos/:id', ProdutoController.apagar)
app.put('/produtos/:id', ProdutoController.atualizar)

// ========== IMAGENS DO PRODUTO ==========
app.post('/imagens-produto', ImagemProdutoController.cadastrar)
app.get('/produtos/:id/imagens', ImagemProdutoController.listarPorProduto)
app.delete('/imagens-produto/:id', ImagemProdutoController.apagar)

// ========== ESPECIFICAÇÕES DO PRODUTO ==========
app.post('/especificacoes-produto', EspecificacaoProdutoController.cadastrar)
app.get('/produtos/:id/especificacoes', EspecificacaoProdutoController.listarPorProduto)

// ========== ESTOQUE ==========
app.get('/estoque', EstoqueController.listar)
app.get('/produtos/:id/estoque', EstoqueController.buscarPorProduto)
app.put('/estoque/:id', EstoqueController.atualizarQuantidade)

// ========== MOVIMENTAÇÕES DE ESTOQUE ==========
app.post('/movimentacoes-estoque', MovimentacaoEstoqueController.cadastrar)
app.get('/produtos/:id/movimentacoes', MovimentacaoEstoqueController.listarPorProduto)

// ========== CARRINHOS ==========
app.post('/carrinhos', CarrinhoController.criar)
app.get('/usuarios/:id/carrinhos', CarrinhoController.buscarAtivo)
app.get('/carrinhos/:id', CarrinhoController.atualizarStatus)

// ========== ITENS DO CARRINHO ==========
app.post('/itens-carrinho', ItemCarrinhoController.cadastrar)

// ========== PEDIDOS ==========
app.post('/pedidos', PedidoController.cadastrar)
app.get('/pedidos', PedidoController.listar)
app.get('/pedidos/:id', PedidoController.consultarPK)
app.put('/pedidos/:id', PedidoController.atualizar)
app.delete('/pedidos/:id', PedidoController.apagar)

// ========== PAGAMENTOS ==========
app.post('/pagamentos', PagamentoController.criar)
app.get('/pagamentos', PagamentoController.consultarpedido)
app.put('/pedidos/:id/pagamento', PagamentoController.atualizarStatus)

// ========== ENTREGAS ==========
app.post('/entregas', EntregaController.criar)
app.get('/pedidos/:id/entrega', EntregaController.consultarpedido)
app.get('/pedidos/:id', EntregaController.atualizarStatus)


// ========== AVALIAÇÕES ==========
app.post('/avaliacoes', AvaliacaoController.cadastrar)
app.get('/produtos/:id/avaliacoes', AvaliacaoController.listarPorProduto)

// ========== CUPONS ==========
app.post('/cupons', CupomController.cadastrar)
app.get('/cupons', CupomController.listar)
app.get('/cupons/:id', CupomController.consultarCodigo)

// ========== CUPONS PEDIDO ==========
app.post('/cupons-pedido', CupomPedidoController.aplicar)

// ========== FAVORITOS ==========
app.post('/favoritos', FavoritoController.cadastrar)
app.get('/usuarios/:id/favoritos', FavoritoController.listarPorUsuario)
app.delete('/favoritos/:id', FavoritoController.apagar)

// ========== LOGS ==========
app.post('/logs', LogController.listarPorUsuario)
app.get('/logs', LogController.listar)

// ========== COMPRAS FORNECEDOR ==========
app.post('/compras-fornecedor', CompraFornecedorController.cadastrar)
app.get('/fornecedores/:id/compras', CompraFornecedorController.listar)
app.get('/compras-fornecedor/:id', CompraFornecedorController.consultarPK)


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
