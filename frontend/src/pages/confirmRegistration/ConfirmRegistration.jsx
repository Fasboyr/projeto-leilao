import React, { useEffect, useState } from "react";
import styles from './ConfirmRegistration.module.css'; // Importa o CSS module
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const ConfirmRegistration = () => {
    const [user, setUser] = useState({ email: "", passwword:"", validationCode: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();
    const personService = new PersonService();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setUser((prevState) => ({ ...prevState, email: savedEmail }));
        }
    }, []); 

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const handleCancel = () => {
        navigate("/login");
    };

    const confirmar = async () => {
        try {

            const confirm = await personService.validate(user);
            const response =  await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("usuário ou senha incorretos")
        }
    }


    return (
        <div className={styles.loginGrid}>
            <Card title={t('confirmation.title')} className={styles.loginBackgroundColor}>
                <div className="field">
                    <InputText
                        onChange={handleChange}
                        name="email"
                        id="email"
                        inputClassName="w-full"
                        className="w-full"
                        placeholder={t('email')}
                        value={user.email}
                    />
                </div>
                <div className="field">
                    <Password 
                        onChange={handleChange} 
                        name="password" 
                        id="password" 
                        placeholder={t('password')}
                        feedback={false} 
                        toggleMask
                        pt={{ iconField: { root: { className: 'w-full' } } }}
                    />
                </div>
                <div className="field">
                    <InputText
                        onChange={handleChange}
                        name="validationCode"
                        id="validationCode"
                        inputClassName="w-full"
                        className="w-full"
                        placeholder={t('change.code')}
                    />
                </div>
                <div className={styles.changeOptions}>
                    <Button label={t('cancel')} size="small" className={styles.changeButtons} onClick={handleCancel}/>
                    <Button label={t('confirmation.validation')} size="small" className={styles.changeButtons} onClick={confirmar}/>
                </div>
            </Card>
        </div>
    );
}

export default ConfirmRegistration;