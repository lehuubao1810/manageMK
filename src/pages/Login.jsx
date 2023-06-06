import '../assets/css/login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Failed to log in');
    }
  };

  return (
    <div className='loginPage'>
      <div className="login">
        <h1>MK PHOTO</h1>
        <form onSubmit={handleSubmit}>
          <div className='email'>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='password'>
            <label>Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <div className='errorLog'>{error}</div>}
          </div>

          <button type="submit">Đăng nhập</button>
        </form>
      </div>

    </div>
  );
}

export default Login;