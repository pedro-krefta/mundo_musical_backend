# Mundo Musical - Frontend

Frontend em HTML, CSS e JavaScript puro integrado ao backend Express enviado.

## Como executar
1. Extraia a pasta `frontend` junto da pasta `backend` do projeto.
2. Inicie o backend: dentro de `backend`, execute `npm install` (se necessário) e `npm start` ou `node index.js`.
3. Abra `frontend/index.html` no navegador. Se preferir, use a extensão Live Server do VS Code.
4. A API está configurada inicialmente em `http://localhost:3000`.

Se a API estiver em outro endereço, altere a variável `API` no começo de `js/app.js` ou rode no console do navegador:
`localStorage.setItem('mm_api', 'http://localhost:3000')` e atualize a página.

## Acesso
- O cadastro pela tela cria usuários CLIENTE, conforme a regra do backend.
- Para entrar como ADMIN, use uma conta já cadastrada com `tipoUsuario: "ADMIN"` no banco.
- O token JWT é salvo no localStorage e enviado como `Authorization: Bearer ...`.

## Funcionalidades incluídas
- Login e cadastro de cliente.
- Catálogo, pesquisa e filtro por categoria.
- Carrinho, remoção de itens e finalização de pedido.
- Aplicação/registro de cupom no pedido.
- Histórico de pedidos.
- Favoritos, endereços e perfil.
- Painel ADMIN: produtos, cupons (criar/editar/excluir/ativar), categorias, marcas, usuários, pedidos, estoque, fornecedores e logs.

## Observações importantes sobre a API atual
- O backend não possui rota pública de consulta de produtos: o catálogo exige login.
- A rota `POST /cupons-pedido` apenas registra o cupom informado; o backend não valida regras/limite de uso nem recalcula o valor do pedido. O frontend calcula uma estimativa do desconto e envia o valor.
- O backend não fornece upload de imagens nem rota de cadastro de estoque no painel atual; o estoque existente pode ser ajustado.
- Algumas operações podem retornar erro se houver campos obrigatórios ou relacionamentos que ainda não foram cadastrados no banco.
- O checkout usa `POST /pedidos` com `itens`, exatamente como implementado no controller do projeto.
