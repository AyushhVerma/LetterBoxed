import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError1, setError1] = useState(false);
  const [showError3, setError3] = useState(false);
  const [showError, setError] = useState(false);
  const { login } = useContext(AuthContext);

  const validate = async () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setError1(true);
      return false;
    }
    var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!re.test(password)) {
      setError3(true);
      return false;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const data = await axios.post('http://127.0.0.1:4444/login', { email, password }).catch((error)=> { setError(true); });
    login(data.data.token);
    window.history.back();
  };
  return (
    <div className='signup-div'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {showError1 ? <span className='error'>Invalid email id.</span> : <></>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {showError3 ? <span className='error'>Password invalid.</span> : <></>}
        </div>
        <button type="submit">Login</button>
        <p>
          Already have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {showError ? <p>Login Failed</p> : <></>}
        </form>
    </div>
  );
};

export default Login;