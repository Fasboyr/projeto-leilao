import React, { useState, useEffect } from 'react';
import { Password } from 'primereact/password';
import { useTranslation } from 'react-i18next';
import { Divider } from 'primereact/divider';

const PasswordConfirmation = ({ password, confirmPassword, onConfirmPasswordChange, confirmationError }) => {
    const { t } = useTranslation();
    const [validationStatus, setValidationStatus] = useState(false);

    useEffect(() => {
        const validateConfirmation = (passwordValue, confirmPasswordValue) => {
            setValidationStatus(passwordValue === confirmPasswordValue);
        };

        validateConfirmation(password, confirmPassword);
    }, [password, confirmPassword]);

    const getColor = (status) => (status ? 'green' : 'red');

    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">{t('validation.rule')}</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li style={{ color: getColor(validationStatus) }}>
                    {t('validation.confirmation')}
                </li>
            </ul>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Password
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                placeholder={t('change.confirm')}
                promptLabel={t('validation.prompt')}
                weakLabel={t('validation.weak')}
                mediumLabel={t('validation.medium')}
                strongLabel={t('validation.strong')}
                footer={passwordFooter}
                toggleMask
            />
          
        </div>
    );
};

export default PasswordConfirmation;
