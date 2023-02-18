import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

var re_mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var re_password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError1, setError1] = useState(false);
  const [showError2, setError2] = useState(false);
  const [showError, setError] = useState(false);
  const [showError3, setError3] = useState(false);
  const [showError4, setError4] = useState(false);
  const { login } = useContext(AuthContext);

  const validate = async () => {
      if (!re_mail.test(String(email).toLowerCase())) {
        setError1(true);
        return false;
      }
      if (username.includes(' ')) {
        setError2(true);
        return false;
      }
      if(!re_password.test(password)) {
        setError3(true);
        return false;
      }
      if (password !== confirmPassword) {
        setError4(true);
        return false;
      }
      return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      const data = await axios.post('http://127.0.0.1:4444/signup', { username, email, password }).catch((err) => console.log(err));
      login(data.data.token);
      window.history.back();
    } catch {
      setError(true);
    }
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          />
          {showError2 ? <span className='error'>Username already Taken.</span> : <></>}
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {showError4 ? <span className='error'>Password doesn't match.</span> : <></>}
      </div>
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {showError ? <span className='error'>Sign Up Failed.</span> : <></> }
    </form>
  </div>
  );
};

export default SignUp;