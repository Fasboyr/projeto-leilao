import React, { useState } from "react";
import "./Login.css";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';





const Login = () =>{
    const [user, setUser] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleChange = (input) =>{
        setUser({...user, [input.target.name]:input.target.value});
    }

    const login = () => {
        let token = "token do backend"
        if(user.email == "fabio.filho2002@hotmail.com" && user.password == "123"){
        localStorage.setItem("token", token);
        localStorage.setItem("email", user.email);
        navigate("/");
        } else {
            alert("User ou Senha Incorretos");
        }
    }
     return(
        <div className="login-grid">
            <Card title= "Login">

                <div class="field">
                    <InputText onChange={handleChange} name="email" id="email" className="input-field" placeholder="Digite aqui seu email" />

                </div>
                <div class="field">
                     <Password onChange={handleChange} name="password" id="password" className="input-field" placeholder="Digite aqui sua senha" feedback={false} />

                </div>
           
                <div className="button-container">
                    <Button onClick={login} label="Login" className="login-button" />
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