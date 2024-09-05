import React, { useState } from "react";
import "./Login.css";

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
        if (user.email == "fabio.filho2002@hotmail.com" && user.password == "123") {
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
        } else {
            alert("User ou Senha Incorretos");
        }
    }
    return (

        <div className="login-grid">
            <Card title="Login" className="login-background-color">

                <div class="field">
                    <InputText onChange={handleChange} name="email" id="email" className="input-field" placeholder="Digite aqui seu email" />

                </div>
                <div class="field">
                    <Password onChange={handleChange} name="password" id="password" className="input-field" placeholder="Digite aqui sua senha" feedback={false} />

                </div>

                <div className="button-container">
                    <Button onClick={login} label={t('button.login')} className="login-button" />
                </div>
                <div className="login-options">
                    <Link to="/register" className="sign-up">Cadastre-se</Link>
                    <Link to="/recover" className="forgot-password">Esqueceu a senha?</Link>
                </div>
            </Card>
        </div>
    );
}
export default Login;