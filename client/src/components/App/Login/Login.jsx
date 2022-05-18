/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Login.scss';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'service/api/baseUrl';
import SignLayout from 'layouts/SignLayout/SignLayout';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('/account/login', { username, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/messenger', { replace: true });
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SignLayout
      footer={
        <Link to="/messenger/account/register">
          <h3>create an account</h3>
        </Link>
      }
    >
      <h3>Login</h3>
      <Formik
        initialValues={{
          username: '',
          password: '',
          rememberMe: false,
        }}
      >
        <form className="login__form">
          <input
            type="text"
            className="form-control login__input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control login__input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-check login__checkbox">
            <label htmlFor="remember" className="form-check-label">
              remember my login
            </label>
            <input type="checkbox" name="rememberMe" className="form-check-input " />
          </div>
          <button className="btn btn-primary" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </Formik>
    </SignLayout>
  );
}

export default Login;
