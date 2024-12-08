import React, { useState } from 'react';
import styles from './Register.module.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../components/password/passwordValidation';
import { useNavigate } from 'react-router-dom';
import PersonService from '../../services/PersonService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleCancel = () => {
        navigate("/");
    };

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    };

    const validateFields = () => {
        const { name, email, password } = user;
        let missingFields = [];

        if (!name) missingFields.push(t('profile.name'));
        if (!email) missingFields.push(t('profile.email'));
        if (!password) missingFields.push(t('profile.password'));

        if (missingFields.length > 0) {
            const errorMessage = `${t('error.errorFieldsRequired')}: ${missingFields.join(', ')}`;
            toast.error(errorMessage);
            return false;
        }
        return true;
    };

    const register = async () => {
        if (!validateFields()) return;

        setIsLoading(true); // Ativa o estado de carregamento
        try {
            const response = await personService.register(user);
            toast.success(t('alert.creationSucess'));
            localStorage.setItem("email", user.email);
            navigate("/confirm");
        } catch (err) {
            console.error(err);
            handleServerError(err);
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    if (err.response.data.fieldErrors) {
                        const fieldErrors = err.response.data.fieldErrors;
                        const errorMessages = Object.values(fieldErrors).join('. ');
                        toast.error(errorMessages);
                    } else {
                        toast.error(`${err.response.data.message}`);
                    }
                    break;
                case 409:
                    toast.error(t('alert.emailError'));
                    break;
                case 500:
                    toast.error(t('error.errorServer'));
                    break;
                default:
                    toast.error(t('error.errorUnexpected'));
            }
        } else {
            toast.error(t('error.errorNetwork'));
        }
    };

    return (
        <div className={styles.registerGrid}>
            <Card title={t('signUpTitle')} className={styles.registerBackground}>
                <div className="field">
                    <InputText
                        onChange={handleChange}
                        id="name"
                        name="name"
                        type="text"
                        className="text-base surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('name')}
                        value={user.name}
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
                        value={user.email}
                    />
                </div>

                <div className="field">
                    <PasswordValidation
                        password={user.password}
                        setPassword={(value) => setUser({ ...user, password: value })}
                    />
                </div>

                <div className={styles.registerOptions}>
                    <Button
                        label={t('cancel')}
                        size="small"
                        className={styles.registerButtons}
                        onClick={handleCancel}
                    />
                    <Button
                        label={isLoading ? null : t('signUpButton')} // Não exibe texto se estiver carregando
                        size="small"
                        className={styles.registerButtons}
                        onClick={register}
                        disabled={isLoading} // Desabilita o botão durante o carregamento
                        icon={isLoading ? "pi pi-spin pi-spinner" : null} // Ícone de carregamento
                    />
                </div>
            </Card>
        </div>
    );
};

export default Register;
