import React from "react";
import { useTranslation } from "react-i18next";
import style from "./HeaderLogout.module.css"; // Ajuste conforme necessário

const Header = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    

    return (
        <header className={style.header}>
            <h2>Menu</h2>
            <nav className={style.navLeft}>
                <ul>
                    <li><a href="/login">{t('login')}</a></li>
                    <li><a href="/recover">{t('recoverTitle')}</a></li>
                    <li><a href="/register">{t('register')}</a></li>
                </ul>
            </nav>
            <nav className={style.navRight}>
                <button onClick={() => changeLanguage('pt')} className={style.languageButton}>Português</button>
                <button onClick={() => changeLanguage('en')} className={style.languageButton}>English</button>
            </nav>
        </header>
    );
}

export default Header;
