require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const hostname = process.env.HOST || 'localhost'

const conn = require('./db/conn')
const { initAssociations } = require('./models/rel')
initAssociations()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const { authMiddleware, adminMiddleware } = require('./middleware/auth')

// Controllers
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

// ============================================
// AUTENTICAÇÃO / USUÁRIOS
// ============================================
app.post('/login', UsuarioController.login)
app.post('/usuarios', UsuarioController.cadastrar)

app.get('/usuarios', authMiddleware, UsuarioController.listar)
app.get('/usuarios/nome/:nome', authMiddleware, UsuarioController.consultarNome)
app.get('/usuarios/:id', authMiddleware, UsuarioController.consultarPK)
app.get('/usuarios/:id/completo', authMiddleware, UsuarioController.consultarCompleto)
app.put('/usuarios/:id', authMiddleware, adminMiddleware, UsuarioController.atualizar)
app.delete('/usuarios/:id', authMiddleware, adminMiddleware, UsuarioController.apagar)

// ============================================
// ENDEREÇOS
// ============================================
app.post('/enderecos', authMiddleware, EnderecoController.cadastrar)
app.get('/enderecos', authMiddleware, EnderecoController.listar)
app.get('/enderecos/:id', authMiddleware, EnderecoController.consultarPK)
app.get('/usuarios/:idUsuario/enderecos', authMiddleware, EnderecoController.listarPorUsuario)
app.put('/enderecos/:id', authMiddleware, EnderecoController.atualizar)
app.delete('/enderecos/:id', authMiddleware, EnderecoController.apagar)

// ============================================
// FORNECEDORES
// ============================================
app.post('/fornecedores', authMiddleware, adminMiddleware, FornecedorController.cadastrar)
app.get('/fornecedores', authMiddleware, FornecedorController.listar)
app.get('/fornecedores/cnpj/:cnpj', authMiddleware, FornecedorController.consultarCnpj)
app.get('/fornecedores/:id', authMiddleware, FornecedorController.consultarPK)
app.get('/fornecedores/:id/completo', authMiddleware, FornecedorController.consultarCompleto)
app.put('/fornecedores/:id', authMiddleware, adminMiddleware, FornecedorController.atualizar)
app.delete('/fornecedores/:id', authMiddleware, adminMiddleware, FornecedorController.apagar)

// ============================================
// CATEGORIAS
// ============================================
app.post('/categorias', authMiddleware, adminMiddleware, CategoriaController.cadastrar)
app.get('/categorias', authMiddleware, CategoriaController.listar)
app.get('/categorias/nome/:nome', authMiddleware, CategoriaController.consultarNome)
app.get('/categorias/:id', authMiddleware, CategoriaController.consultarPK)
app.get('/categorias/:id/arvore', authMiddleware, CategoriaController.consultarArvore)
app.put('/categorias/:id', authMiddleware, adminMiddleware, CategoriaController.atualizar)
app.delete('/categorias/:id', authMiddleware, adminMiddleware, CategoriaController.apagar)

// ============================================
// MARCAS
// ============================================
app.post('/marcas', authMiddleware, adminMiddleware, MarcaController.cadastrar)
app.get('/marcas', authMiddleware, MarcaController.listar)
app.get('/marcas/:id', authMiddleware, MarcaController.consultarPK)
app.put('/marcas/:id', authMiddleware, adminMiddleware, MarcaController.atualizar)
app.delete('/marcas/:id', authMiddleware, adminMiddleware, MarcaController.apagar)

// ============================================
// PRODUTOS
// ============================================
app.post('/produtos', authMiddleware, adminMiddleware, ProdutoController.cadastrar)
app.get('/produtos', authMiddleware, ProdutoController.listar)
app.get('/produtos/nome/:nome', authMiddleware, ProdutoController.consultarNome)
app.get('/produtos/:id', authMiddleware, ProdutoController.consultarPK)
app.get('/produtos/:id/completo', authMiddleware, ProdutoController.consultarCompleto)
app.put('/produtos/:id', authMiddleware, adminMiddleware, ProdutoController.atualizar)
app.delete('/produtos/:id', authMiddleware, adminMiddleware, ProdutoController.apagar)

