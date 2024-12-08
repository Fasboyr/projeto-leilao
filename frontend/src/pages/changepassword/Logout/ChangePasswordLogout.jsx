import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../../components/password/passwordValidation';
import PasswordConfirmation from '../../../components/password/passwordConfirmation';
import styles from './ChangePasswordLogout.module.css';
import { useNavigate } from 'react-router-dom';
import PersonService from '../../../services/PersonService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordLogout = () => {
    const [user, setUser] = useState({ email: "", validationCode: "", newPassword: "" });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationError, setConfirmationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setUser((prevState) => ({ ...prevState, email: savedEmail }));
        }
    }, []);

    const handleCancel = () => {
        navigate("/");
    };

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    };

    const validateFields = () => {
        const { email, validationCode, newPassword } = user;
        let missingFields = [];

        if (!email) missingFields.push(t('profile.email'));
        if (!validationCode) missingFields.push(t('profile.validationCode'));
        if (!newPassword) missingFields.push(t('profile.password'));

        if (missingFields.length > 0) {
            toast.error(`${t('error.errorFieldsRequired')}: ${missingFields.join(', ')}`);
            return false;
        }

        if (confirmationError) {
            toast.error(confirmationError);
            return false;
        }

        return true;
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
                    toast.error(t('error.errorServer'));
                    break;
                default:
                    toast.error(t('error.errorUnexpected'));
            }
        } else {
            toast.error(t('error.errorNetwork'));
        }
    };

    const changeLogout = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        try {
            await personService.changeLogout(user);
            toast.success(t('alert.passwordChange'));
            navigate("/");
        } catch (err) {
            console.error(err);
            handleServerError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const validateConfirmation = (passwordValue, confirmPasswordValue) => {
        if (passwordValue !== confirmPasswordValue) {
            setConfirmationError(t('validation.confirmation'));
        } else {
            setConfirmationError('');
            setUser((prevState) => ({
                ...prevState,
                newPassword: confirmPasswordValue,
            }));
        }
    };

    const onConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmation(password, value);
    };

    return (
        <div className={styles.changeGrid}>
            <Card title={t('change.title')} className={styles.changeBackground}>
                <div className={styles.field}>
                    <InputText
                        onChange={handleChange}
                        id="email"
                        type="text"
                        name="email"
                        className="text-base p-2 border-1 border-solid border-round appearance-none outline-none w-full"
                        placeholder={t('email')}
                        value={user.email}
                    />
                </div>

                <div className={styles.field}>
                    <InputText
                        onChange={handleChange}
                        id="validationCode"
                        name="validationCode"
                        type="text"
                        className="text-base p-2 border-1 border-solid border-round appearance-none outline-none w-full"
                        placeholder={t('change.code')}
                        value={user.validationCode}
                    />
                </div>

                <div className={styles.field}>
                    <PasswordValidation className={styles.inputField} password={password} setPassword={setPassword} />
                </div>

                <div className={styles.field}>
                    <PasswordConfirmation
                        className={styles.inputField}
                        password={password}
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={onConfirmPasswordChange}
                        confirmationError={confirmationError}
                    />
                </div>

                <div className={styles.changeOptions}>
                    <Button label={t('cancel')} size="small" className={styles.changeButtons} onClick={handleCancel} />
                    <Button
                        label={isLoading ? null : t('change.change')}
                        size="small"
                        className={styles.changeButtons}
                        onClick={changeLogout}
                        disabled={isLoading}
                        icon={isLoading ? "pi pi-spin pi-spinner" : null}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ChangePasswordLogout;
