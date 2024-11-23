import React, { useState } from 'react';
import styles from './Register.module.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../components/password/passwordValidation';
import { useNavigate } from 'react-router-dom';
import PersonService from '../../services/PersonService';

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleCancel = () => {
        navigate("/login");
    };


    const handleChange = (input) => {
        console.log(input.target.name, input.target.value); 
        setUser({ ...user, [input.target.name]: input.target.value });
    };
    

    const register = async () => {
        try {
            const response = await personService.register(user);
            localStorage.setItem("email", user.email);
            navigate("/confirm");
        } catch (err) {
            console.log(err);
            alert("usuário ou senha incorretos")
        }
    }

    return (
        <div className={styles.registerGrid}>
            <Card title={t('signUpTitle')} className={styles.registerBackground}>
                <div className="field">
                    <InputText
                        onChange={handleChange}
                        id="name"
                        name="name"
                        type="text"
                        className="text-base  surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('name')}
                        value={user.name} // Adicionado o atributo value
                    />
                </div>

                <div className="field">
                    <InputText
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="text"
                        className="text-base surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('email')}
                        value={user.email} // Adicionado o atributo value
                    />
                </div>

                <div className="field">
                    <PasswordValidation
                        password={user.password}
                        setPassword={(value) => setUser({ ...user, password: value })}
                    />
                </div>

                <div className={styles.registerOptions}>
                    <Button label={t('cancel')} size="small" className={styles.registerButtons} onClick={handleCancel} />
                    <Button label={t('signUpButton')} size="small" className={styles.registerButtons} onClick={register} />
                </div>
            </Card>
        </div>
    );
};

export default Register;
