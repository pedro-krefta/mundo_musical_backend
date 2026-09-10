# Backend finalizado — changelog

Testei tudo rodando de verdade (Node + MySQL), incluindo cadastro de usuário,
login, catálogo completo, pedido com itens e baixa de estoque, compra de
fornecedor com entrada de estoque, carrinho, pagamento, entrega, cupom,
favoritos, logs e as permissões de admin. Abaixo está tudo que estava
quebrado e tudo que foi completado.

## 🔴 Bugs que impediam o servidor de sequer iniciar

1. **`controller/itemCarrinho.controller.js`** exportava uma função `listar`
   que nunca foi definida → `ReferenceError` fatal ao carregar o módulo.
   Adicionada a função.
2. **`models/rel.js`** importava `./imagemproduto.js` e `./Carrinho.js`
   (nomes com letras diferentes das dos arquivos reais: `imagemProduto.js` e
   `carrinho.js`). Isso funciona no Windows (case-insensitive) mas quebra
   com `MODULE_NOT_FOUND` em qualquer ambiente Linux — inclusive em qualquer
   deploy real. Corrigido.
3. **`controller/imagemProduto.controller.js`** tinha o mesmo problema de
   import. Corrigido.
4. **`initAssociations()`** nunca era chamado (nem em `index.js`, nem em
   `sync.js`) — os relacionamentos do Sequelize (aliases usados em todo
   `include`) nunca eram inicializados. Agora é chamado em ambos.

## 🟠 Bugs de lógica

- **`produto.controller.js` e `usuario.controller.js`**: faltava `return`
  após responder 404/erro em `apagar`/`atualizar`, causando execução
  continuada e erro de "headers already sent" (respondia duas vezes).
- **`usuario.controller.js`**: a senha (hash) estava sendo retornada em
  `listar`/`consultarPK`; e ao atualizar um usuário, uma nova senha enviada
  em texto puro era salva sem hash. Ambos corrigidos.
- **`compraFornecedor.controller.js`**: `listar` ignorava o parâmetro do
  fornecedor e retornava *todas* as compras do sistema, mesmo quando
  chamada em `/fornecedores/:id/compras`. Criada `listarPorFornecedor`
  dedicada, filtrando corretamente.
- **Rotas com nomes de parâmetro incompatíveis com o controller** — cada uma
  causava `undefined` silencioso nas consultas:
  - `/pagamentos` (GET) não tinha `:idPedido`, mas o controller lia
    `req.params.idPedido` → corrigido para `/pedidos/:idPedido/pagamento`.
  - `/logs` (POST) chamava `listarPorUsuario`, que espera `idUsuario` na URL
    e nunca cria nada → adicionada função `cadastrar` de verdade e corrigida
    a rota (`POST /logs` cria, `GET /usuarios/:idUsuario/logs` lista).
  - `/cupons/:id` chamava `consultarCodigo`, que lê `req.params.codigo`
    (sempre `undefined`) → separado em `/cupons/:id` (por PK) e
    `/cupons/codigo/:codigo` (por código).
  - `/itemcompras-forncedores` (com erro de digitação) e `/itempedido` não
    tinham o parâmetro que os controllers esperavam → corrigido para
    `/compras-fornecedor/:idCompra/itens` e `/pedidos/:idPedido/itens`.
- **Rotas duplicadas/conflitantes**: havia duas rotas `GET /pedidos/:id`
  (uma delas — de entrega — ficava inacessível) e `GET /cupons/:id`
  duplicada. Reorganizado sem conflitos.
- **Verbo HTTP errado**: atualização de status de carrinho e de entrega
  estavam em `GET` (deveriam ser `PUT`, já que alteram dado). Corrigido.
- **`estoque.controller.js` e `log.controller.js`** não tinham função de
  criação (`cadastrar`), embora o `teste.http` do próprio projeto já
  esperasse `POST /estoque` e `POST /logs`. Adicionadas.

## ✅ Funcionalidades que faltavam (a maior parte do "terminar o backend")

Usei o `teste.http` do projeto como especificação, já que ele descrevia
endpoints (`/completo`, `/arvore`, criação de pedido com itens) que nunca
tinham sido implementados:

- **`POST /pedidos`** agora aceita um array `itens`, cria as linhas de
  `ItemPedido`, dá baixa no estoque e faz tudo em uma transação (com
  rollback se faltar estoque).
- **`POST /compras-fornecedor`** agora aceita um array `itens`, cria as
  linhas de `ItemCompraFornecedor` e dá entrada no estoque, também em
  transação.
- Endpoints `.../completo` e `.../arvore` com `include` do Sequelize:
  - `GET /usuarios/:id/completo` (endereços, pedidos, avaliações)
  - `GET /produtos/:id/completo` (imagens, especificações, estoque,
    avaliações, categoria, marca, fornecedor)
  - `GET /pedidos/:id/completo` (itens+produto, pagamento, entrega, usuário)
  - `GET /categorias/:id/arvore` (subcategorias + produtos)
  - `GET /carrinhos/:id/completo` (itens + produto de cada item)
  - `GET /fornecedores/:id/completo` (produtos + compras)
- **Todas** as rotas cujos controllers já tinham a função pronta, mas que
  nunca eram chamadas em nenhuma rota, foram conectadas: `consultarCnpj`,
  `consultarNome` (categoria/produto/usuário), `listarPorUsuario`
  (endereço), CRUD completo de imagens e especificações de produto,
  favoritos, avaliações, cupons e itens do carrinho, remoção/listagem de
  cupom por pedido, etc.
- **`.env` / `dotenv`** — já era dependência declarada no `package.json` mas
  nunca usada. Agora `db/conn.js` e `index.js` leem `DB_NAME`, `DB_USER`,
  `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `PORT` e `HOST` do ambiente, com os
  valores antigos como padrão — ou seja, nada quebra se você não criar um
  `.env`. Veja `.env.example`.

## Como rodar

```bash
npm install
cp .env.example .env   # opcional, os valores padrão já batem com o projeto original
npm start
```

Pré-requisito: MySQL rodando localmente com um banco `db_loja` e usuário
`root`/senha `senai` (ou ajuste o `.env`).

## O que eu testei de ponta a ponta (com MySQL real)

Cadastro de usuário → login (JWT) → listagem sem vazar senha → acesso
negado sem token (401) e para não-admin em rota de admin (403) → criação de
categoria/marca/fornecedor/produto/estoque → produto `/completo` →
carrinho + item (com merge de quantidade) → `/carrinhos/:id/completo` →
pedido com itens (baixa de estoque conferida) → `/pedidos/:id/completo` →
pagamento → compra de fornecedor com itens (entrada de estoque conferida)
→ categoria em árvore → cupom (por PK e por código) → favoritos → logs.
Tudo funcionando como esperado.

## O que eu não alterei de propósito

- As credenciais de banco (`db_loja` / `root` / `senai`) — mantive como
  padrão para não quebrar o ambiente de vocês; agora dá para sobrescrever
  via `.env`.
- A regra de negócio de cada controller (validações, mensagens, formato de
  resposta) — só corrigi bugs e completei o que faltava, sem mudar o estilo
  do código já escrito por vocês.
