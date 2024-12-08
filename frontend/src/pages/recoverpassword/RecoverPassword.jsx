import React, { useState } from "react";
import styles from "./RecoverPassword.module.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonService from "../../services/PersonService";

const RecoverPassword = () => {
    const [user, setUser] = useState({ email: "" });
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
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
        const {email} = user;
        let missingFields = [];

        if (!email) missingFields.push(t('profile.email'));

        if (missingFields.length > 0) {
            const errorMessage = `${t('error.errorFieldsRequired')}: ${missingFields.join(', ')}`;
            toast.error(errorMessage);
            return false;
        }
        return true;
    };

    const recover = async () => {
        if (!validateFields()) return;

        setIsLoading(true); // Ativa o estado de carregamento
        try {
            await personService.recover(user);
            localStorage.setItem("email", user.email);
            toast.success(t('alert.passwordRecovery')); // Mensagem de sucesso
            navigate("/changeLogout");
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
                    toast.error(message.includes("não encontrado")
                        ? t('error.userNotFound') // E-mail não cadastrado
                        : t('error.invalidRequest')); // Outro erro de requisição inválida
                    break;
                case 404:
                    toast.error(t('error.userNotFound'));
                    break;
                case 500:
                    toast.error(t('error.emailServerError')); // Problemas com o servidor de e-mail
                    break;
                default:
                    toast.error(t('error.errorUnexpected')); // Erro inesperado
            }
        } else {
            toast.error(t('error.errorNetwork')); // Erro de rede
        }
    };

    return (
        <div className={styles.recoverGrid}>
            <Card title={t('recoverTitle')} className={styles.recoverBackground}>
                <div className="field">
                    <InputText
                        id="email"
                        type="text"
                        name="email"
                        className="text-base surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('email')}
                        onChange={handleChange}
                        value={user.email}
                    />
                </div>

                <div className={styles.recoverOptions}>
                    <Button
                        label={t('cancel')}
                        size="small"
                        className={styles.recoverButtons}
                        onClick={handleCancel}
                        disabled={isLoading} // Desabilita o botão durante o carregamento
                    />
                    <Button
                        label={isLoading ? null : t('recoverButton')}
                        size="small"
                        className={styles.recoverButtons}
                        onClick={recover}
                        disabled={isLoading} // Desabilita o botão durante o carregamento
                        icon={isLoading ? "pi pi-spin pi-spinner" : null} // Ícone de carregamento
                    />
                </div>
            </Card>
        </div>
    );
};

export default RecoverPassword;
