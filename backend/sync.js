const conn = require('./db/conn')
const { initAssociations, Usuario, Endereco, Fornecedor, Categoria, Marca, Produto, ImagemProduto, EspecificacaoProduto, Estoque, MovimentacaoEstoque, Carrinho, ItemCarrinho, Pedido, ItemPedido, Pagamento, Entrega, Avaliacao, Cupom, CupomPedido, Favorito, Log, CompraFornecedor, ItemCompraFornecedor } = require('./models/rel')

async function syncDataBase() {
    try {
        // Sincroniza e força a recriação das tabelas base
        await conn.sync({ force: true })
        console.log('Tabelas base sincronizadas com sucesso!')
        
    } catch (err) {
        console.error('Erro ao sincronizar as tabelas base:', err)
    } finally {
        await conn.close()
        console.log('Fechando a conexão com o banco de dados no sync.js') 
    }
}

syncDataBase()