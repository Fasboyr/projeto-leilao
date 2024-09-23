import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from "./HeaderLogout.module.css"; // Ajuste conforme necessário

const Header = () => {
    const { t, i18n } = useTranslation();
    const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const currentLanguage = i18n.language;

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLanguageMenuVisible(false); 
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuVisible(prevState => !prevState); 
    };

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Salva o tema no localStorage
        setIsDarkTheme(newTheme === "dark");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark"; // Padrão para "dark"
        document.body.setAttribute("data-theme", savedTheme);
        setIsDarkTheme(savedTheme === "dark");
    }, []);

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
                <button className={style.themeToggleButton} onClick={toggleTheme}>
                    <i className={`mdi ${isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny'}`}></i>
                </button>
            </nav>
        </header>
    );
}

export default Header;
