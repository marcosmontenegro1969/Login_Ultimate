const express = require('express'); //carrega o Express, o framework padrão para Node.js que facilita a criação de servidores web e a manipulação de rotas e requisições HTTP.
const rotas = express.Router(); //cria o objeto de roteador "routes" onde definiremos nossa rota

//cria um array com usuarios fixos para teste, simulando um banco de dados
const usuarios = [
  {id: 1, email: 'CANGAME@GMAIL.COM', senha: 'admin123', nivel: 'admin',       data: '01/01/2023'},
  {id: 2, email: 'ITALO@GMAIL.COM',   senha: 'admin123', nivel: 'admin',       data: '01/02/2023'},
  {id: 3, email: 'JOÃO@GMAIL.COM',    senha: 'admin123', nivel: 'gestor',      data: '01/03/2023'},
  {id: 4, email: 'MARCOS@GMAIL.COM',  senha: 'admin123', nivel: 'admin',       data: '01/04/2023'},
  {id: 5, email: 'EDUARDO@GMAIL.COM', senha: 'admin123', nivel: 'solicitante', data: '01/05/2023'},
  {id: 6, email: 'RODOLFO@GMAIL.COM', senha: 'admin123', nivel: 'gestor',      data: '01/06/2023'},
]

//cria a rota POST, que recebe uma solicitação de login e retorna um usuário se as credenciais forem válidas.
rotas.post('/login', (request, response) => {

  const {email, senha} = request.body; //extrai as propriedades email e senha do objeto request.body, e as atribui às constantes nome e senha, respectivamente.
  
  //procura um usuário no array usuarios cujo nome e senha correspondam aos fornecidos na solicitação, se encontrar os
  //armazenará na constante "usuario". Se não encontrar, a constante "usuario" receberá "nulo".
  const usuario = usuarios.find(usuario => usuario.email === email.toUpperCase() && usuario.senha === senha);


  //verifica se a constante "usuario" é diferente de "nulo", ou seja, se encontrou um usuário correspondente.
  if (usuario) {
    return response.status(200).json(usuario); //Se encontrar, envia uma resposta JSON de sucesso (status 200) com o usuário encontrado.
  }
  return response.status(401).json({message: 'Login ou senha inválidos'}); //Se não encontrar, envia uma resposta JSON de não autorizado (status 401).
});

module.exports = rotas; //exporta o objeto de roteador "routes" para que possa ser importado em outros arquivos.
