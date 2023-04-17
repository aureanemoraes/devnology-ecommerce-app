import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        const data = {
            email,
            password,
            name,
            password_confirmation: passwordConfirmation
        }

        fetch(`http://localhost:8000/api/register`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
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
      }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">{t('register')}</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div className="form my-3">
                                <label for="Name">{t('name')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label for="Email">{t('email')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">{t('password')}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">{t('password_confirmation')}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" onClick={handleRegister}>
                                    {t('register')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register