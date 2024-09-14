import React, { useState, useEffect } from 'react';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';

const PasswordValidation = ({ password, setPassword }) => {
    const { t } = useTranslation();
    const [validationStatus, setValidationStatus] = useState({
        length: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        special: false
    });

    useEffect(() => {
        const validatePassword = (value) => {
            setValidationStatus({
                length: value.length >= 6,
                upperCase: /[A-Z]/.test(value),
                lowerCase: /[a-z]/.test(value),
                number: /[0-9]/.test(value),
                special: /[^A-Za-z0-9]/.test(value)
            });
        };

        validatePassword(password);
    }, [password]);

    const getColor = (status) => (status ? 'green' : 'red');

    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">{t('validation.rule')}</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li style={{ color: getColor(validationStatus.length) }}>{t('validation.length')}</li>
                <li style={{ color: getColor(validationStatus.upperCase) }}>{t('validation.upperCase')}</li>
                <li style={{ color: getColor(validationStatus.lowerCase) }}>{t('validation.lowerCase')}</li>
                <li style={{ color: getColor(validationStatus.number) }}>{t('validation.number')}</li>
                <li style={{ color: getColor(validationStatus.special) }}>{t('validation.special')}</li>
            </ul>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                footer={passwordFooter}
                placeholder={t('password')}
                promptLabel={t('validation.prompt')}
                weakLabel={t('validation.weak')}
                mediumLabel={t('validation.medium')}
                strongLabel={t('validation.strong')}
                toggleMask
                pt={{ iconField: { root: { className: 'w-full' } } }}
            />
        </div>
    );
};

export default PasswordValidation;
