
import React, { useState } from "react";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { useTranslation } from "react-i18next";

export default function PasswordConfirmation() {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const passwordHeader = <div >Pick a password</div>;
    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">{t('validation.rule')}</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>{t('validation.confirmation')}</li>
            </ul>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Password
                value={value}
                onChange={(e) => setValue(e.target.value)}
                footer={passwordFooter}
                placeholder={t('password')}
                toggleMask
                pt={{ iconField: { root: { className: 'w-full' } } }} />
        </div>
    )
}

