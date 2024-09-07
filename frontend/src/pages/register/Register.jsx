import React, { useState, useRef } from 'react';
import styles from './Register.module.css'; // Importa o módulo CSS
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const typingTimeoutRef = useRef(null);  // Referência ao timeout para controle de inatividade
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

    return (
        <div className={styles.registerGrid}>
            <Card title={t('signUpTitle')} className={styles.registerBackground}>
                <div className="field">
                    <InputText 
                        id="name"
                        type="text"
                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('name')}
                    />
                </div>

                <div className="field">
                    <InputText 
                        id="email"
                        type="text"
                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('email')}
                    />
                </div>

                <div className="field">
                    <Password
                        value={password}
                        onChange={onPasswordChange}
                        id="password"
                        className={`text-base text-color surface-overlay p-2 ${styles.passwordField}`}
                        inputClassName="w-full p-2"
                        placeholder={t('password')}
                        feedback={false}
                        toggleMask
                    />
                </div>

                <div className={styles.erros}>
                    {errors.length > 0 && errors.map((error, index) => (
                        <Message key={index} severity="error" text={error} />
                    ))}
                </div>

                <div className={styles.registerOptions}>
                    <Button label={t('cancel')}  size="small" className={styles.registerButtons} />
                    <Button label={t('signUpButton')} size="small" className={styles.registerButtons} />
                </div>
            </Card>
        </div>
    );
}

export default Register;
