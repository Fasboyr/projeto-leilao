import React from "react";
import "./Login.css";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';





const Login = () =>{

    return(
        <div className="login-grid">
            <Card title= "Login">

                <div class="field">
                    <InputText className="input-field" placeholder="Digite aqui seu email" />

                </div>
                <div class="field">
                    <Password className="input-field" placeholder="Digite aqui sua senha" feedback={false} />

                </div>
           
                <div className="button-container">
                    <Button label="Login" className="login-button" />
                </div>
                <div className="login-options">
                    <a href="#" className="sign-up">Cadastre-se</a>
                    <a href="#" className="forgot-password">Esqueceu a senha?</a>
                </div>
            </Card>
        </div>
    );
}
export default Login;