// ============================================
// IMAGENS DO PRODUTO
// ============================================
app.post('/imagens-produto', authMiddleware, adminMiddleware, ImagemProdutoController.cadastrar)
app.get('/imagens-produto', authMiddleware, ImagemProdutoController.listar)
app.get('/imagens-produto/:id', authMiddleware, ImagemProdutoController.consultarPK)
app.get('/produtos/:idProduto/imagens', authMiddleware, ImagemProdutoController.listarPorProduto)
app.put('/imagens-produto/:id', authMiddleware, adminMiddleware, ImagemProdutoController.atualizar)
app.delete('/imagens-produto/:id', authMiddleware, adminMiddleware, ImagemProdutoController.apagar)

// ============================================
// ESPECIFICAÇÕES DO PRODUTO
// ============================================
app.post('/especificacoes-produto', authMiddleware, adminMiddleware, EspecificacaoProdutoController.cadastrar)
app.get('/especificacoes-produto', authMiddleware, EspecificacaoProdutoController.listar)
app.get('/especificacoes-produto/:id', authMiddleware, EspecificacaoProdutoController.consultarPK)
app.get('/produtos/:idProduto/especificacoes', authMiddleware, EspecificacaoProdutoController.listarPorProduto)
app.put('/especificacoes-produto/:id', authMiddleware, adminMiddleware, EspecificacaoProdutoController.atualizar)
app.delete('/especificacoes-produto/:id', authMiddleware, adminMiddleware, EspecificacaoProdutoController.apagar)

// ============================================
// ESTOQUE
// ============================================
app.post('/estoque', authMiddleware, adminMiddleware, EstoqueController.cadastrar)
app.get('/estoque', authMiddleware, EstoqueController.listar)
app.get('/produtos/:idProduto/estoque', authMiddleware, EstoqueController.buscarPorProduto)
app.put('/estoque/:id', authMiddleware, adminMiddleware, EstoqueController.atualizarQuantidade)

// ============================================
// MOVIMENTAÇÕES DE ESTOQUE
// ============================================
app.post('/movimentacoes-estoque', authMiddleware, adminMiddleware, MovimentacaoEstoqueController.cadastrar)
app.get('/produtos/:idProduto/movimentacoes', authMiddleware, MovimentacaoEstoqueController.listarPorProduto)

// ============================================
// CARRINHOS
// ============================================
app.post('/carrinhos', authMiddleware, CarrinhoController.criar)
app.get('/usuarios/:idUsuario/carrinhos', authMiddleware, CarrinhoController.buscarAtivo)
app.get('/carrinhos/:id', authMiddleware, CarrinhoController.consultarPK)
app.get('/carrinhos/:id/completo', authMiddleware, CarrinhoController.consultarCompleto)
app.put('/carrinhos/:id', authMiddleware, CarrinhoController.atualizarStatus)

// ============================================
// ITENS DO CARRINHO
// ============================================
app.post('/itens-carrinho', authMiddleware, ItemCarrinhoController.cadastrar)
app.get('/itens-carrinho', authMiddleware, ItemCarrinhoController.listar)
app.get('/itens-carrinho/:id', authMiddleware, ItemCarrinhoController.consultarPK)
app.get('/carrinhos/:idCarrinho/itens', authMiddleware, ItemCarrinhoController.listarPorCarrinho)
app.put('/itens-carrinho/:id', authMiddleware, ItemCarrinhoController.atualizar)
app.delete('/itens-carrinho/:id', authMiddleware, ItemCarrinhoController.apagar)

// ============================================
// PEDIDOS
// ============================================
app.post('/pedidos', authMiddleware, PedidoController.cadastrar)
app.get('/pedidos', authMiddleware, PedidoController.listar)
app.get('/pedidos/:id', authMiddleware, PedidoController.consultarPK)
app.get('/pedidos/:id/completo', authMiddleware, PedidoController.consultarCompleto)
app.get('/usuarios/:idUsuario/pedidos', authMiddleware, PedidoController.listarPorUsuario)
app.put('/pedidos/:id', authMiddleware, PedidoController.atualizar)
app.delete('/pedidos/:id', authMiddleware, PedidoController.apagar)

// ============================================
// ITENS DO PEDIDO
// ============================================
app.get('/pedidos/:idPedido/itens', authMiddleware, ItemPedidoController.listarPorPedido)
app.get('/itens-pedido/:id', authMiddleware, ItemPedidoController.consultarPK)

