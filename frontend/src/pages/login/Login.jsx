import React, { useEffect, useState } from "react";
import styles from './Login.module.css'; // Importa o CSS module
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PersonService from "../../services/PersonService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();
    const personService = new PersonService();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setUser((prevState) => ({ ...prevState, email: savedEmail }));
        }
    }, []); 

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const validateFields = () => {
        const {email, password, } = user;
        let missingFields = [];

        if (!email) missingFields.push(t('profile.email'));
        if (!password) missingFields.push(t('profile.password'));

        if (missingFields.length > 0) {
            const errorMessage = `${t('error.errorFieldsRequired')}: ${missingFields.join(', ')}`;
            toast.error(errorMessage);
            return false;
        }
        return true;
    };
   

    const login = async () => {
        if (!validateFields()) return;
        try{
            const response =  await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            localStorage.setItem("userType", 'user');
            navigate("/");
        } catch(err){
            console.log(err);
            handleServerError(err);
        }
    }

    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    toast.error(t('error.notValidated')); // Conta não esta validada
                    break;
                case 401:
                    toast.error(t('error.invalidCredentials')); // Credenciais inválidas
                    break;
                case 404:
                    toast.error(t('error.userNotFound')); // Uusário não encontrado
                    break;
                case 500:
                    toast.error(t('error.errorServer')); // Erro interno do servidor
                    break;
                default:
                    toast.error(t('error.errorUnexpected')); // Erro inesperado
            }
        } else {
            toast.error(t('error.errorNetwork')); // Erro de rede
        }
    };


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
                        value={user.email}
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