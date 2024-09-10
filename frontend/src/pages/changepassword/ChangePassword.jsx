import React, { useState, useRef } from 'react';
import styles from './ChangePassword.module.css'; // Importa o CSS module

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../components/password/passwordValidation';
import PasswordConfirmation from '../../components/password/passwordConfirmation';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [confirmationError, setConfirmationError] = useState('');
    const typingTimeoutRef = useRef(null);
    const { t } = useTranslation();

    const validatePassword = (value) => {
        const errors = [];

        if (value.length > 0) {
            if (value.length < 6) {
                errors.push(t('validation.lenght'));
            }
            else if (!/[A-Z]/.test(value)) {
                errors.push(t('validation.upperCase'));
            }
            else if (!/[a-z]/.test(value)) {
                errors.push(t('validation.lowerCase'));
            }
            else if (!/[0-9]/.test(value)) {
                errors.push(t('validation.number'));
            }
            else if (!/[^A-Za-z0-9]/.test(value)) {
                errors.push(t('validation.special'));
            }

            setErrors(errors);
        }
    };

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        if (value.length === 0) {
            typingTimeoutRef.current = setTimeout(() => {
                setErrors([]);
            }, 1000);
        } else {
            typingTimeoutRef.current = setTimeout(() => {
                validatePassword(value);
            }, 1000);  // 1000 ms = 1 segundo
        }
    };

    const validateConfirmation = (passwordValue, confirmPasswordValue) => {
        if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
            setConfirmationError(t('validation.confirmation'));
        } else {
            setConfirmationError('');
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
                        id="email"
                        type="text"
                        className="text-base p-2 border-1 border-solid border-round appearance-none outline-none w-full"
                        placeholder={t('email')}
                    />
                </div>

                <div className={styles.field}>
                    <InputText
                        id="code"
                        type="text"
                        className="text-base p-2 border-1 border-solid border-round appearance-none outline-none w-full"
                        placeholder={t('change.code')}
                    />
                </div>

                <div className={styles.field}>
                    <PasswordValidation/>
                </div>

                <div className={styles.errors}>
                    {errors.length > 0 && errors.map((error, index) => (
                        <Message key={index} severity="error" text={error} />
                    ))}
                </div>

                <div className={styles.field}>
                    <PasswordConfirmation/>
                </div>

                <div className={styles.errors}>
                    {confirmationError && <Message severity="error" text={confirmationError} />}
                </div>

                <div className={styles.changeOptions}>
                    <Button label={t('cancel')} size="small" className={styles.changeButtons} />
                    <Button label={t('change.change')} size="small" className={styles.changeButtons}/>
                </div>
            </Card>
        </div>
    );
}

export default ChangePassword;
