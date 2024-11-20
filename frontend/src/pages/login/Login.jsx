import React, { useState } from "react";
import styles from './Login.module.css'; // Importa o CSS module
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PersonService from "../../services/PersonService";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();
    const personService = new PersonService();

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const login = async () => {
        try{
            const response =  await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
        } catch(err){
            console.log(err);
            alert("usuário ou senha incorretos")
        }
    }


    return (
        <div className={styles.loginGrid}>
            <Card title="Login" className={styles.loginBackgroundColor}>
                <div className="field">
                    <InputText 
                        onChange={handleChange} 
                        name="email" 
                        id="email" 
                        inputClassName="w-full"
                        className="w-full"
                        placeholder={t('email')}
                    />
                </div>
                <div className="field">
                    <Password 
                        onChange={handleChange} 
                        name="password" 
                        id="password" 
                        placeholder={t('password')}
                        feedback={false} 
                        toggleMask
                        pt={{ iconField: { root: { className: 'w-full' } } }}
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
                    <Link className={styles.options} to="/register">{t('register')}</Link>
                    <Link className={styles.options} to="/recover">{t('recover')}</Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;