// ============================================
// PAGAMENTOS
// ============================================
app.post('/pagamentos', authMiddleware, PagamentoController.criar)
app.get('/pedidos/:idPedido/pagamento', authMiddleware, PagamentoController.consultarpedido)
app.put('/pagamentos/:id', authMiddleware, PagamentoController.atualizarStatus)

// ============================================
// ENTREGAS
// ============================================
app.post('/entregas', authMiddleware, EntregaController.criar)
app.get('/pedidos/:idPedido/entrega', authMiddleware, EntregaController.consultarpedido)
app.put('/entregas/:id', authMiddleware, EntregaController.atualizarStatus)

// ============================================
// AVALIAÇÕES
// ============================================
app.post('/avaliacoes', authMiddleware, AvaliacaoController.cadastrar)
app.get('/avaliacoes/:id', authMiddleware, AvaliacaoController.consultarPK)
app.get('/produtos/:idProduto/avaliacoes', authMiddleware, AvaliacaoController.listarPorProduto)
app.put('/avaliacoes/:id', authMiddleware, AvaliacaoController.atualizar)
app.delete('/avaliacoes/:id', authMiddleware, AvaliacaoController.apagar)

// ============================================
// CUPONS
// ============================================
app.post('/cupons', authMiddleware, adminMiddleware, CupomController.cadastrar)
app.get('/cupons', authMiddleware, CupomController.listar)
app.get('/cupons/codigo/:codigo', authMiddleware, CupomController.consultarCodigo)
app.get('/cupons/:id', authMiddleware, CupomController.consultarPK)
app.put('/cupons/:id', authMiddleware, adminMiddleware, CupomController.atualizar)
app.delete('/cupons/:id', authMiddleware, adminMiddleware, CupomController.apagar)

// ============================================
// CUPONS APLICADOS AO PEDIDO
// ============================================
app.post('/cupons-pedido', authMiddleware, CupomPedidoController.aplicar)
app.get('/pedidos/:idPedido/cupons', authMiddleware, CupomPedidoController.listarPorPedido)
app.delete('/cupons-pedido/:id', authMiddleware, CupomPedidoController.remover)

// ============================================
// FAVORITOS
// ============================================
app.post('/favoritos', authMiddleware, FavoritoController.cadastrar)
app.get('/favoritos', authMiddleware, FavoritoController.listar)
app.get('/favoritos/:id', authMiddleware, FavoritoController.consultarPK)
app.get('/usuarios/:idUsuario/favoritos', authMiddleware, FavoritoController.listarPorUsuario)
app.delete('/favoritos/:id', authMiddleware, FavoritoController.apagar)

// ============================================
// LOGS
// ============================================
app.post('/logs', authMiddleware, LogController.cadastrar)
app.get('/logs', authMiddleware, adminMiddleware, LogController.listar)
app.get('/usuarios/:idUsuario/logs', authMiddleware, adminMiddleware, LogController.listarPorUsuario)

// ============================================
// COMPRAS DE FORNECEDOR
// ============================================
app.post('/compras-fornecedor', authMiddleware, adminMiddleware, CompraFornecedorController.cadastrar)
app.get('/compras-fornecedor', authMiddleware, adminMiddleware, CompraFornecedorController.listar)
app.get('/compras-fornecedor/:id', authMiddleware, adminMiddleware, CompraFornecedorController.consultarPK)
app.get('/fornecedores/:idFornecedor/compras', authMiddleware, adminMiddleware, CompraFornecedorController.listarPorFornecedor)
app.put('/compras-fornecedor/:id', authMiddleware, adminMiddleware, CompraFornecedorController.atualizar)
app.delete('/compras-fornecedor/:id', authMiddleware, adminMiddleware, CompraFornecedorController.apagar)

// ============================================
// ITENS DA COMPRA DE FORNECEDOR
// ============================================
app.get('/compras-fornecedor/:idCompra/itens', authMiddleware, adminMiddleware, ItemCompraFornecedorController.listarPorCompra)
app.get('/itens-compra-fornecedor/:id', authMiddleware, adminMiddleware, ItemCompraFornecedorController.consultarPK)

// ============================================
app.get('/', (req, res) => {
    res.status(200).json({ message: 'teste de aplicação rodando' })
})

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados!', err.message || err)
    })
