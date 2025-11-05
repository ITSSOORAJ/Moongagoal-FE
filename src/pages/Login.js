import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login({ setToken, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login({ email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'12px auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-group"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/></div>
          <div className="form-group"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/></div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button className="btn" type="submit">Login</button>
            <a href="/register" className="small">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
