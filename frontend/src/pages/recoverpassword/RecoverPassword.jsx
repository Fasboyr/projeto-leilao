import React, { useState } from "react";
import styles from "./RecoverPassword.module.css"; 

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PersonService from "../../services/PersonService";

const RecoverPassword = () => {
    const [user, setUser] = useState({ email: ""});
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleCancel = () => {
        navigate("/login"); 
    };

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const recover = async () => {
        try {

            const response =  await personService.recover(user);
            localStorage.setItem("email", user.email);
            navigate("/changeLogout");
        } catch (err) {
            console.log(err);
            alert("usuário ou senha incorretos")
        }
    }

    return (
        <div className={styles.recoverGrid}>
            <Card title={t('recoverTitle')} className={styles.recoverBackground}>
                <div className="field">
                    <InputText 
                        id="email"
                        type="text"
                        name="email"
                        className="text-base surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder={t('email')}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.recoverOptions}>
                    <Button label={t('cancel')} size="small" className={styles.recoverButtons} onClick={handleCancel}/>
                    <Button label={t('recoverButton')} size="small" className={styles.recoverButtons} onClick={recover}/>
                </div>
            </Card>
        </div>
    );
}

export default RecoverPassword;
