import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

 
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });


  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (isRegisterMode) {
      // Проверяем, есть ли уже такой email
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        setError('User already exists');
        return;
      }

    
      const newUser = { email, password };
      const updatedUsers = [...users, newUser];

      
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));

    
      setEmail('');
      setPassword('');

     
      navigate('/');
    } else {
     
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="login-container">
      <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isRegisterMode ? 'Register' : 'Login'}</button>
      </form>

      <p>
        {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setIsRegisterMode(!isRegisterMode)}
        >
          {isRegisterMode ? 'Login' : 'Register'}
        </span>
      </p>


      {localStorage.getItem('isLoggedIn') === 'true' && (
        <button
          onClick={handleLogout}
          style={{ marginTop: '10px', background: 'red', color: 'white' }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Login;
