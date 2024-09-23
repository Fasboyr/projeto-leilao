import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logout from "../../logout/logout";
import { useTranslation } from "react-i18next";
import { GiBullHorns } from "react-icons/gi";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); 
  const currentLanguage = i18n.language;

  const alterarTema = () => {
    const temaAtual = document.body.getAttribute("data-theme");
    const temaNovo = temaAtual === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", temaNovo);
    localStorage.setItem("theme", temaNovo);
    setIsDarkTheme(temaNovo === "dark"); 
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageMenuVisible(false); 
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuVisible(!languageMenuVisible);
  };

  useEffect(() => {
    const temaInicial = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", temaInicial);
    setIsDarkTheme(temaInicial === "dark");
  }, []);

  // Verifica se o usuário é um admin
  const userType = localStorage.getItem("userType");
  const isAdmin = userType === "admin";

  return (
    <div className={styles.header}>
      <h2><GiBullHorns/></h2>
      <nav className={styles.navLeft}>
        <ul>
          <li>
            <Link className={styles.headerNavLink} to="/">
              {t('home')}
            </Link>
          </li>
          <li>
            <Link className={styles.headerNavLink} to="/change">
              {t('change.title')}
            </Link>
          </li>
          {isAdmin && (  // Item só visível para admin
            <li>
              <Link className={styles.headerNavLink} to="/admin">
                {t('panel')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <nav className={styles.navRight}>
        <ul>
          <li>
            <button className={styles.languageButton} onClick={toggleLanguageMenu}>
              {currentLanguage.toUpperCase()}
            </button>
            {languageMenuVisible && (
              <ul className={styles.languageMenu}>
                <li onClick={() => changeLanguage('pt')}>PT</li>
                <li onClick={() => changeLanguage('en')}>EN</li>
              </ul>
            )}
          </li>
          <li>
            <Link className={styles.headerNavLink} to="/profile">
              <i className="fas fa-user"></i>
            </Link>
          </li>
          <li>
            <button className={styles.themeToggleButton} onClick={alterarTema}>
              <i className={`mdi ${isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny'}`}></i>
            </button>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
