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

const ChangePasswordLogout = () => {
    const [user, setUser] = useState({ email: "", newPassword: "", validationCode: "" });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationError, setConfirmationError] = useState('');
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
        navigate("/login");
    };


    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }
    const changeLogout = async () => {
        try {
            console.log('User:', user)
            const response = await personService.changeLogout(user);
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("usuário ou senha incorretos")
        }
    }

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
                    />
                </div>

                <div className={styles.field}>
                    <PasswordValidation className={styles.inputField} password={password} setPassword={setPassword} />
                </div>

                <div className={styles.field}>
                    <PasswordConfirmation
                        className={styles.inputField}
                        password={password}
                        name="password"
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={onConfirmPasswordChange}
                        confirmationError={confirmationError}
                    />
                </div>
                <div className={styles.changeOptions}>
                    <Button label={t('cancel')} size="small" className={styles.changeButtons} onClick={handleCancel} />
                    <Button label={t('change.change')} size="small" className={styles.changeButtons} onClick={changeLogout} />
                </div>
            </Card>
        </div>
    );
};

export default ChangePasswordLogout;
