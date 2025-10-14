import React, { useState } from 'react';

const API = 'http://localhost:5173';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        `${API}/users?username=${encodeURIComponent(username)}`
      );
      const users = await res.json();
      const user = users.find(u => u.password === password);
      if (user) {
       
        const fakeToken = 'token-' + Math.random().toString(36).slice(2);
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('username', user.username);
        onLogin({ username: user.username, name: user.name });
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка соединения');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
      <input
        placeholder='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        placeholder='password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <button type='submit'>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
