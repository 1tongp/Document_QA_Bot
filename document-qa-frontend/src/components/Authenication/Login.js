import React, { useState } from 'react';
import { login } from '../../services/api';
import { Colors } from '../../Constants/Colors';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            onLogin(res.data.user);
        } catch (err) {
            setError(err?.error || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Log in</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={styles.input}
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
                required
            />
            <button type="submit" style={styles.button}>Login</button>
            {error && <p style={styles.error}>{error}</p>}
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flexGrow: 1,
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        border: 'none',
        backgroundColor: Colors.charcoal,
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '13px',
    },
};

export default Login;
