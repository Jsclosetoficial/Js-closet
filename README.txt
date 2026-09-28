JS CLOSET — SITE DE LOJA ONLINE
=================================

O site já está estruturado para:
- catálogo de produtos;
- carrinho com quantidades e total;
- formulário de checkout;
- pagamento: Pix, dinheiro, débito e crédito;
- entrega com mensagem "consulte sua taxa";
- envio do pedido pronto para o WhatsApp.

CONFIGURAR O WHATSAPP
---------------------
1. Abra o arquivo script.js.
2. Procure:
   const WHATSAPP_NUMBER = "55SEUNUMEROAQUI";
3. Troque pelo número da loja somente com números.
   Exemplo: 5592999999999
4. Salve.

ALTERAR PRODUTOS
----------------
No começo do script.js existe a lista "products".
Você pode alterar nome, categoria, preço, emoji e etiqueta.
Para usar fotos reais, o bloco "product-img" pode ser trocado por <img>.

PUBLICAÇÃO
----------
O site é estático e pode ser publicado em serviços de hospedagem estática.
Não é necessário banco de dados para o fluxo inicial: o carrinho funciona no navegador
e o pedido é enviado diretamente para o WhatsApp.

IMPORTANTE
----------
Os produtos e preços incluídos são apenas exemplos. Substitua pelos seus produtos
reais antes de divulgar a loja.
