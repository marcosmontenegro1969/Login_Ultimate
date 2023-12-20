import axios from 'axios';
import React, { useState, useRef } from 'react';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }            
            );

            console.log(response.data);
            setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuário ou senha inválidos');
                // Limpe o campo e defina o foco
                setEmail('');
                setPassword('');
                emailInputRef.current.focus();
            }
        }

    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
    };

    return (
      <div className="login-form-wrap">

        {user == null ? (
            <div>
                <form className='login-form'>
                {/* Linha superior de botões */}
                <div className="button-row">
                    <button className="btn-back">voltar</button>
                    <button className="btn-titulo">entre com seus dados</button>
                </div>

                <label>Seu email <input type="email" 
                        name="email" 
                        placeholder="Email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailInputRef}
                        /></label>

                <label>Sua senha <input type="password" 
                        name="password" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        ref={passwordInputRef}
                        /></label>
                        
                <button type="submit" 
                        className='btn-login'
                        onClick={(e) => handleLogin(e)}>Login</button>
                <p className='p-login'>{error}</p>
                <div className="rodape"></div>
                </form>
                <br></br>
            </div>
        ) : (
            <div>
                <h2>Olá, {user.name}</h2>
                <button type="button" 
                        className='btn-logout'
                        onClick={(e) => handleLogout(e)}>Logout</button> 
            </div>
        )}
      </div>
    );
  }

  export default Login;