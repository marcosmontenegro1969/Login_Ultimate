const express = require('express'); //carrega a biblioteca Express, que ajuda a organizar e simplificar o desenvolvimento em Node.js.
const rotas = require('./routes'); //importa para a variável "routes" a rota criada no arquivo routes.js
const cors = require('cors'); //pacote que permite que o appback seja acessado por outra origem, como por exemplo o appfront. 
const appback = express(); //appback será o nosso servidor.

appback.use(express.json()); //informa ao servidor appback que usará o formato JSON para as requisições.
appback.use(cors()); //diz ao servidor que usará o cors, que permite o acesso de outra origem, como por exemplo o appfront.
appback.use (rotas); //diz ao nosso servidor appback que use a rota criada no arquivo routes.js

//inicia o servidor na porta 3000, e imprime uma mensagem de confirmação no console.
appback.listen(3000, () => {
  console.log('Servidor iniciado. Escutando na porta 3000');
});
