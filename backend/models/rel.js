const Usuario = require('./usuario.js')
const Endereco = require('./endereco.js')
const Fornecedor = require('./fornecedor.js')
const Categoria = require('./categoria.js')
const Marca = require('./marca.js')
const Produto = require('./produto.js')
const ImagemProduto = require('./imagemproduto.js')
const EspecificacaoProduto = require('./especificacaoproduto.js')
const Estoque = require('./Estoque.js')
const MovimentacaoEstoque = require('./movimentacaoestoque.js')
const Carrinho = require('./carrinho.js')
const ItemCarrinho = require('./itemcarrinho.js')
const Pedido = require('./pedido.js')
const ItemPedido = require('./itempedido.js')
const Pagamento = require('./pagamento.js')
const Entrega = require('./entrega.js')
const Avaliacao = require('./avaliacao.js')
const Cupom = require('./cupom.js')
const CupomPedido = require('./cupompedido.js')
const Favorito = require('./favorito.js')
const Log = require('./Log.js')
const CompraFornecedor = require('./comprafornecedor.js')
const ItemCompraFornecedor = require('./itemcomprafornecedor.js')

const initAssociations = () => {
    console.log('Inicializando relacionamentos')

    Usuario.hasMany(Endereco, {
        foreignKey: 'idUsuario',
        as: 'enderecosDoUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Endereco.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDoEndereco',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Usuario.hasMany(Carrinho, {
        foreignKey: 'idUsuario',
        as: 'carrinhosDoUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Carrinho.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDoCarrinho',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Usuario.hasMany(Pedido, {
        foreignKey: 'idUsuario',
        as: 'pedidosDoUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Pedido.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Usuario.hasMany(Avaliacao, {
        foreignKey: 'idUsuario',
        as: 'avaliacoesDoUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Avaliacao.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDaAvaliacao',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Usuario.hasMany(Favorito, {
        foreignKey: 'idUsuario',
        as: 'favoritosDoUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Favorito.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDoFavorito',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Usuario.hasMany(Log, {
        foreignKey: 'idUsuario',
        as: 'logsDoUsuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Log.belongsTo(Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuarioDoLog',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Endereco.hasMany(Pedido, {
        foreignKey: 'idEndereco',
        as: 'pedidosDoEndereco',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Pedido.belongsTo(Endereco, {
        foreignKey: 'idEndereco',
        as: 'enderecoDoPedido',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Fornecedor.hasMany(Produto, {
        foreignKey: 'idFornecedor',
        as: 'produtosDoFornecedor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Produto.belongsTo(Fornecedor, {
        foreignKey: 'idFornecedor',
        as: 'fornecedorDoProduto',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Fornecedor.hasMany(CompraFornecedor, {
        foreignKey: 'idFornecedor',
        as: 'comprasDoFornecedor',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    CompraFornecedor.belongsTo(Fornecedor, {
        foreignKey: 'idFornecedor',
        as: 'fornecedorDaCompra',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Categoria.hasMany(Categoria, {
        foreignKey: 'idCategoriaPai',
        as: 'subcategorias',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Categoria.belongsTo(Categoria, {
        foreignKey: 'idCategoriaPai',
        as: 'categoriaPai',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Categoria.hasMany(Produto, {
        foreignKey: 'idCategoria',
        as: 'produtosDaCategoria',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Produto.belongsTo(Categoria, {
        foreignKey: 'idCategoria',
        as: 'categoriaDoProduto',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Marca.hasMany(Produto, {
        foreignKey: 'idMarca',
        as: 'produtosDaMarca',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    Produto.belongsTo(Marca, {
        foreignKey: 'idMarca',
        as: 'marcaDoProduto',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
    })

    Produto.hasMany(ImagemProduto, {
        foreignKey: 'idProduto',
        as: 'imagensDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ImagemProduto.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDaImagem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(EspecificacaoProduto, {
        foreignKey: 'idProduto',
        as: 'especificacoesDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    EspecificacaoProduto.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDaEspecificacao',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasOne(Estoque, {
        foreignKey: 'idProduto',
        as: 'estoqueDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Estoque.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDoEstoque',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(MovimentacaoEstoque, {
        foreignKey: 'idProduto',
        as: 'movimentacoesDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    MovimentacaoEstoque.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDaMovimentacao',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(ItemCarrinho, {
        foreignKey: 'idProduto',
        as: 'itensCarrinhoDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemCarrinho.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDoItemCarrinho',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(ItemPedido, {
        foreignKey: 'idProduto',
        as: 'itensPedidoDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemPedido.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDoItemPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(Avaliacao, {
        foreignKey: 'idProduto',
        as: 'avaliacoesDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Avaliacao.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDaAvaliacao',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(Favorito, {
        foreignKey: 'idProduto',
        as: 'favoritosDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Favorito.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDoFavorito',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Produto.hasMany(ItemCompraFornecedor, {
        foreignKey: 'idProduto',
        as: 'itensCompraDoProduto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemCompraFornecedor.belongsTo(Produto, {
        foreignKey: 'idProduto',
        as: 'produtoDoItemCompra',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Carrinho.hasMany(ItemCarrinho, {
        foreignKey: 'idCarrinho',
        as: 'itensDoCarrinho',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemCarrinho.belongsTo(Carrinho, {
        foreignKey: 'idCarrinho',
        as: 'carrinhoDoItem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Pedido.hasMany(ItemPedido, {
        foreignKey: 'idPedido',
        as: 'itensDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemPedido.belongsTo(Pedido, {
        foreignKey: 'idPedido',
        as: 'pedidoDoItem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Pedido.hasOne(Pagamento, {
        foreignKey: 'idPedido',
        as: 'pagamentoDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Pagamento.belongsTo(Pedido, {
        foreignKey: 'idPedido',
        as: 'pedidoDoPagamento',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Pedido.hasOne(Entrega, {
        foreignKey: 'idPedido',
        as: 'entregaDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Entrega.belongsTo(Pedido, {
        foreignKey: 'idPedido',
        as: 'pedidoDaEntrega',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Pedido.hasMany(CupomPedido, {
        foreignKey: 'idPedido',
        as: 'cuponsDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    CupomPedido.belongsTo(Pedido, {
        foreignKey: 'idPedido',
        as: 'pedidoDoCupom',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    Cupom.hasMany(CupomPedido, {
        foreignKey: 'idCupom',
        as: 'cuponsDoCupom',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    CupomPedido.belongsTo(Cupom, {
        foreignKey: 'idCupom',
        as: 'cupomDoPedido',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    CompraFornecedor.hasMany(ItemCompraFornecedor, {
        foreignKey: 'idCompra',
        as: 'itensDaCompra',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    ItemCompraFornecedor.belongsTo(CompraFornecedor, {
        foreignKey: 'idCompra',
        as: 'compraDoItem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })

    console.log('relacionamentos iniciados com sucesso!')
}

module.exports = {
    initAssociations,
    Usuario,
    Endereco,
    Fornecedor,
    Categoria,
    Marca,
    Produto,
    ImagemProduto,
    EspecificacaoProduto,
    Estoque,
    MovimentacaoEstoque,
    Carrinho,
    ItemCarrinho,
    Pedido,
    ItemPedido,
    Pagamento,
    Entrega,
    Avaliacao,
    Cupom,
    CupomPedido,
    Favorito,
    Log,
    CompraFornecedor,
    ItemCompraFornecedor
}

initAssociations()