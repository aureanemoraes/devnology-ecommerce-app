import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // fetch('http://localhost:8000/sanctum/csrf-cookie').then(response => {
      fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const { data } = jsonResponse;

        // eslint-disable-next-line
        globalThis?.sessionStorage.setItem('token', data.token);

        // eslint-disable-next-line
        globalThis?.sessionStorage.setItem('user', JSON.stringify(data.user));

        navigate("/cart");
      });
    // });
  }


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="my-3">
                <label for="display-4">{t('email')}</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label for="floatingPassword display-4">{t('password')}</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>{t('newHere')} <Link to="/register" className="text-decoration-underline text-info">{t('register')}</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" onClick={handleLogin}>
                  {t('login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
