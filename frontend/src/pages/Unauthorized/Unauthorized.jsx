import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Unauthorized.module.css';
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const Unauthorized = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token") ? true : false;
    const { t } = useTranslation();

    const goBack = () => {
        if (isAuthenticated) {
            navigate('/home');
        } else {
            navigate('/');
        }
    }

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundCard}>
                <h1 className={styles.notFoundTitle}>401</h1>
                <p className={styles.notFoundMessage}>{t('warning.unauthorized')}</p>
                <Button
                    onClick={goBack}
                    label={t('warning.return')}
                    className={styles.backButton}
                />
            </div>
        </div>
    );
}

export default Unauthorized;
