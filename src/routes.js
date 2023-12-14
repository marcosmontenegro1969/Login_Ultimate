//carrega a biblioteca Express, que ajuda a organizar e simplificar o desenvolvimento
// de aplicativos web em Node.js.
const express = require('express'); 

//cria o objeto de roteador "routes" onde definiremos nossa rota
const rotas = express.Router();

//cria usuarios fixos para teste, depois será utilizado algum banco de dados
const usuarios = [
  {id: 1, nome: 'Eduardo', senha: '123', nivel: 'solicitante', data: '01/01/2023'},
  {id: 2, nome: 'Italo', senha: '123', nivel: 'admin', data: '01/02/2023'},
  {id: 3, nome: 'João', senha: '123', nivel: 'gestor', data: '01/03/2023'},
  {id: 4, nome: 'Marcos', senha: '123', nivel: 'admin', data: '01/04/2023'},
  {id: 5, nome: 'Matheus', senha: '123', nivel: 'solicitante', data: '01/05/2023'},
  {id: 6, nome: 'Rodolfo', senha: '123', nivel: 'gestor', data: '01/06/2023'},
]

//Cria nossa rota para lidar com solicitações POST para o caminho '/login'.dentro do objeto
//de roteador routes no Express.js. Esta rota responderá a solicitações POST feitas para '/login'.
rotas.post('/login', (request, response) => {

  //extrai as propriedades email e senha do objeto request.body 
  //e as atribui às constantes email e senha, respectivamente.
  const {nome, senha} = request.body;
  
  //Usa o método Array.find() para procurar um usuário no array usuarios cujo e-mail e senha
  //correspondam aos fornecidos na solicitação. Se encontrar um usuário, ele é armazenado na variável usuario.
  //se não encontrar, a constante "usuario" receberá "nulo".
  const usuario = usuarios.find(usuario => usuario.nome === nome & usuario.senha === senha);

  //Verifica se um usuário foi encontrado. 
  if (usuario) {
    //Se encontrou, envia uma resposta JSON de sucesso (status 200) contendo os detalhes do usuário.
    return response.status(200).json(usuario);
  }
  //Se não encontrar um usuário correspondente, envia uma resposta JSON de não autorizado (status 401)
  //indicando que as credenciais são inválidas.
  return response.status(401).json({message: 'Login ou senha inválidos'});
});

//Exporta o objeto de roteador "rotas" para que possa ser importado e utilizado em outros arquivos do projeto.
module.exports = rotas;