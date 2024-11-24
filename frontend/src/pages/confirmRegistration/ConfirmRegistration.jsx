import React, { useEffect, useState } from "react";
import styles from './ConfirmRegistration.module.css'; // Importa o CSS module
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonService from "../../services/PersonService";

const ConfirmRegistration = () => {
    const [user, setUser] = useState({ email: "", password: "", validationCode: "" });
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
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
    };

    const handleCancel = () => {
        navigate("/login");
    };

    const validateFields = () => {
        const {email, password, validationCode } = user;
        let missingFields = [];

        if (!email) missingFields.push(t('profile.email'));
        if (!password) missingFields.push(t('profile.password'));
        if(!validationCode) missingFields.push(t('profile.validationCode'))

        if (missingFields.length > 0) {
            const errorMessage = `${t('error.errorFieldsRequired')}: ${missingFields.join(', ')}`;
            toast.error(errorMessage);
            return false;
        }
        return true;
    };

    const confirmar = async () => {
        if (!validateFields()) return;

        setIsLoading(true); // Ativa o estado de carregamento
        try {
            await personService.validate(user); // Validação do código
            const response = await personService.login(user); // Autenticação do usuário
            localStorage.setItem("token", response.token);
            toast.success(t('alert.validationSucess')); // Mensagem de sucesso
            navigate("/");
        } catch (err) {
            handleServerError(err); // Tratamento de erros
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    const handleServerError = (err) => {
        if (err.response) {
            const { status, data } = err.response;
            const message = data?.message || "";

            switch (status) {
                case 400:
                    if (message.includes("expirado")) {
                        toast.error(t('error.codeExpired')); // Código expirado
                    } else if (message.includes("inválido")) {
                        toast.error(t('error.codeInvalid')); // Código inválido
                    } else {
                        toast.error(message); // Outras mensagens genéricas
                    }
                    break;
                case 401:
                    toast.error(t('error.invalidCredentials')); // Credenciais inválidas
                    break;
                case 404:
                    toast.error(t('error.userNotFound')); // Credenciais inválidas
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
            <Card title={t('confirmation.title')} className={styles.loginBackgroundColor}>
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
                <div className="field">
                    <InputText
                        onChange={handleChange}
                        name="validationCode"
                        id="validationCode"
                        inputClassName="w-full"
                        className="w-full"
                        placeholder={t('change.code')}
                        value={user.validationCode}
                    />
                </div>
                <div className={styles.changeOptions}>
                    <Button
                        label={t('cancel')}
                        size="small"
                        className={styles.changeButtons}
                        onClick={handleCancel}
                    />
                    <Button
                        label={isLoading ? null : t('confirmation.validation')} // Esconde texto se estiver carregando
                        size="small"
                        className={styles.changeButtons}
                        onClick={confirmar}
                        disabled={isLoading} // Desabilita o botão durante o carregamento
                        icon={isLoading ? "pi pi-spin pi-spinner" : null} // Ícone de carregamento
                    />
                </div>
            </Card>
        </div>
    );
};

export default ConfirmRegistration;
