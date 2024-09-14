import React, { useState } from 'react';
import styles from './Register.module.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../components/password/passwordValidation';

const Register = () => {
    const [password, setPassword] = useState('');
    const { t } = useTranslation();

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
                    <PasswordValidation 
                        password={password} 
                        setPassword={setPassword} 
                    />
                </div>

                <div className={styles.registerOptions}>
                    <Button label={t('cancel')} size="small" className={styles.registerButtons} />
                    <Button label={t('signUpButton')} size="small" className={styles.registerButtons} />
                </div>
            </Card>
        </div>
    );
};

export default Register;
