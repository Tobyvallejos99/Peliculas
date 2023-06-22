import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
        username,
        password
        });

        const { token } = response.data;
        setToken(token);
        setInvalidCredentials(false);
    } catch (error) {
        console.log('Error de inicio de sesión:', error);
        setInvalidCredentials(true);
    }
    };

    const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    alert('Token copiado al portapapeles');
    };

    return (
    <div className={styles.container}>
        <h2>Iniciar sesión</h2>
        <div>
        <label htmlFor="username">Usuario:</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="password">Contraseña:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button onClick={handleLogin}>Iniciar sesión</button>

        {invalidCredentials && <p className={styles.error}>Credenciales inválidas</p>}

        {token && (
        <div>
            <h3>Token JWT:</h3>
            <button onClick={handleCopyToken}>Copiar</button>
        </div>
        )}
    </div>
    );
    };

export default Login;
