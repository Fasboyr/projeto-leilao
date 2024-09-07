import React, { useState } from "react";
import styles from './Login.module.css'; // Importa o CSS module

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const login = () => {
        let token = "token do backend"
        if (user.email === "fabio.filho2002@hotmail.com" && user.password === "123") {
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/profile");
        } else {
            alert("Usuário ou Senha Incorretos");
        }
    }

    return (
        <div className={styles.loginGrid} >
            <Card title="Login" className={styles.loginBackgroundColor}>
                <div className="field">
                    <InputText 
                        onChange={handleChange} 
                        name="email" 
                        id="email" 
                        className="input-field" 
                        placeholder={t('email')}
                    />
                </div>
                <div className="field">
                    <Password 
                        onChange={handleChange} 
                      
                        name="password" 
                        id="password" 
                        className="input-field" 
                        placeholder={t('password')}
                        feedback={false} 
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button 
                        onClick={login} 
                        label={t('login')} 
                        className={styles.loginButton} 
                    />
                </div>
                <div className={styles.loginOptions}>
                    <Link to="/register" className="sign-up">{t('register')}</Link>
                    <Link to="/recover" className="forgot-password">{t('recover')}</Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;
