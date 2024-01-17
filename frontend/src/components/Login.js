// Importações necessárias para o componente
import axios from 'axios'; // Para fazer requisições HTTP
import { useState } from 'react'; // Hook do React para gerenciar estado
import Logo from './logo-cangame.png'; // Importa a imagem do logo
import CarrosselPremios from './CarrosselPremios'; // Componente de carrossel
import InputLogin from './InputLogin'; // Componente personalizado para input

// Componente funcional 'Login'
function Login() {
    // Estados locais para gerenciar informações de login e do usuário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState('');

    // Função para lidar com o processo de login
    const handleLogin = async (evento) => {
        evento.preventDefault(); // Previne o recarregamento padrão da página ao enviar o formulário

        try {
        // Faz uma requisição POST com os dados de login.
        const response = await axios.post(
            'http://localhost:3000/login',
            JSON.stringify({ email, senha }),
            { headers: { 'Content-Type': 'application/json' }}
        );
        setUsuario(response.data); // Define os dados do usuário em caso de sucesso.
        } catch (error) {
            // Gerenciamento de diferentes tipos de erros na requisição
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response?.status === 401) {
                setError('Usuário ou senha inválidos');
            } else {
                setError('Erro no login');
            }
        }
    };

    // Função para lidar com o logout do usuário
    const handleLogout = () => {
        setEmail('');
        setSenha('');
        setUsuario(null);
        setError('');
    };

    return (
        <div className='login-Container'>
            <div className='login-Image'>
                {/* Imagem do logo e informações da empresa */}
                <div className='img_Logo'>
                    <img src={Logo} alt='Logo' />
                </div>
                <div className='nome-empresa'>
                    <span className='bold'>can</span>
                    <span className='light'>game</span>
                </div>
                <div className='palavra-edu'>
                    <span className='edu-letra'>e</span>
                    <span className='edu-letra'>d</span>
                    <span className='edu-letra'>u</span>
                </div>
                {/* Carrossel de prêmios */}
                <div className='carrossel_Container'>
                    <CarrosselPremios />
                </div>
            </div>
            {/* Renderização condicional: Formulário de login ou informações do usuário logado */}
            {usuario == null ? (
                <div className='login-Formulario'>
                    <h2 className='h2_bem-vindo'>Bem-vindo ao CanGame edu</h2>
                    <form className='input_Container'>
                        <InputLogin 
                            type="text"
                            name="email"
                            label="Digite seu e-mail"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            onFocus={() => setError('')}
                        />            
                        <InputLogin 
                            type="password"
                            name="senha"
                            label="Digite sua senha"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                            onFocus={() => setError('')}
                        />
                        <p className='mensagem_Erro'>{error}</p>
                        <button type='submit' className='btn-login'
                                disabled={!email.trim() || !senha.trim()}
                                onClick={(evento) => handleLogin(evento)}>LOGIN</button>
                    </form>
                </div>
            ) : ( 
                <div id='div_Logado'>
                    <h2 className='h2_logado'>Olá {usuario.email}, você logou como {usuario.nivel}</h2>
                    {/* Botão de logout que chama a função handleLogout ao ser clicado */}
                    <button type='button' className='btn_Logado'
                            onClick={() => handleLogout()}>SAIR</button>
                </div>
            )}
        </div>
    );
}
export default Login; // Exporta o componente Login para ser utilizado em outras partes do aplicativo