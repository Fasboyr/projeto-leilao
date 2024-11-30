import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './NotFound.module.css';
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";

const NotFound = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token") ? true : false;
    const { t } = useTranslation();

    const goBack = () => {
        if (isAuthenticated) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundCard}>
                <h1 className={styles.notFoundTitle}>404</h1>
                <p className={styles.notFoundMessage}>{t('warning.notFound')}</p>
                <Button
                    onClick={goBack}
                    label={t('warning.return')}
                    className={styles.backButton}
                />
            </div>
        </div>
    );
}

export default NotFound;
