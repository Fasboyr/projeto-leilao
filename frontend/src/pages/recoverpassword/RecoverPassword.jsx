import React from "react";
import styles from "./RecoverPassword.module.css"; 

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";

const RecoverPassword = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.recoverGrid}>
            <Card title={t('recoverTitle')} className={styles.recoverBackground}>
                <div className="field">
                    <InputText 
                        id="email"
                        type="text"
                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('email')}
                    />
                </div>

                <div className={styles.recoverOptions}>
                    <Button label={t('cancel')} size="small" className={styles.recoverButtons}/>
                    <Button label={t('recoverButton')} size="small" className={styles.recoverButtons}/>
                </div>
            </Card>
        </div>
    );
}

export default RecoverPassword;
