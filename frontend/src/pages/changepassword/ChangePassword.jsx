import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PasswordValidation from '../../components/password/passwordValidation';
import PasswordConfirmation from '../../components/password/passwordConfirmation';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationError, setConfirmationError] = useState('');
    const { t } = useTranslation();

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
                    <PasswordValidation password={password} setPassword={setPassword} />
                </div>

                <div className={styles.field}>
                    <PasswordConfirmation
                        password={password}
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={onConfirmPasswordChange}
                        confirmationError={confirmationError}
                    />
                </div>

            

                <div className={styles.changeOptions}>
                    <Button label={t('cancel')} size="small" className={styles.changeButtons} />
                    <Button label={t('change.change')} size="small" className={styles.changeButtons} />
                </div>
            </Card>
        </div>
    );
};

export default ChangePassword;
