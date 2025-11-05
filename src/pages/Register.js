import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register({ setToken, setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.register({ name, email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'12px auto'}}>
        <h2>Sign up</h2>
        <form onSubmit={submit}>
          <div className="form-group"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required/></div>
          <div className="form-group"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/></div>
          <div className="form-group"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/></div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button className="btn" type="submit">Create</button>
            <a href="/login" className="small">Have account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
