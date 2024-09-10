import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./HeaderLogout.module.css"; // Ajuste conforme necessário

const Header = () => {
    const { t, i18n } = useTranslation();
    const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
    const currentLanguage = i18n.language;

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLanguageMenuVisible(false); // Fecha o menu após a troca de idioma
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuVisible(prevState => !prevState); // Alterna o estado do menu
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
                <div className={style.languageWrapper}>
                    <button className={style.languageButton} onClick={toggleLanguageMenu}>
                        {currentLanguage.toUpperCase()}
                    </button>
                    {languageMenuVisible && (
                        <ul className={style.languageMenu}>
                            <li onClick={() => changeLanguage('pt')}>PT</li>
                            <li onClick={() => changeLanguage('en')}>EN</li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
